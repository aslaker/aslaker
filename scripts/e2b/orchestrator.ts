#!/usr/bin/env tsx
/**
 * E2B Sandbox Orchestrator for Optimize Pipeline
 *
 * Runs accessibility and SEO audits in parallel sandboxes,
 * then runs implementation in a third sandbox.
 */

import { Sandbox } from 'e2b';
import { uploadCodebase, downloadSpecs, downloadImplementation, applyDownloadedFiles } from './file-sync.js';
import {
  SandboxPoolManager,
  installDependencies,
  installClaudeCLI,
  runClaudeCommand,
  initGit,
} from './sandbox-manager.js';
import type { OrchestratorOptions, AuditResult, DownloadedFile } from './types.js';

const PROJECT_DIR = '/home/user/project';

/**
 * Parse command line arguments
 */
function parseArgs(): OrchestratorOptions {
  const args = process.argv.slice(2);
  return {
    auditOnly: args.includes('--audit-only'),
    verbose: args.includes('--verbose'),
    timeout: args.includes('--timeout')
      ? parseInt(args[args.indexOf('--timeout') + 1], 10) * 60 * 1000
      : undefined,
  };
}

/**
 * Validate required environment variables
 */
function validateEnv(): { e2bApiKey: string; anthropicApiKey: string } {
  const e2bApiKey = process.env.E2B_API_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!e2bApiKey) {
    console.error('Error: E2B_API_KEY environment variable is required');
    process.exit(1);
  }

  if (!anthropicApiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  return { e2bApiKey, anthropicApiKey };
}

/**
 * Set up a sandbox with codebase and dependencies
 */
async function setupSandbox(
  pool: SandboxPoolManager,
  sessionType: 'accessibility-audit' | 'seo-audit' | 'implementation',
  localDir: string,
  anthropicApiKey: string,
  timeout?: number
): Promise<Sandbox> {
  const { sandbox } = await pool.create(sessionType, {}, timeout);

  // Upload codebase
  await uploadCodebase(sandbox, localDir, PROJECT_DIR);

  // Initialize git for tracking changes
  await initGit(sandbox, PROJECT_DIR);

  // Install project dependencies
  await installDependencies(sandbox, PROJECT_DIR);

  // Install Claude CLI
  await installClaudeCLI(sandbox, anthropicApiKey);

  return sandbox;
}

/**
 * Run accessibility audit in sandbox
 */
async function runAccessibilityAudit(
  sandbox: Sandbox,
  anthropicApiKey: string
): Promise<AuditResult> {
  console.log('\n========== ACCESSIBILITY AUDIT ==========\n');

  try {
    const result = await runClaudeCommand(
      sandbox,
      '/accessibility-audit',
      PROJECT_DIR,
      anthropicApiKey
    );

    if (result.exitCode !== 0) {
      return {
        type: 'accessibility',
        success: false,
        reportPath: '',
        specPaths: [],
        error: `Claude exited with code ${result.exitCode}`,
      };
    }

    return {
      type: 'accessibility',
      success: true,
      reportPath: 'docs/accessibility/audits/accessibility_report.md',
      specPaths: [], // Will be populated when downloading
    };
  } catch (err) {
    return {
      type: 'accessibility',
      success: false,
      reportPath: '',
      specPaths: [],
      error: String(err),
    };
  }
}

/**
 * Run SEO audit in sandbox
 */
async function runSEOAudit(
  sandbox: Sandbox,
  anthropicApiKey: string
): Promise<AuditResult> {
  console.log('\n========== SEO AUDIT ==========\n');

  try {
    const result = await runClaudeCommand(
      sandbox,
      '/seo-audit',
      PROJECT_DIR,
      anthropicApiKey
    );

    if (result.exitCode !== 0) {
      return {
        type: 'seo',
        success: false,
        reportPath: '',
        specPaths: [],
        error: `Claude exited with code ${result.exitCode}`,
      };
    }

    return {
      type: 'seo',
      success: true,
      reportPath: 'docs/seo/audits/seo_report.md',
      specPaths: [], // Will be populated when downloading
    };
  } catch (err) {
    return {
      type: 'seo',
      success: false,
      reportPath: '',
      specPaths: [],
      error: String(err),
    };
  }
}

/**
 * Run implementation in sandbox
 */
