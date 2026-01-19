/**
 * Run command - executes audit in e2b sandbox
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  createSandbox,
  destroySandbox,
  uploadCodebase,
  runCommand,
  startDevServer,
  syncResults,
  loadConfig,
} from '@e2b-tools/core';
import type { RunCommandOptions, AuditTool, AuditResult } from '../../types.js';

const DEFAULT_URL = 'http://localhost:4321';
const DEFAULT_TOOLS: AuditTool[] = ['lighthouse', 'axe', 'pa11y'];
const DEFAULT_OUTPUT = 'docs/audits/raw';
const DEFAULT_FORMAT = 'json';
const DEFAULT_DEV_COMMAND = 'npm run dev';
const DEFAULT_DEV_PORT = 4321;
const DEFAULT_TIMEOUT = 600; // 10 minutes for full audit workflow

/**
 * Run audit workflow
 */
export async function runAudit(options: RunCommandOptions): Promise<void> {
  const config = await loadConfig();
  const auditConfig = config.audit ?? {};

  const url = options.url ?? DEFAULT_URL;
  const tools = parseTools(options.tools) ?? DEFAULT_TOOLS;
  const outputDir = options.output ?? auditConfig.output?.dir ?? DEFAULT_OUTPUT;
  const format = (options.format ?? auditConfig.output?.format ?? DEFAULT_FORMAT) as
    | 'json'
    | 'html'
    | 'markdown';
  const devCommand = options.devCommand ?? DEFAULT_DEV_COMMAND;
  const devPort = options.devPort ?? DEFAULT_DEV_PORT;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const verbose = options.verbose ?? false;

  const isLocalUrl = url.includes('localhost') || url.includes('127.0.0.1');
  const cwd = process.cwd();

  log(verbose, `Starting audit for ${url}`);
  log(verbose, `Tools: ${tools.join(', ')}`);
  log(verbose, `Output: ${outputDir} (${format})`);

  // Create sandbox
  log(verbose, 'Creating sandbox...');
  const sandbox = await createSandbox({ timeout });

  try {
    // If local URL, upload codebase and start dev server
    if (isLocalUrl) {
      log(verbose, 'Uploading codebase...');
      const { uploaded, skipped } = await uploadCodebase(sandbox, cwd);
      log(verbose, `Uploaded ${uploaded} files (${skipped} skipped)`);

      // Install dependencies
      log(verbose, 'Installing dependencies...');
      const installResult = await runCommand(sandbox, 'npm install', {
        cwd: '/home/user/project',
        timeout: 300000,
        onStdout: verbose ? (d) => process.stdout.write(d) : undefined,
        onStderr: verbose ? (d) => process.stderr.write(d) : undefined,
      });

      if (installResult.exitCode !== 0) {
        throw new Error(`npm install failed: ${installResult.stderr}`);
      }

      // Start dev server
      log(verbose, `Starting dev server on port ${devPort}...`);
      await startDevServer(sandbox, {
        command: devCommand,
        port: devPort,
        cwd: '/home/user/project',
      });
      log(verbose, 'Dev server started');
    }

    // Ensure working directory exists (even for remote URLs)
    if (!isLocalUrl) {
      await runCommand(sandbox, 'mkdir -p /home/user/project', { cwd: '/' });
    }

    // Install audit tools in sandbox
    log(verbose, 'Installing audit tools...');
    await installAuditTools(sandbox, tools, verbose);

    // Run audits
    const results: Partial<AuditResult> = {
      url,
      timestamp: new Date().toISOString(),
      tools,
      findings: [],
      summary: { total: 0, critical: 0, serious: 0, moderate: 0, minor: 0 },
    };

    const startTime = Date.now();
    const auditUrl = isLocalUrl ? `http://localhost:${devPort}` : url;

    for (const tool of tools) {
      log(verbose, `Running ${tool}...`);
      await runAuditTool(sandbox, tool, auditUrl, verbose);
    }

    results.duration = Date.now() - startTime;

    // Sync results from sandbox
    log(verbose, 'Syncing results...');
    const localOutputDir = path.resolve(cwd, outputDir);
    fs.mkdirSync(localOutputDir, { recursive: true });

    await syncResults(sandbox, '/home/user/project/audit-results', localOutputDir);

    console.log(`\nAudit complete!`);
    console.log(`Results saved to: ${localOutputDir}`);
    console.log(`Duration: ${Math.round(results.duration / 1000)}s`);
  } finally {
    // Clean up sandbox
    log(verbose, 'Destroying sandbox...');
    await destroySandbox(sandbox);
  }
}

/**
 * Parse tools string into array
 */
function parseTools(tools?: string): AuditTool[] | undefined {
  if (!tools) return undefined;
  return tools.split(',').map((t) => t.trim() as AuditTool);
}

/**
 * Conditional logging
 */
