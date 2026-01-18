/**
 * File synchronization utilities for e2b sandboxes
 * Handles uploading codebase and downloading results
 */

import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import archiver from 'archiver';
import type { Sandbox } from 'e2b';
import type { DownloadedFile } from './types.js';

/** Directories/files to exclude from upload */
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  '.git',
  '.astro',
  '.wrangler',
  '*.log',
  '.DS_Store',
  'coverage',
];

/**
 * Check if a path should be excluded from upload
 */
function shouldExclude(filePath: string): boolean {
  const name = filePath.split('/').pop() || '';
  return EXCLUDE_PATTERNS.some(pattern => {
    if (pattern.startsWith('*')) {
      return name.endsWith(pattern.slice(1));
    }
    return name === pattern || filePath.includes(`/${pattern}/`);
  });
}

/**
 * Recursively get all files in a directory
 */
async function getAllFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath);

    if (shouldExclude(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Create a tarball of the codebase for upload
 */
export async function createCodebaseTarball(
  sourceDir: string,
  outputPath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('tar', { gzip: true });

    output.on('close', () => resolve(outputPath));
    archive.on('error', reject);

    archive.pipe(output);

    // Add files respecting exclude patterns
    archive.glob('**/*', {
      cwd: sourceDir,
      ignore: EXCLUDE_PATTERNS,
      dot: true,
    });

    archive.finalize();
  });
}

/**
 * Upload codebase to e2b sandbox
 */
export async function uploadCodebase(
  sandbox: Sandbox,
  localDir: string,
  remoteDir: string = '/home/user/project'
): Promise<void> {
  console.log(`Uploading codebase from ${localDir} to ${remoteDir}...`);

  const files = await getAllFiles(localDir);
  let uploaded = 0;

  for (const file of files) {
    const relativePath = relative(localDir, file);
    const remotePath = join(remoteDir, relativePath);
    const content = await readFile(file);

    // Ensure remote directory exists
    const remoteParent = dirname(remotePath);
    await sandbox.filesystem.makeDir(remoteParent);

    // Upload file
    await sandbox.filesystem.write(remotePath, content);
    uploaded++;

    if (uploaded % 50 === 0) {
      console.log(`  Uploaded ${uploaded}/${files.length} files...`);
    }
  }

  console.log(`  Uploaded ${uploaded} files total`);
}

/**
 * Download spec files from sandbox
 */
export async function downloadSpecs(
  sandbox: Sandbox,
  remoteBaseDir: string = '/home/user/project'
): Promise<DownloadedFile[]> {
  const specDirs = [
    'docs/accessibility/specs/pending',
    'docs/seo/specs/pending',
    'docs/accessibility/audits',
    'docs/seo/audits',
  ];

  const downloadedFiles: DownloadedFile[] = [];

  for (const specDir of specDirs) {
    const remotePath = join(remoteBaseDir, specDir);

    try {
      const files = await sandbox.filesystem.list(remotePath);

      for (const file of files) {
        if (file.type === 'file' && file.name.endsWith('.md')) {
          const filePath = join(remotePath, file.name);
          const content = await sandbox.filesystem.read(filePath);

          downloadedFiles.push({
            remotePath: join(specDir, file.name),
            content: typeof content === 'string' ? content : content.toString(),
          });
        }
      }
    } catch {
      // Directory may not exist yet, that's okay
      console.log(`  Directory ${specDir} not found or empty`);
    }
  }

  return downloadedFiles;
}

/**
 * Download implementation changes by getting git diff
 */
export async function downloadImplementation(
  sandbox: Sandbox,
  remoteBaseDir: string = '/home/user/project'
): Promise<DownloadedFile[]> {
  const downloadedFiles: DownloadedFile[] = [];

  // Get list of changed files from git
  const result = await sandbox.commands.run(
    'git diff --name-only HEAD~1 2>/dev/null || git diff --name-only',
    { cwd: remoteBaseDir }
  );

  if (result.exitCode !== 0 || !result.stdout) {
    console.log('  No git changes detected');
    return downloadedFiles;
  }

  const changedFiles = result.stdout.trim().split('\n').filter(Boolean);
  console.log(`  Found ${changedFiles.length} changed files`);

  for (const file of changedFiles) {
    const remotePath = join(remoteBaseDir, file);

    try {
      const content = await sandbox.filesystem.read(remotePath);
      downloadedFiles.push({
        remotePath: file,
        content: typeof content === 'string' ? content : content.toString(),
      });
    } catch (err) {
      console.log(`  Warning: Could not read ${file}`);
    }
  }

  return downloadedFiles;
}

/**
 * Apply downloaded files to local filesystem
 */
export async function applyDownloadedFiles(
  files: DownloadedFile[],
  localBaseDir: string
): Promise<string[]> {
  const appliedPaths: string[] = [];

  for (const file of files) {
    const localPath = join(localBaseDir, file.remotePath);
    const localDir = dirname(localPath);

    // Ensure local directory exists
    await mkdir(localDir, { recursive: true });

    // Write file
    await writeFile(localPath, file.content, 'utf-8');
    appliedPaths.push(file.remotePath);
    console.log(`  Applied: ${file.remotePath}`);
  }

  return appliedPaths;
}
