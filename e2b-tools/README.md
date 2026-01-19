# E2B Tools

A Claude Code plugin ecosystem for running isolated workflows in e2b cloud sandboxes.

## Packages

| Package | Description |
|---------|-------------|
| `@e2b-tools/core` | Core sandbox utilities - lifecycle, sync, command execution |
| `@e2b-tools/audit` | Accessibility and SEO auditing (lighthouse, axe-core, pa11y) |

## Installation

### As Claude Code Plugin

```bash
claude plugins add @e2b-tools/claude-plugin
```

### As npm packages

```bash
npm install @e2b-tools/core @e2b-tools/audit
```

## Configuration

Set your E2B API key:

```bash
export E2B_API_KEY=your_api_key_here
```

Get your key at [e2b.dev/dashboard](https://e2b.dev/dashboard)

## Usage

### CLI

```bash
# Run accessibility/SEO audit
npx e2b-audit run --url http://localhost:4321

# Initialize config
npx e2b-audit init
```

### Claude Code Commands

```
/audit     - Run accessibility/SEO audit in sandbox
/optimize  - Run all workflows in parallel
```

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

## License

MIT