function log(verbose: boolean, message: string): void {
  if (verbose) {
    console.log(`[e2b-audit] ${message}`);
  }
}

/**
 * Install audit tools in sandbox
 * Note: Using custom template 'audit-node22-chrome' which has Chrome and
 * audit tools pre-installed. This function is kept for fallback/custom templates.
 */
async function installAuditTools(
  sandbox: Awaited<ReturnType<typeof createSandbox>>,
  tools: AuditTool[],
  verbose: boolean
): Promise<void> {
  // Check if tools are already installed (custom template)
  const checkResult = await runCommand(sandbox, 'which lighthouse', { cwd: '/' });
  if (checkResult.exitCode === 0) {
    log(verbose, 'Audit tools already installed in template');
    return;
  }

  // Fallback: Install if not present (for base template)
  log(verbose, 'Installing audit tools (not pre-installed in template)...');

  const needsChrome = tools.includes('lighthouse') || tools.includes('pa11y') || tools.includes('axe');
  if (needsChrome) {
    log(verbose, 'Installing Chrome...');
    const chromeResult = await runCommand(
      sandbox,
      'sudo apt-get update && sudo apt-get install -y chromium chromium-driver',
      {
        cwd: '/',
        timeout: 300000,
        onStdout: verbose ? (d) => process.stdout.write(d) : undefined,
        onStderr: verbose ? (d) => process.stderr.write(d) : undefined,
      }
    );

    if (chromeResult.exitCode !== 0) {
      throw new Error(`Failed to install Chrome: ${chromeResult.stderr}`);
    }
  }

  const packages: string[] = [];
  if (tools.includes('lighthouse')) packages.push('lighthouse@latest');
  if (tools.includes('axe')) packages.push('@axe-core/cli');
  if (tools.includes('pa11y')) packages.push('pa11y');

  if (packages.length > 0) {
    const result = await runCommand(
      sandbox,
      `sudo npm install -g ${packages.join(' ')}`,
      {
        cwd: '/',
        timeout: 420000,
        onStdout: verbose ? (d) => process.stdout.write(d) : undefined,
        onStderr: verbose ? (d) => process.stderr.write(d) : undefined,
      }
    );

    if (result.exitCode !== 0) {
      throw new Error(`Failed to install audit tools: ${result.stderr}`);
    }
  }
}

/**
 * Run a specific audit tool
 */
async function runAuditTool(
  sandbox: Awaited<ReturnType<typeof createSandbox>>,
  tool: AuditTool,
  url: string,
  verbose: boolean
): Promise<void> {
  // Ensure output directory exists
  await runCommand(sandbox, 'mkdir -p /home/user/project/audit-results');

  let command: string;

  // Environment variables for Chrome/Chromium location
  const chromeEnv = 'CHROME_PATH=/usr/bin/chromium PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium';

  // Chrome flags for headless operation in sandboxed environments
  const chromeFlags = [
    '--headless=new',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-software-rasterizer',
    '--disable-extensions',
    '--no-first-run',
    '--disable-background-networking',
    '--disable-default-apps',
  ].join(' ');

  switch (tool) {
    case 'lighthouse':
      command = `${chromeEnv} lighthouse ${url} --output json --output-path /home/user/project/audit-results/lighthouse-results.json --only-categories=accessibility,best-practices,performance --chrome-flags="${chromeFlags}"`;
      break;
    case 'axe':
      // Note: axe --save uses relative path from cwd, so just use filename
      command = `cd /home/user/project/audit-results && ${chromeEnv} axe ${url} --save axe-results.json --chrome-options="headless,no-sandbox,disable-gpu,disable-dev-shm-usage"`;
      break;
    case 'pa11y':
      // Pa11y uses puppeteer which reads PUPPETEER_EXECUTABLE_PATH env var (set in template)
      // Use subshell with || true to ensure output is captured even with exit code 2 (issues found)
      command = `bash -c '${chromeEnv} pa11y ${url} --reporter json --runner htmlcs > /home/user/project/audit-results/pa11y-results.json 2>&1 || true'`;
      break;
  }

  const result = await runCommand(sandbox, command, {
    timeout: 300000, // 5 minutes per tool (Lighthouse can be slow)
    onStdout: verbose ? (d) => process.stdout.write(d) : undefined,
    onStderr: verbose ? (d) => process.stderr.write(d) : undefined,
  });

  // Pa11y exit codes: 0=no issues, 1=error, 2=issues found
  // Exit code 2 for pa11y is expected when issues are found
  const isPa11yIssuesFound = tool === 'pa11y' && result.exitCode === 2;

  if (result.exitCode !== 0 && !isPa11yIssuesFound && verbose) {
    console.warn(`Warning: ${tool} exited with code ${result.exitCode}`);
  }

  if (isPa11yIssuesFound && verbose) {
    log(verbose, 'Pa11y found accessibility issues (exit code 2 is expected)');
  }
}
