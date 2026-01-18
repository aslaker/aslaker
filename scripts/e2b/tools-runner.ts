/**
 * Automated audit tools runner for e2b sandboxes
 * Runs axe-core, pa11y, and Lighthouse without requiring Claude CLI
 */

import type { Sandbox } from 'e2b';
import { runCommand } from './sandbox-manager.js';

const PROJECT_DIR = '/home/user/project';
const REPORTS_DIR = '/home/user/reports';

/**
 * Install audit tools in sandbox
 */
export async function installAuditTools(sandbox: Sandbox): Promise<void> {
  console.log('Installing audit tools...');

  // Install Chrome/Chromium for Lighthouse and axe
  await runCommand(
    sandbox,
    'apt-get update && apt-get install -y chromium-browser',
    '/home/user',
    false
  );

  // Install Node.js audit tools globally
  await runCommand(
    sandbox,
    'npm install -g lighthouse @axe-core/cli pa11y',
    '/home/user',
    false
  );

  // Create reports directory
  await runCommand(sandbox, `mkdir -p ${REPORTS_DIR}`, '/home/user', false);

  console.log('  Audit tools installed');
}

/**
 * Start dev server in background and return the process
 */
export async function startDevServer(
  sandbox: Sandbox,
  projectDir: string = PROJECT_DIR
): Promise<{ port: number }> {
  console.log('Starting dev server...');

  // Start dev server in background
  await runCommand(
    sandbox,
    'npm run dev > /tmp/dev-server.log 2>&1 &',
    projectDir,
    false
  );

  // Wait for server to be ready
  await runCommand(
    sandbox,
    'sleep 5 && curl -s http://localhost:4321 > /dev/null || sleep 5',
    projectDir,
    false
  );

  console.log('  Dev server running on port 4321');
  return { port: 4321 };
}

/**
 * Run axe-core accessibility audit
 */
export async function runAxeAudit(
  sandbox: Sandbox,
  url: string = 'http://localhost:4321'
): Promise<string> {
  console.log('Running axe-core audit...');

  const outputPath = `${REPORTS_DIR}/axe-results.json`;

  const result = await runCommand(
    sandbox,
    `axe ${url} --save ${outputPath} --chrome-options="--no-sandbox,--disable-gpu,--headless"`,
    '/home/user',
    false
  );

  if (result.exitCode !== 0) {
    console.log(`  axe-core warning: ${result.stderr}`);
  }

  console.log('  axe-core audit complete');
  return outputPath;
}

/**
 * Run pa11y accessibility audit
 */
export async function runPa11yAudit(
  sandbox: Sandbox,
  url: string = 'http://localhost:4321'
): Promise<string> {
  console.log('Running pa11y audit...');

  const outputPath = `${REPORTS_DIR}/pa11y-results.json`;

  const result = await runCommand(
    sandbox,
    `pa11y ${url} --reporter json --chromeLaunchConfig '{"args":["--no-sandbox","--disable-gpu","--headless"]}' > ${outputPath}`,
    '/home/user',
    false
  );

  if (result.exitCode !== 0) {
    console.log(`  pa11y warning: ${result.stderr}`);
  }

  console.log('  pa11y audit complete');
  return outputPath;
}

/**
 * Run Lighthouse audit (accessibility, SEO, performance, best practices)
 */
export async function runLighthouseAudit(
  sandbox: Sandbox,
  url: string = 'http://localhost:4321',
  categories: string[] = ['accessibility', 'seo', 'performance', 'best-practices']
): Promise<string> {
  console.log('Running Lighthouse audit...');

  const outputPath = `${REPORTS_DIR}/lighthouse-results.json`;
  const categoryFlags = categories.map(c => `--only-categories=${c}`).join(' ');

  const result = await runCommand(
    sandbox,
    `lighthouse ${url} ${categoryFlags} --output=json --output-path=${outputPath} --chrome-flags="--no-sandbox --headless --disable-gpu"`,
    '/home/user',
    false
  );

  if (result.exitCode !== 0) {
    console.log(`  Lighthouse warning: ${result.stderr}`);
  }

  console.log('  Lighthouse audit complete');
  return outputPath;
}

/**
 * Run all accessibility audits in parallel
 */
export async function runAccessibilityAudits(
  sandbox: Sandbox,
  url: string = 'http://localhost:4321'
): Promise<{ axe: string; pa11y: string }> {
  console.log('\n=== Running Accessibility Audits ===\n');

  // Run axe and pa11y in parallel
  const [axePath, pa11yPath] = await Promise.all([
    runAxeAudit(sandbox, url),
    runPa11yAudit(sandbox, url),
  ]);

  return { axe: axePath, pa11y: pa11yPath };
}

/**
 * Run all SEO audits (Lighthouse SEO category)
 */
export async function runSEOAudits(
  sandbox: Sandbox,
  url: string = 'http://localhost:4321'
): Promise<{ lighthouse: string }> {
  console.log('\n=== Running SEO Audits ===\n');

  const lighthousePath = await runLighthouseAudit(sandbox, url, ['seo', 'best-practices']);

  return { lighthouse: lighthousePath };
}

/**
 * Download all report files from sandbox
 */
export async function downloadReports(
  sandbox: Sandbox
): Promise<Map<string, string>> {
  console.log('\nDownloading audit reports...');

  const reports = new Map<string, string>();
  const reportFiles = ['axe-results.json', 'pa11y-results.json', 'lighthouse-results.json'];

  for (const file of reportFiles) {
    const remotePath = `${REPORTS_DIR}/${file}`;
    try {
      const content = await sandbox.filesystem.read(remotePath);
      reports.set(file, typeof content === 'string' ? content : content.toString());
      console.log(`  Downloaded: ${file}`);
    } catch {
      console.log(`  Not found: ${file}`);
    }
  }

  return reports;
}

/**
 * Full audit pipeline for a single sandbox
 */
export async function runFullAuditPipeline(
  sandbox: Sandbox,
  projectDir: string = PROJECT_DIR
): Promise<Map<string, string>> {
  // Install tools
  await installAuditTools(sandbox);

  // Start dev server
  const { port } = await startDevServer(sandbox, projectDir);
  const url = `http://localhost:${port}`;

  // Run all audits in parallel
  console.log('\n=== Running All Audits in Parallel ===\n');

  await Promise.all([
    runAxeAudit(sandbox, url),
    runPa11yAudit(sandbox, url),
    runLighthouseAudit(sandbox, url, ['accessibility', 'seo', 'performance', 'best-practices']),
  ]);

  // Download reports
  return downloadReports(sandbox);
}
