# Claude Code Native Tools

## Task

Description: Launch specialized agents (subprocesses) to handle complex, multi-step tasks autonomously. Each agent type has specific capabilities and tools available to it.

Usage:

```
Task(
  description: string,      # Short 3-5 word description
  prompt: string,           # Detailed task instructions
  subagent_type: string,    # Agent type: "Explore", "Plan", "Bash", "general-purpose", etc.
  model?: string,           # Optional: "sonnet", "opus", "haiku"
  run_in_background?: bool, # Optional: run asynchronously
  resume?: string           # Optional: agent ID to resume
)
```

Uses:

- Exploring codebases to find files, search for patterns, or understand architecture (`subagent_type=Explore`)
- Running background tasks that take a long time to complete
- Delegating complex research tasks that require multiple search rounds
- Planning implementation strategies (`subagent_type=Plan`)
- Example: `Task` with `subagent_type=Explore` to find all files handling authentication in a large codebase

---

## TaskOutput

Description: Retrieves output from a running or completed task (background shell, agent, or remote session). Returns task output along with status information.

Usage:

```
TaskOutput(
  task_id: string,    # The task ID to get output from
  block?: bool,       # Wait for completion (default: true)
  timeout?: number    # Max wait time in ms (default: 30000)
)
```

Uses:

- Checking the progress of a long-running background task
- Retrieving results from an async agent after it completes
- Monitoring background shell commands
- Example: Check if a background `npm run build` has completed and view any errors

---

## Bash

Description: Executes bash commands in a persistent shell session with optional timeout. Handles git operations, npm commands, docker, and other terminal tasks.

Usage:

```
Bash(
  command: string,              # The command to execute
  description?: string,         # What the command does
  timeout?: number,             # Timeout in ms (max 600000)
  run_in_background?: bool      # Run asynchronously
)
```

Uses:

- Running git commands (`git status`, `git commit`, `git push`)
- Installing dependencies (`npm install`, `pip install`)
- Running builds and tests (`npm run build`, `pytest`)
- Starting development servers
- Example: `git add . && git commit -m "feat: add login feature"` to stage and commit changes

---

## Glob

Description: Fast file pattern matching tool that works with any codebase size. Returns matching file paths sorted by modification time.

Usage:

```
Glob(
  pattern: string,   # Glob pattern (e.g., "**/*.js", "src/**/*.ts")
  path?: string      # Directory to search in (default: cwd)
)
```

Uses:

- Finding files by name patterns (`**/*.tsx`, `src/**/*.test.ts`)
- Locating configuration files (`**/tsconfig.json`)
- Discovering all files of a certain type in a directory
- Example: `**/*.md` to find all markdown files in the project

---

## Grep

Description: Powerful search tool built on ripgrep for searching file contents. Supports regex, file type filtering, and multiple output modes.

Usage:

```
Grep(
  pattern: string,        # Regex pattern to search for
  path?: string,          # File or directory to search
  glob?: string,          # Filter files by glob (e.g., "*.js")
  type?: string,          # File type (e.g., "js", "py", "rust")
  output_mode?: string,   # "files_with_matches" | "content" | "count"
  -i?: bool,              # Case insensitive
  -A?: number,            # Lines after match
  -B?: number,            # Lines before match
  -C?: number             # Lines around match
)
```

Uses:

- Finding function definitions (`function handleSubmit`)
- Searching for import statements (`import.*from 'react'`)
- Locating TODO comments or specific patterns
- Finding all usages of a variable or function name
- Example: Search for `useState` with `type: "tsx"` to find all React state hooks

---

## Read

Description: Reads files from the local filesystem including text files, images, PDFs, and Jupyter notebooks. Supports line offsets for large files.

Usage:

```
Read(
  file_path: string,   # Absolute path to file
  offset?: number,     # Line number to start from
  limit?: number       # Number of lines to read
)
```

Uses:

- Reading source code files before editing them
- Viewing configuration files
- Analyzing images and screenshots (multimodal)
- Reading PDF documentation
- Examining Jupyter notebook cells and outputs
- Example: Read `src/components/App.tsx` to understand component structure before modifications

---

## Edit

Description: Performs exact string replacements in files. Requires reading the file first. Can replace single occurrences or all occurrences.

Usage:

```
Edit(
  file_path: string,     # Absolute path to file
  old_string: string,    # Text to replace
  new_string: string,    # Replacement text
  replace_all?: bool     # Replace all occurrences (default: false)
)
```

Uses:

- Fixing bugs by replacing incorrect code
- Renaming variables across a file (`replace_all: true`)
- Updating configuration values
- Adding imports or new code blocks
- Example: Replace `const API_URL = 'http://localhost'` with `const API_URL = 'https://api.example.com'`

---

## Write

Description: Writes or overwrites a file to the local filesystem. Requires reading existing files first before overwriting.

Usage:

```
Write(
  file_path: string,   # Absolute path to file
  content: string      # Content to write
)
```

Uses:

