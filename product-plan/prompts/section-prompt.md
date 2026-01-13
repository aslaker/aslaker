# Section Implementation Prompt

## Define Section Variables

- **SECTION_NAME** = [Human-readable name, e.g., "Projects" or "Contact"]
- **SECTION_ID** = [Folder name in sections/, e.g., "projects" or "contact"]
- **NN** = [Milestone number, e.g., "02" or "03" — sections start at 02 since 01 is Foundation]

---

I need you to implement the **SECTION_NAME** section of my personal website.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section

Also review the section assets:
- **@product-plan/sections/SECTION_ID/README.md** — Feature overview and design intent
- **@product-plan/sections/SECTION_ID/tests.md** — Test-writing instructions (use TDD approach)
- **@product-plan/sections/SECTION_ID/components/** — React components to integrate
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript interfaces
- **@product-plan/sections/SECTION_ID/sample-data.json** — Test data

## Before You Begin

Please ask me clarifying questions about:

1. **Integration Points**
   - How should this section connect to existing features?
   - Any routing considerations?

2. **Data Source**
   - Where should this section's data come from? (Static, CMS, API?)
   - Any caching or loading state requirements?

3. **Backend Logic** (if applicable)
   - Any server-side processing needed?
   - Form handling or API integrations?

4. **Any Other Clarifications**
   - Questions about specific user flows in this section
   - Edge cases that need clarification

## Implementation Approach

Use test-driven development:
1. Read the `tests.md` file and write failing tests first
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, proceed with implementation.
