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
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
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
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To merge: git checkout $ORIGINAL_BRANCH && git merge $BRANCH_NAME"
echo "To discard: git checkout $ORIGINAL_BRANCH && git branch -D $BRANCH_NAME"
