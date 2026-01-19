/**
 * Init command - creates configuration file
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { InitCommandOptions } from '../../types.js';

const CONFIG_TEMPLATE = `import { defineConfig } from '@e2b-tools/core';

export default defineConfig({
  base: {
    sandbox: {
      timeout: 300,
    },
    fileSync: {
      exclude: ['node_modules', '.git', 'dist', 'build'],
    },
    devServer: {
      port: 4321,
      command: 'npm run dev',
    },
  },
  audit: {
    tools: {
      lighthouse: true,
      axe: true,
      pa11y: true,
    },
    output: {
      dir: 'docs/audits',
      format: 'json',
    },
  },
});
`;

const CONFIG_FILENAME = 'e2b-tools.config.ts';

/**
 * Initialize configuration file
 */
export async function initConfig(options: InitCommandOptions): Promise<void> {
  const configPath = path.resolve(process.cwd(), CONFIG_FILENAME);

  if (fs.existsSync(configPath) && !options.force) {
    console.error(`Config file already exists: ${configPath}`);
    console.error('Use --force to overwrite');
    process.exit(1);
  }

  fs.writeFileSync(configPath, CONFIG_TEMPLATE);
  console.log(`Created ${CONFIG_FILENAME}`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Edit the config file to match your project');
  console.log('  2. Run: e2b-audit run');
}
