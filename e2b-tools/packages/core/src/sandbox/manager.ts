import { Sandbox } from 'e2b';
import type { SandboxOptions } from '../types.js';

/**
 * Get the E2B API key from environment
 * @throws Error if E2B_API_KEY is not set
 */
export function requireApiKey(): string {
  const key = process.env.E2B_API_KEY;
  if (!key) {
    throw new Error(
      'E2B_API_KEY is required.\n' +
        'Get your key: https://e2b.dev/dashboard\n' +
        'Set via: shell profile, .env, or secret manager'
    );
  }
  return key;
}

/**
 * Default sandbox options
 * Uses custom 'audit-node22-chrome' template with:
 * - Node 22+ (for latest Lighthouse)
 * - Chrome/Chromium pre-installed
 * - Lighthouse, axe-cli, pa11y pre-installed
 */
const DEFAULT_OPTIONS: Required<SandboxOptions> = {
  template: 'o9qbmv9te4ms59ge7b0o',
  timeout: 300,
  env: {},
  metadata: {},
};

/**
 * Create a new sandbox instance
 */
export async function createSandbox(
  options: SandboxOptions = {}
): Promise<Sandbox> {
  requireApiKey();

  const opts = { ...DEFAULT_OPTIONS, ...options };

  const sandbox = await Sandbox.create(opts.template, {
    timeoutMs: opts.timeout * 1000,
    envs: opts.env,
    metadata: opts.metadata,
  });

  return sandbox;
}

/**
 * Destroy a sandbox instance
 */
export async function destroySandbox(sandbox: Sandbox): Promise<void> {
  await sandbox.kill();
}

/**
 * Managed sandbox with automatic cleanup
 */
export class SandboxManager {
  private sandbox: Sandbox | null = null;
  private readonly options: SandboxOptions;

  constructor(options: SandboxOptions = {}) {
    this.options = options;
  }

  /**
   * Get or create the sandbox
   */
  async getSandbox(): Promise<Sandbox> {
    if (!this.sandbox) {
      this.sandbox = await createSandbox(this.options);
    }
    return this.sandbox;
  }

  /**
   * Check if sandbox is currently active
   */
  isActive(): boolean {
    return this.sandbox !== null;
  }

  /**
   * Destroy the sandbox and clean up
   */
  async destroy(): Promise<void> {
    if (this.sandbox) {
      await destroySandbox(this.sandbox);
      this.sandbox = null;
    }
  }

  /**
   * Execute a function with the sandbox, handling cleanup on error
   */
  async execute<T>(fn: (sandbox: Sandbox) => Promise<T>): Promise<T> {
    const sandbox = await this.getSandbox();
    try {
      return await fn(sandbox);
    } catch (error) {
      // On error, destroy sandbox to ensure clean state
      await this.destroy();
      throw error;
    }
  }
}

/**
 * Pool of sandboxes for parallel execution
 */
export class SandboxPool {
  private readonly pool: Map<string, Sandbox> = new Map();
  private readonly baseOptions: SandboxOptions;

  constructor(baseOptions: SandboxOptions = {}) {
    this.baseOptions = baseOptions;
  }

  /**
   * Acquire a sandbox from the pool
   */
  async acquire(
    id: string,
    options: Partial<SandboxOptions> = {}
  ): Promise<Sandbox> {
    if (this.pool.has(id)) {
      return this.pool.get(id)!;
    }

    const sandbox = await createSandbox({
      ...this.baseOptions,
      ...options,
    });

    this.pool.set(id, sandbox);
    return sandbox;
  }

  /**
   * Release a sandbox back to the pool (destroys it)
   */
  async release(id: string): Promise<void> {
    const sandbox = this.pool.get(id);
    if (sandbox) {
      await destroySandbox(sandbox);
      this.pool.delete(id);
    }
  }

  /**
   * Get current pool size
   */
  get size(): number {
    return this.pool.size;
  }

  /**
   * Get all sandbox IDs in the pool
   */
  get ids(): string[] {
    return Array.from(this.pool.keys());
  }

  /**
   * Destroy all sandboxes in the pool
   */
  async destroyAll(): Promise<void> {
    const destroyPromises = Array.from(this.pool.entries()).map(
      async ([id, sandbox]) => {
        await destroySandbox(sandbox);
        this.pool.delete(id);
      }
    );
    await Promise.all(destroyPromises);
  }
}

/**
 * Run a function with automatic sandbox lifecycle management
 */
export async function withSandbox<T>(
  fn: (sandbox: Sandbox) => Promise<T>,
  options: SandboxOptions = {}
): Promise<T> {
  const sandbox = await createSandbox(options);
  try {
    return await fn(sandbox);
  } finally {
    await destroySandbox(sandbox);
  }
}
