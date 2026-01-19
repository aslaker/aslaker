import * as fs from 'node:fs';
import * as path from 'node:path';
import type { E2BToolsConfig } from '../types.js';

/**
 * Config file names to search for (in order of priority)
 */
const CONFIG_FILES = [
  'e2b-tools.config.ts',
  'e2b-tools.config.js',
  'e2b-tools.config.mjs',
  'e2b-tools.config.json',
];

/**
 * Default configuration
 */
const DEFAULT_CONFIG: E2BToolsConfig = {
  base: {
    sandbox: {
      template: 'base',
      timeout: 300,
    },
    fileSync: {
      exclude: ['node_modules', '.git', 'dist', 'build'],
    },
    devServer: {
      port: 3000,
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
};

/**
 * Find config file in directory and parents
 */
function findConfigFile(startDir: string): string | null {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    for (const configFile of CONFIG_FILES) {
      const configPath = path.join(currentDir, configFile);
      if (fs.existsSync(configPath)) {
        return configPath;
      }
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
}

/**
 * Load config from a JSON file
 */
function loadJsonConfig(configPath: string): E2BToolsConfig {
  const content = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(content) as E2BToolsConfig;
}

/**
 * Load config from a JS/TS file
 */
async function loadJsConfig(configPath: string): Promise<E2BToolsConfig> {
  // For TypeScript files, we need to use dynamic import
  // This assumes the project has proper TypeScript/ESM setup
  const module = await import(configPath);
  return module.default as E2BToolsConfig;
}

/**
 * Deep merge two config objects
 */
function deepMerge(
  base: E2BToolsConfig,
  override: Partial<E2BToolsConfig>
): E2BToolsConfig {
  const result = { ...base } as Record<string, unknown>;

  for (const key of Object.keys(override)) {
    const overrideValue = override[key as keyof E2BToolsConfig];
    const baseValue = base[key as keyof E2BToolsConfig];

    if (
      overrideValue !== undefined &&
      typeof overrideValue === 'object' &&
      overrideValue !== null &&
      !Array.isArray(overrideValue) &&
      typeof baseValue === 'object' &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMergeObject(
        baseValue as Record<string, unknown>,
        overrideValue as Record<string, unknown>
      );
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }

  return result as E2BToolsConfig;
}

/**
 * Deep merge helper for nested objects
 */
function deepMergeObject(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...base };

  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = base[key];

    if (
      overrideValue !== undefined &&
      typeof overrideValue === 'object' &&
      overrideValue !== null &&
      !Array.isArray(overrideValue) &&
      typeof baseValue === 'object' &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMergeObject(
        baseValue as Record<string, unknown>,
        overrideValue as Record<string, unknown>
      );
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }

  return result;
}

/**
 * Load configuration from file or use defaults
 */
export async function loadConfig(
  startDir: string = process.cwd()
): Promise<E2BToolsConfig> {
  const configPath = findConfigFile(startDir);

  if (!configPath) {
    return DEFAULT_CONFIG;
  }

  let userConfig: E2BToolsConfig;

  if (configPath.endsWith('.json')) {
    userConfig = loadJsonConfig(configPath);
  } else {
    userConfig = await loadJsConfig(configPath);
  }

  return mergeConfigs(DEFAULT_CONFIG, userConfig);
}

/**
 * Merge multiple configs together (later configs override earlier)
 */
export function mergeConfigs(
  ...configs: Array<Partial<E2BToolsConfig>>
): E2BToolsConfig {
  let result = DEFAULT_CONFIG;

  for (const config of configs) {
    result = deepMerge(result, config);
  }

  return result;
}

/**
 * Helper to define a config with type safety
 */
export function defineConfig(config: E2BToolsConfig): E2BToolsConfig {
  return config;
}

/**
 * Helper to define a base config (partial)
 */
export function defineBaseConfig(
  config: Partial<E2BToolsConfig>
): Partial<E2BToolsConfig> {
  return config;
}

/**
 * Get config for a specific workflow
 */
export function getWorkflowConfig<K extends keyof E2BToolsConfig>(
  config: E2BToolsConfig,
  workflow: K
): E2BToolsConfig[K] {
  return config[workflow];
}

/**
 * Validate config structure
 */
export function validateConfig(config: unknown): config is E2BToolsConfig {
  if (typeof config !== 'object' || config === null) {
    return false;
  }

  // Basic structure validation
  const c = config as Record<string, unknown>;

  if (c.base !== undefined && typeof c.base !== 'object') {
    return false;
  }

  if (c.audit !== undefined && typeof c.audit !== 'object') {
    return false;
  }

  if (c.test !== undefined && typeof c.test !== 'object') {
    return false;
  }

  if (c.security !== undefined && typeof c.security !== 'object') {
    return false;
  }

  return true;
}
