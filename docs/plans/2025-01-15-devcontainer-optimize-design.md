# Devcontainer for Isolated Optimization Audits

## Problem

The `scripts/run-optimize-auto.sh` script runs Claude Code with `--dangerously-skip-permissions`. While a git worktree provides branch isolation, it doesn't prevent filesystem access to the host system.

## Solution

A devcontainer that provides true filesystem and network isolation while allowing Claude Code to run autonomous optimization audits.

## Decisions

| Concern | Decision |
|---------|----------|
| Authentication | Mount `~/.claude` read-only |
| Network | `--network=none` (audits run against localhost inside container) |
| Worktree | Eliminated - work in-place on a branch |
| Browser | Playwright base image with Chromium included |

## File Structure

```
.devcontainer/
├── devcontainer.json    # VS Code/devcontainer config
├── Dockerfile           # Custom image with Claude CLI
└── run-optimize.sh      # Container-specific script
```

## Container Configuration

### Dockerfile

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Install Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

# Set working directory
WORKDIR /workspace
```

### devcontainer.json

```json
{
  "name": "aslaker-optimize",
  "build": { "dockerfile": "Dockerfile" },
  "mounts": [
    "source=${localEnv:HOME}/.claude,target=/home/pwuser/.claude,type=bind,readonly"
  ],
  "runArgs": ["--network=none"],
  "workspaceFolder": "/workspace",
  "postCreateCommand": "npm install"
}
```

## Run Script

`.devcontainer/run-optimize.sh`:

```bash
#!/bin/bash
set -e

BRANCH_NAME="optimize-$(date +%Y%m%d-%H%M%S)"
ORIGINAL_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

echo "Setting up isolated optimization environment..."
echo "Original branch: $ORIGINAL_BRANCH"

# Create optimization branch
git checkout -b "$BRANCH_NAME"

echo ""
echo "Branch: $BRANCH_NAME (from $ORIGINAL_BRANCH)"
echo ""
echo "Launching Claude Code with /optimize command..."
echo ""

# Run Claude with skip permissions and auto-execute optimize
claude --dangerously-skip-permissions -p "/optimize"

# After Claude exits, show changes
echo ""
echo "Optimization session complete!"
echo ""

# Show what changed
COMMITS=$(git log "$ORIGINAL_BRANCH".."$BRANCH_NAME" --oneline 2>/dev/null || echo "")

if [ -z "$COMMITS" ]; then
    echo "No commits were made."
    git checkout "$ORIGINAL_BRANCH"
    git branch -d "$BRANCH_NAME" 2>/dev/null || true
    exit 0
fi

echo "Changes made:"
git log "$ORIGINAL_BRANCH".."$BRANCH_NAME" --oneline
echo ""
echo "Files changed:"
git diff --stat "$ORIGINAL_BRANCH".."$BRANCH_NAME"
echo ""
echo "To merge: git checkout $ORIGINAL_BRANCH && git merge $BRANCH_NAME"
echo "To discard: git checkout $ORIGINAL_BRANCH && git branch -D $BRANCH_NAME"
```

## Usage

### VS Code / Cursor

1. Open project
2. Command Palette → "Dev Containers: Reopen in Container"
3. Run: `.devcontainer/run-optimize.sh`
4. Review changes, exit container
5. Merge or discard branch on host

### CLI

```bash
# Build
docker build -t aslaker-optimize .devcontainer/

# Run
docker run -it --rm \
  --network=none \
  -v "$(pwd)":/workspace \
  -v "$HOME/.claude":/home/pwuser/.claude:ro \
  aslaker-optimize \
  .devcontainer/run-optimize.sh
```

## Security Properties

- **Filesystem**: Container only sees `/workspace` (project) and read-only Claude credentials
- **Network**: No external network access; audits run against localhost inside container
- **Permissions**: Claude runs with skip-permissions, but damage is contained to the mounted project
