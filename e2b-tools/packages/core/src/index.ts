/**
 * @e2b-tools/core
 *
 * Core utilities for e2b sandbox operations
 */

// Types
export type {
  Sandbox,
  SandboxOptions,
  FileSyncOptions,
  CommandOptions,
  CommandResult,
  DevServerConfig,
  DevServerInstance,
  ParallelTask,
  ParallelResult,
  E2BToolsConfig,
} from './types.js';

// Sandbox management
export {
  requireApiKey,
  createSandbox,
  destroySandbox,
  SandboxManager,
  SandboxPool,
  withSandbox,
} from './sandbox/index.js';

// File sync
export {
  uploadCodebase,
  uploadFile,
  downloadFiles,
  downloadFile,
  syncResults,
} from './sync/index.js';

// Command execution
export {
  runCommand,
  runCommandWithTimeout,
  startDevServer,
  waitForServer,
  installDependencies,
  runScript,
} from './runner/index.js';

// Configuration
export {
  loadConfig,
  mergeConfigs,
  defineConfig,
  defineBaseConfig,
  getWorkflowConfig,
  validateConfig,
} from './config/index.js';
