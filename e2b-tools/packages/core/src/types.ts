/**
 * Core types for e2b-tools
 */

// Re-export Sandbox type from e2b
export type { Sandbox } from 'e2b';

/**
 * Options for creating a sandbox
 */
export interface SandboxOptions {
  /** Sandbox template to use (default: 'base') */
  template?: string;
  /** Timeout in seconds (default: 300) */
  timeout?: number;
  /** Environment variables to set */
  env?: Record<string, string>;
  /** Metadata for the sandbox */
  metadata?: Record<string, string>;
}

/**
 * Options for file sync operations
 */
export interface FileSyncOptions {
  /** Glob patterns to exclude */
  exclude?: string[];
  /** Glob patterns to include (overrides exclude) */
  include?: string[];
  /** Base directory for relative paths */
  baseDir?: string;
}

/**
 * Options for command execution
 */
export interface CommandOptions {
  /** Working directory for the command */
  cwd?: string;
  /** Environment variables */
  env?: Record<string, string>;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Callback for stdout data */
  onStdout?: (data: string) => void;
  /** Callback for stderr data */
  onStderr?: (data: string) => void;
}

/**
 * Result of command execution
 */
export interface CommandResult {
  /** Exit code */
  exitCode: number;
  /** Combined stdout */
  stdout: string;
  /** Combined stderr */
  stderr: string;
}

/**
 * Dev server configuration
 */
export interface DevServerConfig {
  /** Port to run on */
  port: number;
  /** Command to start the server */
  command: string;
  /** Working directory */
  cwd?: string;
  /** String to wait for in output before considering server ready */
  readyMessage?: string;
  /** Timeout waiting for server to start (ms) */
  startupTimeout?: number;
}

/**
 * Dev server instance
 */
export interface DevServerInstance {
  /** Server URL */
  url: string;
  /** Port the server is running on */
  port: number;
  /** Stop the server */
  stop: () => Promise<void>;
}

/**
 * Parallel task definition
 */
export interface ParallelTask<T = unknown> {
  /** Unique task identifier */
  id: string;
  /** Optional sandbox configuration override */
  sandboxConfig?: Partial<SandboxOptions>;
  /** Task execution function */
  execute: (sandbox: import('e2b').Sandbox) => Promise<T>;
}

/**
 * Result from parallel execution
 */
export interface ParallelResult<T = unknown> {
  /** Task ID */
  id: string;
  /** Whether task succeeded */
  success: boolean;
  /** Result if successful */
  result?: T;
  /** Error if failed */
  error?: Error;
  /** Execution duration in ms */
  duration: number;
}

/**
 * E2B tools configuration
 */
export interface E2BToolsConfig {
  /** Base configuration for all workflows */
  base?: {
    sandbox?: SandboxOptions;
    fileSync?: FileSyncOptions;
    devServer?: DevServerConfig;
  };
  /** Audit workflow configuration */
  audit?: {
    tools?: {
      lighthouse?: boolean;
      axe?: boolean;
      pa11y?: boolean;
    };
    output?: {
      dir?: string;
      format?: 'json' | 'html' | 'markdown';
    };
  };
  /** Test workflow configuration (future) */
  test?: {
    framework?: 'vitest' | 'jest' | 'playwright';
    coverage?: boolean;
  };
  /** Security workflow configuration (future) */
  security?: {
    tools?: string[];
    severity?: 'low' | 'medium' | 'high' | 'critical';
  };
}
