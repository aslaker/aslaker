#!/usr/bin/env node

/**
 * e2b-audit CLI
 *
 * Run accessibility and SEO audits in isolated e2b sandboxes
 */

import { parseArgs } from 'node:util';
import { runAudit } from './commands/run.js';
import { initConfig } from './commands/init.js';
import { validateConfig } from './commands/validate.js';

const HELP = `
e2b-audit - Accessibility and SEO auditing in e2b sandboxes

Usage:
  e2b-audit <command> [options]

Commands:
  run       Run an audit against a URL or local project
  init      Initialize a configuration file
  validate  Validate configuration

Run Options:
  --url, -u <url>        URL to audit (default: http://localhost:4321)
  --tools, -t <tools>    Comma-separated tools: lighthouse,axe,pa11y (default: all)
  --output, -o <dir>     Output directory (default: docs/audits)
  --format, -f <format>  Output format: json,html,markdown (default: json)
  --dev-command <cmd>    Dev server command (default: npm run dev)
  --dev-port <port>      Dev server port (default: 4321)
  --timeout <seconds>    Sandbox timeout (default: 300)
  --verbose, -v          Verbose output

Init Options:
  --force                Overwrite existing config

Examples:
  e2b-audit run --url http://localhost:3000
  e2b-audit run --tools lighthouse,axe --format html
  e2b-audit init
  e2b-audit validate
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(HELP);
    process.exit(0);
  }

  const command = args[0];
  const commandArgs = args.slice(1);

  try {
    switch (command) {
      case 'run':
        await handleRun(commandArgs);
        break;
      case 'init':
        await handleInit(commandArgs);
        break;
      case 'validate':
        await handleValidate(commandArgs);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

async function handleRun(args: string[]) {
  const { values } = parseArgs({
    args,
    options: {
      url: { type: 'string', short: 'u' },
      tools: { type: 'string', short: 't' },
      output: { type: 'string', short: 'o' },
      format: { type: 'string', short: 'f' },
      'dev-command': { type: 'string' },
      'dev-port': { type: 'string' },
      timeout: { type: 'string' },
      verbose: { type: 'boolean', short: 'v' },
    },
    strict: true,
  });

  await runAudit({
    url: values.url,
    tools: values.tools,
    output: values.output,
    format: values.format,
    devCommand: values['dev-command'],
    devPort: values['dev-port'] ? parseInt(values['dev-port'], 10) : undefined,
    timeout: values.timeout ? parseInt(values.timeout, 10) : undefined,
    verbose: values.verbose,
  });
}

async function handleInit(args: string[]) {
  const { values } = parseArgs({
    args,
    options: {
      force: { type: 'boolean' },
    },
    strict: true,
  });

  await initConfig({
    force: values.force,
  });
}

async function handleValidate(args: string[]) {
  const { values } = parseArgs({
    args,
    options: {
      config: { type: 'string', short: 'c' },
    },
    strict: true,
  });

  await validateConfig({
    config: values.config,
  });
}

main();
