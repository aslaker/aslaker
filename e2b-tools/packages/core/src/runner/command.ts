import { Sandbox } from 'e2b';
import type {
  CommandOptions,
  CommandResult,
  DevServerConfig,
  DevServerInstance,
} from '../types.js';

/**
 * Default command options
 */
const DEFAULT_OPTIONS: Required<Omit<CommandOptions, 'onStdout' | 'onStderr'>> =
  {
    cwd: '/home/user/project',
    env: {},
    timeout: 120000, // 2 minutes
  };

/**
 * Run a command in the sandbox
 */
export async function runCommand(
  sandbox: Sandbox,
  command: string,
  options: CommandOptions = {}
): Promise<CommandResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  let stdout = '';
  let stderr = '';

  const result = await sandbox.commands.run(command, {
    cwd: opts.cwd,
    envs: opts.env,
    timeoutMs: opts.timeout,
    onStdout: (data) => {
      stdout += data;
      opts.onStdout?.(data);
    },
    onStderr: (data) => {
      stderr += data;
      opts.onStderr?.(data);
    },
  });

  return {
    exitCode: result.exitCode,
    stdout,
    stderr,
  };
}

/**
 * Run a command with explicit timeout
 */
export async function runCommandWithTimeout(
  sandbox: Sandbox,
  command: string,
  timeoutMs: number,
  options: Omit<CommandOptions, 'timeout'> = {}
): Promise<CommandResult> {
  return runCommand(sandbox, command, { ...options, timeout: timeoutMs });
}

/**
 * Default dev server configuration
 */
const DEFAULT_DEV_SERVER: Required<DevServerConfig> = {
  port: 3000,
  command: 'npm run dev',
  cwd: '/home/user/project',
  readyMessage: 'ready',
  startupTimeout: 60000, // 1 minute
};

/**
 * Start a development server in the sandbox
 */
export async function startDevServer(
  sandbox: Sandbox,
  config: Partial<DevServerConfig> = {}
): Promise<DevServerInstance> {
  const opts = { ...DEFAULT_DEV_SERVER, ...config };

  // Start server in background
  const process = await sandbox.commands.run(opts.command, {
    cwd: opts.cwd,
    background: true,
  });

  // Wait for server to be ready
  await waitForServer(sandbox, opts.port, opts.startupTimeout);

  // Get the public URL for the server
  const url = `https://${sandbox.getHost(opts.port)}`;

  return {
    url,
    port: opts.port,
    stop: async () => {
      await process.kill();
    },
  };
}

/**
 * Wait for a server to be ready on a given port
 */
export async function waitForServer(
  sandbox: Sandbox,
  port: number,
  timeoutMs: number = 60000
): Promise<void> {
  const startTime = Date.now();
  const checkInterval = 1000; // Check every second

  while (Date.now() - startTime < timeoutMs) {
    try {
      // Try to connect to the port
      const result = await sandbox.commands.run(
        `curl -s -o /dev/null -w "%{http_code}" http://localhost:${port} || echo "000"`,
        { timeoutMs: 5000 }
      );

      const statusCode = result.stdout.trim();
      // Consider any non-000 response as server being up
      if (statusCode !== '000') {
        return;
      }
    } catch {
      // Ignore errors, keep trying
    }

    // Wait before next check
    await new Promise((resolve) => setTimeout(resolve, checkInterval));
  }

  throw new Error(
    `Server did not start on port ${port} within ${timeoutMs}ms`
  );
}

/**
 * Install dependencies in the sandbox
 */
export async function installDependencies(
  sandbox: Sandbox,
  cwd: string = '/home/user/project',
  packageManager: 'npm' | 'yarn' | 'pnpm' = 'npm'
): Promise<CommandResult> {
  const commands = {
    npm: 'npm install',
    yarn: 'yarn install',
    pnpm: 'pnpm install',
  };

  return runCommand(sandbox, commands[packageManager], {
    cwd,
    timeout: 300000, // 5 minutes for install
  });
}

/**
 * Run npm/yarn/pnpm script
 */
export async function runScript(
  sandbox: Sandbox,
  script: string,
  cwd: string = '/home/user/project',
  packageManager: 'npm' | 'yarn' | 'pnpm' = 'npm'
): Promise<CommandResult> {
  const commands = {
    npm: `npm run ${script}`,
    yarn: `yarn ${script}`,
    pnpm: `pnpm ${script}`,
  };

  return runCommand(sandbox, commands[packageManager], { cwd });
}
