import { Sandbox } from 'e2b';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { FileSyncOptions } from '../types.js';

/**
 * Default patterns to exclude from sync
 */
const DEFAULT_EXCLUDE = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.astro',
  '.cache',
  'coverage',
  '.env',
  '.env.*',
  '*.log',
];

/**
 * Check if a path matches any exclude pattern
 */
function shouldExclude(relativePath: string, exclude: string[]): boolean {
  const parts = relativePath.split(path.sep);

  for (const pattern of exclude) {
    // Direct match
    if (relativePath === pattern) return true;

    // Any path segment matches
    if (parts.includes(pattern)) return true;

    // Glob-like matching for extensions
    if (pattern.startsWith('*.')) {
      const ext = pattern.slice(1);
      if (relativePath.endsWith(ext)) return true;
    }

    // Directory prefix match
    if (relativePath.startsWith(pattern + path.sep)) return true;
  }

  return false;
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(
  dir: string,
  baseDir: string,
  exclude: string[]
): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (shouldExclude(relativePath, exclude)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir, exclude));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Upload a local directory to the sandbox
 */
export async function uploadCodebase(
  sandbox: Sandbox,
  localDir: string,
  remoteDir: string = '/home/user/project',
  options: FileSyncOptions = {}
): Promise<{ uploaded: number; skipped: number }> {
  const exclude = [...DEFAULT_EXCLUDE, ...(options.exclude ?? [])];
  const baseDir = options.baseDir ?? localDir;

  // Get all files to upload
  const files = getAllFiles(localDir, baseDir, exclude);

  let uploaded = 0;
  let skipped = 0;

  // Create remote directory structure and upload files
  for (const localPath of files) {
    const relativePath = path.relative(baseDir, localPath);
    const remotePath = path.posix.join(remoteDir, relativePath);

    try {
      // Read file content as ArrayBuffer for e2b compatibility
      const buffer = fs.readFileSync(localPath);
      const content = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      ) as ArrayBuffer;

      // Ensure parent directory exists
      const parentDir = path.posix.dirname(remotePath);
      await sandbox.files.makeDir(parentDir);

      // Write file to sandbox
      await sandbox.files.write(remotePath, content);
      uploaded++;
    } catch (error) {
      console.error(`Failed to upload ${relativePath}:`, error);
      skipped++;
    }
  }

  return { uploaded, skipped };
}

/**
 * Upload a single file to the sandbox
 */
export async function uploadFile(
  sandbox: Sandbox,
  localPath: string,
  remotePath: string
): Promise<void> {
  const buffer = fs.readFileSync(localPath);
  const content = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
  const parentDir = path.posix.dirname(remotePath);

  await sandbox.files.makeDir(parentDir);
  await sandbox.files.write(remotePath, content);
}

/**
 * Download files from the sandbox to local directory
 */
export async function downloadFiles(
  sandbox: Sandbox,
  remotePath: string,
  localDir: string
): Promise<{ downloaded: number; failed: number }> {
  let downloaded = 0;
  let failed = 0;

  async function downloadRecursive(remoteDir: string, localBase: string) {
    const entries = await sandbox.files.list(remoteDir);

    for (const entry of entries) {
      const remoteFull = path.posix.join(remoteDir, entry.name);
      const localFull = path.join(localBase, entry.name);

      try {
        if (entry.type === 'dir') {
          fs.mkdirSync(localFull, { recursive: true });
          await downloadRecursive(remoteFull, localFull);
        } else {
          const content = await sandbox.files.read(remoteFull);
          fs.mkdirSync(path.dirname(localFull), { recursive: true });

          if (typeof content === 'string') {
            fs.writeFileSync(localFull, content);
          } else {
            fs.writeFileSync(localFull, Buffer.from(content));
          }
          downloaded++;
        }
      } catch (error) {
        console.error(`Failed to download ${remoteFull}:`, error);
        failed++;
      }
    }
  }

  fs.mkdirSync(localDir, { recursive: true });
  await downloadRecursive(remotePath, localDir);

  return { downloaded, failed };
}

/**
 * Download a single file from the sandbox
 */
export async function downloadFile(
  sandbox: Sandbox,
  remotePath: string,
  localPath: string
): Promise<void> {
  const content = await sandbox.files.read(remotePath);
  fs.mkdirSync(path.dirname(localPath), { recursive: true });

  if (typeof content === 'string') {
    fs.writeFileSync(localPath, content);
  } else {
    fs.writeFileSync(localPath, Buffer.from(content));
  }
}

/**
 * Sync results from sandbox to local output directory
 */
export async function syncResults(
  sandbox: Sandbox,
  remoteResultsDir: string,
  localOutputDir: string
): Promise<{ synced: number; failed: number }> {
  const result = await downloadFiles(sandbox, remoteResultsDir, localOutputDir);
  return { synced: result.downloaded, failed: result.failed };
}