async function runImplementation(
  sandbox: Sandbox,
  anthropicApiKey: string
): Promise<DownloadedFile[]> {
  console.log('\n========== IMPLEMENTATION ==========\n');

  const result = await runClaudeCommand(
    sandbox,
    '/implement-specs',
    PROJECT_DIR,
    anthropicApiKey
  );

  if (result.exitCode !== 0) {
    console.error(`Implementation exited with code ${result.exitCode}`);
    return [];
  }

  // Download changed files
  return downloadImplementation(sandbox, PROJECT_DIR);
}

/**
 * Main orchestration function
 */
async function main(): Promise<void> {
  const options = parseArgs();
  const { e2bApiKey, anthropicApiKey } = validateEnv();
  const localDir = process.cwd();

  console.log('E2B Sandbox Optimize Pipeline');
  console.log('==============================');
  console.log(`Mode: ${options.auditOnly ? 'Audit only' : 'Full pipeline'}`);
  console.log(`Local directory: ${localDir}`);
  console.log('');

  const pool = new SandboxPoolManager();

  try {
    // Phase 1: Create audit sandboxes in parallel
    console.log('Phase 1: Setting up audit sandboxes...\n');

    const [accessibilitySandbox, seoSandbox] = await Promise.all([
      setupSandbox(pool, 'accessibility-audit', localDir, anthropicApiKey, options.timeout),
      setupSandbox(pool, 'seo-audit', localDir, anthropicApiKey, options.timeout),
    ]);

    // Phase 2: Run audits in parallel
    console.log('\nPhase 2: Running audits in parallel...\n');

    const [accessibilityResult, seoResult] = await Promise.all([
      runAccessibilityAudit(accessibilitySandbox, anthropicApiKey),
      runSEOAudit(seoSandbox, anthropicApiKey),
    ]);

    // Download specs from both sandboxes
    console.log('\nDownloading audit results...\n');

    const [accessibilitySpecs, seoSpecs] = await Promise.all([
      downloadSpecs(accessibilitySandbox, PROJECT_DIR),
      downloadSpecs(seoSandbox, PROJECT_DIR),
    ]);

    // Apply specs locally
    const allSpecs = [...accessibilitySpecs, ...seoSpecs];
    console.log(`\nApplying ${allSpecs.length} spec files locally...\n`);
    await applyDownloadedFiles(allSpecs, localDir);

    // Kill audit sandboxes
    console.log('\nCleaning up audit sandboxes...\n');
    await Promise.all([
      pool.kill(accessibilitySandbox.sandboxId),
      pool.kill(seoSandbox.sandboxId),
    ]);

    // Report audit results
    console.log('\n========== AUDIT SUMMARY ==========\n');
    console.log(`Accessibility: ${accessibilityResult.success ? 'SUCCESS' : 'FAILED'}`);
    if (!accessibilityResult.success) console.log(`  Error: ${accessibilityResult.error}`);
    console.log(`SEO: ${seoResult.success ? 'SUCCESS' : 'FAILED'}`);
    if (!seoResult.success) console.log(`  Error: ${seoResult.error}`);
    console.log(`Specs downloaded: ${allSpecs.length}`);

    if (options.auditOnly) {
      console.log('\nAudit-only mode complete.');
      return;
    }

    // Phase 3: Implementation
    if (!accessibilityResult.success && !seoResult.success) {
      console.log('\nBoth audits failed. Skipping implementation.');
      return;
    }

    console.log('\nPhase 3: Setting up implementation sandbox...\n');

    const implementationSandbox = await setupSandbox(
      pool,
      'implementation',
      localDir,
      anthropicApiKey,
      options.timeout
    );

    // Run implementation
    const implementationChanges = await runImplementation(
      implementationSandbox,
      anthropicApiKey
    );

    // Apply implementation changes locally
    if (implementationChanges.length > 0) {
      console.log(`\nApplying ${implementationChanges.length} implementation changes...\n`);
      await applyDownloadedFiles(implementationChanges, localDir);
    }

    // Clean up
    await pool.kill(implementationSandbox.sandboxId);

    // Final summary
    console.log('\n========== PIPELINE COMPLETE ==========\n');
    console.log(`Specs generated: ${allSpecs.length}`);
    console.log(`Files modified: ${implementationChanges.length}`);
    console.log('\nChanges have been applied to your local directory.');
    console.log('Review with: git diff');

  } catch (err) {
    console.error('\nPipeline failed:', err);
    await pool.cleanup();
    process.exit(1);
  }
}

// Run main
main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
