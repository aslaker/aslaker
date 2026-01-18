/**
 * TypeScript interfaces for e2b sandbox orchestration
 */

export interface SandboxConfig {
  /** e2b sandbox template ID */
  template: string;
  /** Timeout in milliseconds */
  timeout: number;
  /** Environment variables to pass to sandbox */
  env: Record<string, string>;
}

export interface AuditResult {
  /** Type of audit performed */
  type: 'accessibility' | 'seo';
  /** Whether the audit completed successfully */
  success: boolean;
  /** Path to the generated report */
  reportPath: string;
  /** Paths to generated spec files */
  specPaths: string[];
  /** Error message if audit failed */
  error?: string;
}

export interface ImplementationResult {
  /** Whether implementation completed successfully */
  success: boolean;
  /** List of files modified */
  modifiedFiles: string[];
  /** Specs that were completed */
  completedSpecs: string[];
  /** Error message if implementation failed */
  error?: string;
}

export interface SandboxSession {
  /** Unique sandbox ID from e2b */
  id: string;
  /** Type of session */
  type: 'accessibility-audit' | 'seo-audit' | 'implementation';
  /** Session status */
  status: 'running' | 'completed' | 'failed';
  /** Start time */
  startedAt: Date;
  /** End time if completed */
  completedAt?: Date;
}

export interface OrchestratorOptions {
  /** Run only audits, skip implementation */
  auditOnly: boolean;
  /** Enable verbose logging */
  verbose: boolean;
  /** Custom sandbox timeout in milliseconds */
  timeout?: number;
}

export interface FileToUpload {
  /** Local file path */
  localPath: string;
  /** Remote path in sandbox */
  remotePath: string;
}

export interface DownloadedFile {
  /** Remote path from sandbox */
  remotePath: string;
  /** File content as string */
  content: string;
}

export interface CommandResult {
  /** Exit code of the command */
  exitCode: number;
  /** Standard output */
  stdout: string;
  /** Standard error */
  stderr: string;
}

export interface SandboxPool {
  /** Active sandboxes keyed by session type */
  sandboxes: Map<string, SandboxSession>;
  /** Add a sandbox to the pool */
  add(session: SandboxSession): void;
  /** Remove a sandbox from the pool */
  remove(id: string): void;
  /** Clean up all sandboxes */
  cleanup(): Promise<void>;
}
