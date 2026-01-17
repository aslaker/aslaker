# LinkedIn Post Draft

**PR:** #10 - fix: add tool permissions for linkedin-post workflow
**Generated:** 2026-01-17

---

Ever had to debug why your AI agent couldn't do its job? I just spent time fixing a workflow where Claude Code was generating LinkedIn posts... but couldn't save them.

The setup: I built a GitHub Action that automatically runs Claude Code after merging PRs, generating LinkedIn post drafts about the changes. Clever, right?

The problem: The workflow kept succeeding, logs showed perfect drafts, but no files appeared. Turns out `claude-code-action` runs with restrictive permissions by default - Claude could think and plan, but couldn't write files or run git commands.

The fix was simple but instructive: explicit tool permissions. Added `--allowedTools "Write,Bash(git:*),Bash(gh:*)"` to grant exactly what was needed. Not too much, not too little.

What's interesting here isn't the technical fix - it's the principle. When you're building with AI agents, permission boundaries become critical. Too loose and you risk unintended actions. Too tight and the agent can't function. Finding that balance is the new debugging skill.

Have you hit similar permission puzzles when automating with AI? Curious what patterns people are finding.

---

**Suggested hashtags:** #AIEngineering #GitHubActions #Automation #DevOps #ClaudeAI
**Suggested posting time:** morning (9-10am ET)
