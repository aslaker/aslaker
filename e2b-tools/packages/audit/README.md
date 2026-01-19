# @e2b-tools/audit

Accessibility and SEO auditing in isolated E2B sandboxes.

## Installation

```bash
npm install @e2b-tools/audit
```

## Usage

```bash
# Set your E2B API key
export E2B_API_KEY=your_key_here

# Run audit against a URL
e2b-audit run --url https://example.com --tools lighthouse,axe,pa11y

# Run audit with local dev server
e2b-audit run --verbose
```

## Known Limitations

### Browser Support in E2B Sandboxes

The default E2B `base` template has limited browser support. Chrome/Chromium installs but Puppeteer-based tools (Lighthouse, pa11y, axe-cli) may timeout due to:

- Limited memory for V8/Chrome processes
- Missing kernel features for process isolation
- dbus/systemd dependencies not running

### Recommended Solutions

**Option 1: Custom E2B Template (Recommended)**

Create a custom template with browser pre-installed and configured:

```bash
# Requires E2B_ACCESS_TOKEN (not E2B_API_KEY)
# Get token from: https://e2b.dev/dashboard?tab=personal

e2b auth login
e2b template build  # Uses e2b.Dockerfile in this repo
```

Then update `packages/core/src/sandbox/manager.ts` with your template ID.

**Option 2: Use Browser-as-a-Service**

Instead of running browsers in E2B, use a service like:
- [Browserbase](https://www.browserbase.com/)
- [Browserless](https://www.browserless.io/)

**Option 3: Run Audits Locally**

For quick audits, run tools locally:

```bash
npm install -g lighthouse @axe-core/cli pa11y
lighthouse https://example.com --output json
```

## Configuration

Create `e2b-tools.config.ts` in your project root:

```typescript
import { defineConfig } from '@e2b-tools/core';

export default defineConfig({
  audit: {
    tools: { lighthouse: true, axe: true, pa11y: true },
    output: { dir: 'docs/audits', format: 'json' },
  },
});
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--url` | URL to audit | `http://localhost:4321` |
| `--tools` | Comma-separated tools | `lighthouse,axe,pa11y` |
| `--output` | Output directory | `docs/audits` |
| `--format` | Output format | `json` |
| `--verbose` | Show detailed output | `false` |
| `--timeout` | Sandbox timeout (seconds) | `600` |

## Development

```bash
# Build
npm run build

# Test (requires E2B_API_KEY)
E2B_API_KEY=xxx node dist/cli/index.js run --verbose
```
