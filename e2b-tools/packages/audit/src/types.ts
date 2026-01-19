/**
 * Types for @e2b-tools/audit
 */

/**
 * Audit tool identifiers
 */
export type AuditTool = 'lighthouse' | 'axe' | 'pa11y';

/**
 * Audit configuration
 */
export interface AuditConfig {
  /** URL to audit (can be localhost or public) */
  url: string;
  /** Which tools to run */
  tools: AuditTool[];
  /** Output directory for reports */
  outputDir: string;
  /** Output format */
  format: 'json' | 'html' | 'markdown';
  /** Dev server configuration (for local projects) */
  devServer?: {
    command: string;
    port: number;
    cwd?: string;
  };
  /** Sandbox configuration overrides */
  sandbox?: {
    timeout?: number;
    template?: string;
  };
}

/**
 * Individual audit finding
 */
export interface AuditFinding {
  /** Unique ID for the finding */
  id: string;
  /** Tool that reported this finding */
  tool: AuditTool;
  /** Severity level */
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  /** Category (accessibility, seo, performance, etc.) */
  category: string;
  /** Human-readable description */
  description: string;
  /** Affected element selector */
  selector?: string;
  /** Help text for fixing */
  help?: string;
  /** URL for more information */
  helpUrl?: string;
  /** WCAG criteria if applicable */
  wcag?: string[];
}

/**
 * Lighthouse-specific result
 */
export interface LighthouseResult {
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  audits: Record<
    string,
    {
      id: string;
      title: string;
      description: string;
      score: number | null;
      details?: unknown;
    }
  >;
}

/**
 * Axe-core specific result
 */
export interface AxeResult {
  violations: Array<{
    id: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    description: string;
    help: string;
    helpUrl: string;
    tags: string[];
    nodes: Array<{
      html: string;
      target: string[];
      failureSummary: string;
    }>;
  }>;
  passes: Array<{
    id: string;
    description: string;
  }>;
  incomplete: Array<{
    id: string;
    description: string;
  }>;
}

/**
 * Pa11y specific result
 */
export interface Pa11yResult {
  issues: Array<{
    code: string;
    type: 'error' | 'warning' | 'notice';
    message: string;
    context: string;
    selector: string;
  }>;
}

/**
 * Combined audit result
 */
export interface AuditResult {
  /** URL that was audited */
  url: string;
  /** Timestamp of the audit */
  timestamp: string;
  /** Duration in milliseconds */
  duration: number;
  /** Tools that were run */
  tools: AuditTool[];
  /** Lighthouse results (if run) */
  lighthouse?: LighthouseResult;
  /** Axe results (if run) */
  axe?: AxeResult;
  /** Pa11y results (if run) */
  pa11y?: Pa11yResult;
  /** Normalized findings from all tools */
  findings: AuditFinding[];
  /** Summary statistics */
  summary: {
    total: number;
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
}

/**
 * CLI command options
 */
export interface RunCommandOptions {
  url?: string;
  tools?: string;
  output?: string;
  format?: string;
  devCommand?: string;
  devPort?: number;
  timeout?: number;
  verbose?: boolean;
}

export interface InitCommandOptions {
  force?: boolean;
}

export interface ValidateCommandOptions {
  config?: string;
}
