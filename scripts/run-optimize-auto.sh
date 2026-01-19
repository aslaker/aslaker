#!/bin/bash
set -e

# Configuration
WORKTREE_DIR="../aslaker-optimize"
BRANCH_NAME="optimize-$(date +%Y%m%d-%H%M%S)"
ORIGINAL_DIR="$(pwd)"
ORIGINAL_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

echo "🔧 Setting up isolated optimization environment..."
echo "Original branch: $ORIGINAL_BRANCH"

# Clean up existing worktree if it exists
if [ -d "$WORKTREE_DIR" ]; then
    echo "Removing existing worktree at $WORKTREE_DIR..."
    git worktree remove "$WORKTREE_DIR" --force 2>/dev/null || rm -rf "$WORKTREE_DIR"
fi

# Create fresh worktree with new branch from current branch
echo "Creating worktree: $WORKTREE_DIR (branch: $BRANCH_NAME)"
git worktree add -b "$BRANCH_NAME" "$WORKTREE_DIR"

# Install dependencies in worktree
echo "Installing dependencies..."
cd "$WORKTREE_DIR"
npm install

echo ""
echo "✅ Worktree ready at: $WORKTREE_DIR"
echo "✅ Branch: $BRANCH_NAME (from $ORIGINAL_BRANCH)"
echo ""
echo "Launching Claude Code with /optimize command..."
echo ""

# Launch Claude Code with skip permissions and auto-run optimize
claude --dangerously-skip-permissions -p "/optimize"

# After Claude exits, show changes for review
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Optimization session complete!"
echo ""

# Check if there are any changes
cd "$WORKTREE_DIR"
CHANGES=$(git log "$ORIGINAL_BRANCH".."$BRANCH_NAME" --oneline 2>/dev/null || echo "")

if [ -z "$CHANGES" ]; then
    echo "No commits were made. Nothing to merge."
    cd "$ORIGINAL_DIR"
    git worktree remove "$WORKTREE_DIR" --force 2>/dev/null || true
    git branch -d "$BRANCH_NAME" 2>/dev/null || true
    exit 0
fi

echo "📋 Changes made in this session:"
echo ""
git log "$ORIGINAL_BRANCH".."$BRANCH_NAME" --oneline
echo ""
echo "📁 Files changed:"
git diff --stat "$ORIGINAL_BRANCH".."$BRANCH_NAME"
echo ""
echo "View audit reports:"
echo "  cat $WORKTREE_DIR/docs/accessibility/audits/accessibility_report.md"
echo "  cat $WORKTREE_DIR/docs/seo/audits/seo_report.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To view full diff:  git diff $ORIGINAL_BRANCH..$BRANCH_NAME"
echo "Worktree location:  $WORKTREE_DIR"
echo ""

read -p "Merge these changes into $ORIGINAL_BRANCH? [y/N] " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Merging changes..."
    cd "$ORIGINAL_DIR"
    git merge "$BRANCH_NAME" --no-edit
    echo "✅ Changes merged into $ORIGINAL_BRANCH"

    # Clean up
    echo "Cleaning up worktree..."
    git worktree remove "$WORKTREE_DIR" --force 2>/dev/null || true
    git branch -d "$BRANCH_NAME" 2>/dev/null || true
    echo "✅ Done!"
else
    echo ""
    echo "Changes NOT merged. Worktree preserved for review."
    echo ""
    echo "To review:  cd $WORKTREE_DIR"
    echo "To merge:   cd $ORIGINAL_DIR && git merge $BRANCH_NAME"
    echo "To discard: git worktree remove $WORKTREE_DIR && git branch -D $BRANCH_NAME"
fi
