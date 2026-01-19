/**
 * Validate command - validates configuration file
 */

import { loadConfig, validateConfig as validateConfigSchema } from '@e2b-tools/core';
import type { ValidateCommandOptions } from '../../types.js';

/**
 * Validate configuration file
 */
export async function validateConfig(options: ValidateCommandOptions): Promise<void> {
  try {
    const config = await loadConfig(options.config ?? process.cwd());

    if (!validateConfigSchema(config)) {
      console.error('Configuration is invalid');
      process.exit(1);
    }

    console.log('Configuration is valid!');
    console.log('');
    console.log('Loaded configuration:');
    console.log(JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Failed to load configuration:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
