#!/usr/bin/env tsx
/**
 * E2B Sandbox Orchestrator for Optimize Pipeline
 *
 * Runs automated accessibility and SEO audit tools in parallel cloud sandboxes,
 * then downloads results for local Claude processing.
 *
 * No Anthropic API key required - uses your Claude Code Pro plan locally.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { uploadCodebase } from './file-sync.js';
import { SandboxPoolManager, installDependencies, initGit } from './sandbox-manager.js';
import { runFullAuditPipeline } from './tools-runner.js';
import type { OrchestratorOptions } from './types.js';

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
      : 20 * 60 * 1000, // Default 20 min for tools
  };
}

/**
 * Validate required environment variables
 */
function validateEnv(): { e2bApiKey: string } {
  const e2bApiKey = process.env.E2B_API_KEY;

  if (!e2bApiKey) {
    console.error('Error: E2B_API_KEY environment variable is required');
    console.error('Get your API key from https://e2b.dev/dashboard');
    process.exit(1);
  }

  // Note: ANTHROPIC_API_KEY not required - we use local Claude

  return { e2bApiKey };
}

/**
 * Save reports to local filesystem
 */
async function saveReports(
  reports: Map<string, string>,
  localDir: string
): Promise<string[]> {
  const reportsDir = join(localDir, 'docs', 'audits', 'raw');
  await mkdir(reportsDir, { recursive: true });

  const savedPaths: string[] = [];

  for (const [filename, content] of reports) {
    const filepath = join(reportsDir, filename);
    await writeFile(filepath, content, 'utf-8');
    savedPaths.push(filepath);
    console.log(`  Saved: docs/audits/raw/${filename}`);
  }

  return savedPaths;
}

/**
 * Generate summary of audit results
 */
function generateSummary(reports: Map<string, string>): string {
  const lines: string[] = [
    '# Audit Results Summary',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Reports Downloaded',
    '',
  ];

  for (const [filename, content] of reports) {
    try {
      const data = JSON.parse(content);

      if (filename === 'axe-results.json') {
        const violations = data.violations?.length || 0;
        const passes = data.passes?.length || 0;
        lines.push(`### axe-core`);
        lines.push(`- Violations: ${violations}`);
        lines.push(`- Passes: ${passes}`);
        lines.push('');
      }

      if (filename === 'pa11y-results.json') {
        const issues = Array.isArray(data) ? data.length : data.issues?.length || 0;
        lines.push(`### pa11y`);
        lines.push(`- Issues: ${issues}`);
        lines.push('');
      }

      if (filename === 'lighthouse-results.json') {
        const categories = data.categories || {};
        lines.push(`### Lighthouse`);
        for (const [cat, info] of Object.entries(categories)) {
          const score = Math.round(((info as any).score || 0) * 100);
          lines.push(`- ${cat}: ${score}/100`);
        }
        lines.push('');
      }
    } catch {
      lines.push(`### ${filename}`);
      lines.push('- (Could not parse)');
      lines.push('');
    }
  }

  lines.push('## Next Steps');
  lines.push('');
  lines.push('Run the following to generate remediation specs:');
  lines.push('```');
  lines.push('claude -p "Read the audit reports in docs/audits/raw/ and generate remediation specs. Write specs to docs/accessibility/specs/pending/ and docs/seo/specs/pending/"');
  lines.push('```');

  return lines.join('\n');
}

/**
 * Main orchestration function
 */
async function main(): Promise<void> {
  const options = parseArgs();
  validateEnv();
  const localDir = process.cwd();

  console.log('');
  console.log('========================================');
  console.log('E2B Parallel Audit Pipeline');
  console.log('========================================');
  console.log('');
  console.log('This runs automated tools in cloud sandboxes.');
  console.log('No Anthropic API key needed - uses your local Claude.');
  console.log('');
  console.log(`Local directory: ${localDir}`);
  console.log(`Timeout: ${options.timeout! / 1000 / 60} minutes`);
  console.log('');

  const pool = new SandboxPoolManager();

  try {
    // Phase 1: Create sandbox and upload codebase
    console.log('Phase 1: Setting up sandbox...\n');

    const { sandbox } = await pool.create('accessibility-audit', {}, options.timeout);

    // Upload codebase
    await uploadCodebase(sandbox, localDir, PROJECT_DIR);

    // Initialize git (for tracking)
    await initGit(sandbox, PROJECT_DIR);

    // Install project dependencies
    await installDependencies(sandbox, PROJECT_DIR);

    // Phase 2: Run all audits
    console.log('\nPhase 2: Running audits...\n');

    const startTime = Date.now();
    const reports = await runFullAuditPipeline(sandbox, PROJECT_DIR);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\nAudits completed in ${duration}s`);

    // Phase 3: Download and save reports
    console.log('\nPhase 3: Saving reports locally...\n');

    const savedPaths = await saveReports(reports, localDir);

    // Generate summary
    const summary = generateSummary(reports);
    const summaryPath = join(localDir, 'docs', 'audits', 'summary.md');
    await mkdir(join(localDir, 'docs', 'audits'), { recursive: true });
    await writeFile(summaryPath, summary, 'utf-8');
    console.log(`  Saved: docs/audits/summary.md`);

    // Cleanup
    console.log('\nCleaning up sandbox...');
    await pool.cleanup();

    // Final output
    console.log('');
    console.log('========================================');
    console.log('PIPELINE COMPLETE');
    console.log('========================================');
    console.log('');
    console.log('Reports saved to: docs/audits/raw/');
    console.log(`  - ${savedPaths.length} report files`);
    console.log('');
    console.log('Summary: docs/audits/summary.md');
    console.log('');
    console.log('Next: Run local Claude to process results:');
    console.log('');
    console.log('  claude -p "Read docs/audits/raw/*.json and generate');
    console.log('            remediation specs in docs/*/specs/pending/"');
    console.log('');

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
