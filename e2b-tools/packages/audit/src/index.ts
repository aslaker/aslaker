/**
 * @e2b-tools/audit
 *
 * Accessibility and SEO auditing in e2b sandboxes
 */

// Types
export type {
  AuditTool,
  AuditConfig,
  AuditFinding,
  AuditResult,
  LighthouseResult,
  AxeResult,
  Pa11yResult,
} from './types.js';

// Programmatic API
export { runAudit } from './cli/commands/run.js';
export { initConfig } from './cli/commands/init.js';
export { validateConfig } from './cli/commands/validate.js';