- Creating new source code files
- Writing configuration files
- Generating test files
- Creating scripts
- Example: Write a new `utils/helpers.ts` file with utility functions

---

## NotebookEdit

Description: Replaces, inserts, or deletes cells in Jupyter notebooks (.ipynb files). Cells are 0-indexed.

Usage:

```
NotebookEdit(
  notebook_path: string,   # Absolute path to .ipynb file
  new_source: string,      # New cell content
  cell_id?: string,        # Cell ID to edit
  cell_type?: string,      # "code" | "markdown"
  edit_mode?: string       # "replace" | "insert" | "delete"
)
```

Uses:

- Modifying code cells in data science notebooks
- Adding markdown documentation cells
- Deleting outdated cells
- Inserting new analysis steps
- Example: Replace a cell's code to fix a pandas data transformation

---

## WebFetch

Description: Fetches content from a URL and processes it using an AI model. Converts HTML to markdown and can extract specific information.

Usage:

```
WebFetch(
  url: string,      # URL to fetch (must be valid, HTTPS)
  prompt: string    # What information to extract
)
```

Uses:

- Reading API documentation from a URL
- Extracting specific information from web pages
- Fetching and summarizing blog posts or articles
- Getting package documentation
- Example: Fetch React docs to understand a specific hook's usage

---

## WebSearch

Description: Searches the web and returns up-to-date information. Provides results with links formatted as markdown.

Usage:

```
WebSearch(
  query: string,              # Search query
  allowed_domains?: string[], # Only include these domains
  blocked_domains?: string[]  # Exclude these domains
)
```

Uses:

- Finding current documentation for libraries
- Researching error messages and solutions
- Looking up recent API changes or releases
- Finding code examples and tutorials
- Example: Search for "Next.js 14 app router migration guide" to find current best practices

---

## TodoWrite

Description: Creates and manages a structured task list for tracking progress on complex tasks. Supports pending, in_progress, and completed states.

Usage:

```
TodoWrite(
  todos: [
    {
      content: string,      # Task description (imperative: "Fix bug")
      activeForm: string,   # Present continuous ("Fixing bug")
      status: string        # "pending" | "in_progress" | "completed"
    }
  ]
)
```

Uses:

- Breaking down large features into manageable steps
- Tracking progress on multi-file refactors
- Planning implementation before coding
- Showing users what work remains
- Example: Create todos for "Add authentication: 1) Create login form, 2) Add API route, 3) Implement session management"

---

## AskUserQuestion

Description: Asks the user questions during execution to gather preferences, clarify ambiguity, or get decisions on implementation choices.

Usage:

```
AskUserQuestion(
  questions: [
    {
      question: string,     # The question to ask
      header: string,       # Short label (max 12 chars)
      options: [
        { label: string, description: string }
      ],
      multiSelect?: bool    # Allow multiple selections
    }
  ]
)
```

Uses:

- Clarifying ambiguous requirements
- Offering implementation choices (e.g., "Use Redux or Context?")
- Confirming destructive operations
- Getting user preferences for design decisions
- Example: Ask "Which database would you prefer: PostgreSQL or MongoDB?" with options

---

## EnterPlanMode

Description: Transitions into plan mode for exploring the codebase and designing an implementation approach before writing code. Requires user approval.

Usage:

```
EnterPlanMode()
```

Uses:

- Planning new feature implementations
- Designing refactoring strategies
- Exploring architectural decisions before committing
- Getting user sign-off on approach before coding
- Example: Enter plan mode before implementing a new authentication system to design the approach

---

## ExitPlanMode

Description: Signals completion of planning and readiness for user approval. Reads the plan from the plan file and can request bash permissions needed for implementation.

Usage:

```
ExitPlanMode(
  allowedPrompts?: [
    {
      tool: "Bash",
      prompt: string    # Semantic action description (e.g., "run tests")
    }
  ]
)
```

Uses:

- Completing a planning session
- Requesting permissions for commands needed during implementation
- Transitioning from planning to execution phase
- Example: Exit plan mode after writing implementation steps, requesting "run tests" and "build project" permissions

---

## KillShell

Description: Kills a running background bash shell by its ID. Use when a long-running process needs to be terminated.

Usage:

```
KillShell(
  shell_id: string    # ID of background shell to kill
)
```

Uses:

- Stopping a hung development server
- Terminating a long-running build that's stuck
- Killing background processes that are no longer needed
- Example: Kill a background `npm run dev` server that's blocking a port

---

## Skill

Description: Executes user-defined skills (slash commands) within the conversation. Skills provide specialized capabilities and domain knowledge.

Usage:

```
Skill(
  skill: string,   # Skill name (e.g., "commit", "review-pr")
  args?: string    # Optional arguments
)
```

Uses:

- Running `/commit` to create well-formatted git commits
- Using `/review-pr` to review pull requests
- Invoking custom workflow skills
- Running domain-specific automation
- Example: Invoke the `commit` skill to create a properly formatted commit with co-author attribution
