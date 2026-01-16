/**
 * Sandbox lifecycle management for e2b
 * Handles creating, running commands, and cleaning up sandboxes
 */

import { Sandbox } from 'e2b';
import type { SandboxSession, CommandResult } from './types.js';

/** Default sandbox template - Ubuntu with Node.js */
const DEFAULT_TEMPLATE = 'base';

/** Default timeout: 30 minutes */
const DEFAULT_TIMEOUT = 30 * 60 * 1000;

/**
 * Pool to track active sandboxes for cleanup
 */
export class SandboxPoolManager {
  private sandboxes = new Map<string, Sandbox>();
  private sessions = new Map<string, SandboxSession>();

  constructor() {
    // Register cleanup handlers
    process.on('SIGINT', () => this.cleanup());
    process.on('SIGTERM', () => this.cleanup());
    process.on('uncaughtException', (err) => {
      console.error('Uncaught exception:', err);
      this.cleanup();
    });
  }

  /**
   * Create a new sandbox and add to pool
   */
  async create(
    sessionType: SandboxSession['type'],
    env: Record<string, string> = {},
    timeout: number = DEFAULT_TIMEOUT
  ): Promise<{ sandbox: Sandbox; session: SandboxSession }> {
    console.log(`Creating ${sessionType} sandbox...`);

    const sandbox = await Sandbox.create(DEFAULT_TEMPLATE, {
      timeoutMs: timeout,
    });

    const session: SandboxSession = {
      id: sandbox.sandboxId,
      type: sessionType,
      status: 'running',
      startedAt: new Date(),
    };

    this.sandboxes.set(sandbox.sandboxId, sandbox);
    this.sessions.set(sandbox.sandboxId, session);

    console.log(`  Sandbox ${sandbox.sandboxId} created`);
    return { sandbox, session };
  }

  /**
   * Get sandbox by ID
   */
  get(id: string): Sandbox | undefined {
    return this.sandboxes.get(id);
  }

  /**
   * Mark session as completed
   */
  markCompleted(id: string): void {
    const session = this.sessions.get(id);
    if (session) {
      session.status = 'completed';
      session.completedAt = new Date();
    }
  }

  /**
   * Mark session as failed
   */
  markFailed(id: string): void {
    const session = this.sessions.get(id);
    if (session) {
      session.status = 'failed';
      session.completedAt = new Date();
    }
  }

  /**
   * Kill a specific sandbox
   */
  async kill(id: string): Promise<void> {
    const sandbox = this.sandboxes.get(id);
    if (sandbox) {
      console.log(`Killing sandbox ${id}...`);
      try {
        await sandbox.kill();
      } catch (err) {
        console.log(`  Warning: Error killing sandbox: ${err}`);
      }
      this.sandboxes.delete(id);
      this.sessions.delete(id);
    }
  }

  /**
   * Clean up all sandboxes
   */
  async cleanup(): Promise<void> {
    console.log('\nCleaning up sandboxes...');
    const killPromises = Array.from(this.sandboxes.keys()).map((id) =>
      this.kill(id)
    );
    await Promise.allSettled(killPromises);
    console.log('Cleanup complete');
  }

  /**
   * Get all active sessions
   */
  getActiveSessions(): SandboxSession[] {
    return Array.from(this.sessions.values()).filter(
      (s) => s.status === 'running'
    );
  }
}

/**
 * Run a command in a sandbox with streaming output
 */
export async function runCommand(
  sandbox: Sandbox,
  command: string,
  cwd: string = '/home/user/project',
  streamOutput: boolean = true
): Promise<CommandResult> {
  console.log(`Running: ${command}`);

  const result = await sandbox.commands.run(command, {
    cwd,
    onStdout: streamOutput ? (data) => process.stdout.write(data) : undefined,
    onStderr: streamOutput ? (data) => process.stderr.write(data) : undefined,
  });

  return {
    exitCode: result.exitCode,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

/**
 * Install dependencies in sandbox
 */
export async function installDependencies(
  sandbox: Sandbox,
  projectDir: string = '/home/user/project'
): Promise<void> {
  console.log('Installing dependencies in sandbox...');

  // Install Node.js and npm if not present
  await runCommand(sandbox, 'which node || curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs', '/home/user', false);

  // Install project dependencies
  const result = await runCommand(sandbox, 'npm install', projectDir, false);

  if (result.exitCode !== 0) {
    throw new Error(`Failed to install dependencies: ${result.stderr}`);
  }

  console.log('  Dependencies installed');
}

/**
 * Install Claude CLI in sandbox
 */
export async function installClaudeCLI(
  sandbox: Sandbox,
  anthropicApiKey: string
): Promise<void> {
  console.log('Installing Claude CLI in sandbox...');

  // Install Claude CLI
  const installResult = await runCommand(
    sandbox,
    'npm install -g @anthropic-ai/claude-code',
    '/home/user',
    false
  );

  if (installResult.exitCode !== 0) {
    throw new Error(`Failed to install Claude CLI: ${installResult.stderr}`);
  }

  // Set up API key in environment
  await runCommand(
    sandbox,
    `echo "export ANTHROPIC_API_KEY=${anthropicApiKey}" >> ~/.bashrc`,
    '/home/user',
    false
  );

  console.log('  Claude CLI installed');
}

/**
 * Run Claude with a specific command in sandbox
 */
export async function runClaudeCommand(
  sandbox: Sandbox,
  command: string,
  projectDir: string = '/home/user/project',
  anthropicApiKey: string
): Promise<CommandResult> {
  console.log(`Running Claude command: ${command}`);

  const fullCommand = `ANTHROPIC_API_KEY=${anthropicApiKey} claude --dangerously-skip-permissions -p "${command}"`;

  return runCommand(sandbox, fullCommand, projectDir, true);
}

/**
 * Initialize git in sandbox project
 */
export async function initGit(
  sandbox: Sandbox,
  projectDir: string = '/home/user/project'
): Promise<void> {
  console.log('Initializing git in sandbox...');

  await runCommand(sandbox, 'git init', projectDir, false);
  await runCommand(sandbox, 'git config user.email "sandbox@e2b.dev"', projectDir, false);
  await runCommand(sandbox, 'git config user.name "E2B Sandbox"', projectDir, false);
  await runCommand(sandbox, 'git add -A', projectDir, false);
  await runCommand(sandbox, 'git commit -m "Initial commit"', projectDir, false);

  console.log('  Git initialized');
}
