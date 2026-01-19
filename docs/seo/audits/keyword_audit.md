# SEO Keyword Strategy Audit

**Site:** adamslaker.dev
**Audit Date:** 2026-01-15
**Auditor:** Claude Code (SEO Keyword Strategist Agent)
**Version:** 2.0

---

## Executive Summary

This audit analyzes the keyword optimization strategy for adamslaker.dev, a portfolio site for an AI Consultant and Agentic Engineer offering consulting services. The analysis evaluates current keyword implementation, identifies opportunities for improvement, and provides actionable recommendations to strengthen search visibility.

**Overall Score:** 68/100 (improved from 58/100 in v1.0)

### Recent Improvements (Since v1.0)
- Page title updated to include "AI Consultant" keyword
- Meta description rewritten with service keywords
- Target keywords now appear in critical meta positions

### Key Findings

| Category | Status | Notes |
|----------|--------|-------|
| Page Title | Good | Contains "AI Consultant & Agentic Engineer" |
| Meta Description | Good | Includes strategic consulting, fractional CTO, agentic AI |
| H1/H2 Headings | Needs Work | Still stylistically focused, weak on keywords |
| Body Content | Moderate | Good topical coverage, some gaps remain |
| Image Alt Text | Needs Work | Generic alt text on project logos only |
| Semantic Keywords | Partial | LSI keywords partially implemented |
| Long-tail Keywords | Weak | Blog content exists but underutilized |

---

## 1. Primary Keywords Analysis

### Target Keyword Performance

Based on the site's niche (AI consulting, agentic engineering, fractional CTO services), here are the recommended primary keywords and their current implementation status:

| Keyword | Search Intent | Est. Monthly Vol. | Competition | Implementation Status |
|---------|---------------|-------------------|-------------|----------------------|
| AI consultant | Commercial | Medium-High | Medium | **Implemented** (title, description) |
| agentic engineer | Informational/Commercial | Low-Medium | Low | **Implemented** (title, hero) |
| fractional CTO | Commercial | Medium | Medium | **Implemented** (description, services) |
| AI consulting services | Commercial | Medium | Medium-High | Partial (description) |
| Claude AI developer | Informational | Low | Low | Weak (blog only) |
| autonomous agents | Informational | Medium | Medium | Weak |
| LLM integration | Informational/Commercial | Low-Medium | Low | Weak |

### Current Primary Keyword Placement

**Page Title (Line 5, index.astro):**
```
"Adam Slaker | AI Consultant & Agentic Engineer"
```
- 47 characters (optimal: 50-60)
- Contains two primary keywords: "AI Consultant" and "Agentic Engineer"
- Brand name first for recognition
- **Status: Good**

**Meta Description (Lines 6-7, index.astro):**
```
"AI consultant helping startups build intelligent systems. Strategic consulting, fractional CTO services, and agentic AI development. Let's build something together."
```
- 163 characters (optimal: 150-160)
- Contains keywords: "AI consultant", "fractional CTO", "agentic AI"
- Includes call-to-action: "Let's build something together"
- **Status: Good**

**Hero Title (H2, site-data.ts line 36):**
```
"Principal Agentic Engineer"
```
- Niche positioning maintained
- Contains "Agentic Engineer"
- **Status: Acceptable** (unique but limits discoverability)

---

## 2. Keyword Placement Audit

### KW-001: H1 Heading Analysis

**Current State:**
```tsx
// Hero.tsx line 99
<h1>Adam Slaker</h1>  // Via TypingText component
```

**Assessment:**
- H1 contains only the name, no service keywords
- Search engines see "Adam Slaker" as the primary heading
- Misses opportunity for keyword reinforcement

**Severity:** Medium
**Recommendation:** Consider adding a visually hidden keyword phrase or modifying the hero data structure to include role in H1.

**Suggested Implementation:**
```tsx
// Option 1: Update hero.name in site-data.ts
name: "Adam Slaker"  // Keep as is for visual
// Add visually hidden text in Hero.tsx:
<h1>
  <span className="sr-only">Adam Slaker - AI Consultant and Agentic Engineer - </span>
  <TypingText text={hero.name} ... />
</h1>
```

---

### KW-002: Section H2 Headings

**Current State:**

| Section | Current H2 | Keyword Strength |
|---------|-----------|------------------|
| Hero | "Principal Agentic Engineer" | Medium |
| Projects | None (terminal-style text only) | **Missing** |
| About | None (terminal-style text only) | **Missing** |
| Consulting | "Let's Build Something Together" | Weak |
| Contact | "Let's Build Something" | Weak |

**Severity:** High
**Issues:**
- Projects section lacks semantic H2 with keywords
- About section lacks semantic H2
- Consulting H2 is engagement-focused but lacks service keywords
- Duplicate/similar H2 text between sections

**Recommendations:**

| Section | Recommended H2 |
|---------|---------------|
| Projects | "AI & Agentic Engineering Projects" or "Portfolio: AI Projects & Open Source" |
| About | "About Adam Slaker" |
| Consulting | "AI Consulting & Technical Leadership Services" |
| Contact | "Start Your AI Project" or "Hire an AI Consultant" |

---

### KW-003: First Paragraph Keyword Placement

**Current State:**

**Hero Tagline (site-data.ts line 37):**
```
"Building intelligent systems that think, adapt, and ship."
```
- Engaging copy but lacks specific keywords
- "Intelligent systems" is good but generic

**Consulting Intro (site-data.ts lines 135-138):**
```
"I help teams navigate the rapidly evolving AI landscape—whether that's
architecting agentic systems, modernizing your web presence, or providing
ongoing technical leadership. With hands-on experience building production
AI systems and a pragmatic approach to technology, I focus on solutions
that actually ship."
```
- Contains: "AI landscape", "agentic systems", "technical leadership", "AI systems"
- **Status: Good keyword density**

**Severity:** Low
**Recommendation:** Hero tagline could be enhanced with a keyword while maintaining style:
```
"Building intelligent AI systems that think, adapt, and ship."
// or
"AI consultant building intelligent systems that think, adapt, and ship."
```

---

### KW-004: Open Graph and Social Meta Keywords

**Current State:**
```html
<meta property="og:title" content="Adam Slaker | AI Consultant & Agentic Engineer" />
<meta property="og:description" content="AI consultant helping startups..." />
<meta name="twitter:title" content="Adam Slaker | AI Consultant & Agentic Engineer" />
<meta name="twitter:description" content="AI consultant helping startups..." />
```

**Assessment:**
- OG and Twitter meta correctly inherit keyword-optimized title/description
- **Status: Good**

---

## 3. Keyword Density Analysis

### Overall Keyword Distribution

| Keyword/Phrase | Occurrences | Target Range | Status |
|----------------|-------------|--------------|--------|
| AI consultant | 3 | 4-6 | Low |
| agentic | 5 | 6-10 | Acceptable |
| engineer/engineering | 4 | 4-8 | Good |
| consulting | 5 | 6-10 | Acceptable |
| Claude | 4 | 4-6 | Good |
| TypeScript | 6 | 3-5 | Good |
| React | 5 | 3-5 | Good |
| fractional CTO | 3 | 4-6 | Low |
| LLM | 3 | 4-6 | Low |
| autonomous/agents | 4 | 5-8 | Low |
| startup | 3 | 4-6 | Low |

### Keyword Stuffing Assessment

**Risk Level:** None
The site is appropriately optimized without keyword stuffing. Terminal-style decorative text (">", "$", "~/") does not interfere with keyword recognition.

---

## 4. Long-tail Keywords Analysis

### KW-005: Current Long-tail Keyword Coverage

**Blog Content Analysis:**

The blog section contains several long-tail keyword opportunities:

| Blog Post | Long-tail Keywords Present |
|-----------|---------------------------|
| Building Autonomous Agents with Claude | "autonomous agents", "Claude", "agentic" |
| Terraform Patterns for AI Workloads | "AI workloads", "GPU instances", "AI infrastructure" |
| Type-Safe LLM Outputs | "LLM outputs", "Zod schemas", "structured generation" |
| Why I Stopped Using LangChain | "LangChain", "agentic applications", "direct API calls" |
| Real-Time ISS Tracking with React | "React", "open-source", "data visualization" |

**Severity:** Medium
**Issues:**
- Blog exists but navigation was commented out (spec-009 addressed this)
- Blog content targets informational keywords well
- Missing commercial long-tail keywords

**Recommended Long-tail Keywords to Target:**

1. "how to hire an AI consultant for your startup"
2. "building autonomous AI agents with Claude Code"
3. "when does a startup need a fractional CTO"
4. "AI consulting for small business"
5. "agentic AI development best practices"
6. "LLM integration consultant"
7. "Claude AI implementation services"

---

## 5. Semantic Keywords (LSI) Analysis

### KW-006: Current LSI Implementation

**Present LSI Keywords:**
- Machine learning, automation, agents (AI cluster)
- TypeScript, React, full-stack, Electron (Tech stack cluster)
- Open source, GitHub (Development cluster)
- Startup, technical leadership, architecture (Business cluster)

**Missing LSI Keywords:**

| Primary Keyword | Missing Related Terms |
|-----------------|----------------------|
| AI Consultant | ML engineer, AI advisor, AI strategy consultant, machine learning consultant |
| Agentic Engineer | multi-agent systems, LLM orchestration, agent workflows, AI automation |
| Fractional CTO | interim CTO, part-time technical leader, startup technical advisor, technical co-founder |
| Claude AI | Anthropic, Claude Code CLI, conversational AI, AI assistant development |

**Severity:** Medium
**Recommendation:** Add these terms naturally throughout:
- Consulting intro paragraph
- Service card descriptions
- Blog post content
- About section text

---

## 6. Content Gaps Analysis

### KW-007: Missing Keyword Opportunities

**Gap 1: Location-Based Keywords**

No geographic indicators are present. Based on context (Madison, WI area mountain biking trails mentioned), consider adding:
- "AI consultant Madison WI" (if local clients desired)
- "Remote AI consultant" (if nationwide/global)
- "Midwest AI consulting"

**Severity:** Medium (depends on target audience)

**Gap 2: Problem-Solution Keywords**

Content focuses on services but doesn't address pain points:
- "AI implementation challenges"
- "LLM integration problems"
- "startup technical debt"
- "AI project failure prevention"

**Severity:** Medium

**Gap 3: Comparison Keywords**

No comparative content exists:
- "fractional CTO vs full-time CTO"
- "AI consultant vs AI agency"
- "in-house vs consulting AI development"

**Severity:** Low (blog opportunity)

**Gap 4: Technology-Specific Service Keywords**

Missing specific technology + service combinations:
- "Claude AI integration services"
- "Anthropic API consulting"
- "TypeScript AI development"
- "React AI application development"

**Severity:** Medium

---

### KW-008: Competitor Standard Keywords

Analysis of typical AI consultant/developer portfolio sites reveals missing common keywords:

| Common Keyword | Competitor Usage | adamslaker.dev |
|----------------|-----------------|----------------|
| "Portfolio" | Very Common | **Absent** |
| "Hire me" | Common | Absent |
| "Available for work" | Common | Partial ("accepting new projects") |
| "Software engineer" | Very Common | Absent |
| "Full-stack developer" | Common | Absent |
| "Case study" | Common | Absent |
| "Testimonials" | Very Common | Absent |

**Severity:** Low-Medium
**Recommendation:** Consider adding "Portfolio" to Projects section heading; "Available for hire" concept to hero.

---

## 7. Positive Findings

### What's Working Well

1. **Title Optimization**
   - Effectively combines brand + primary keywords
   - Within optimal character count
   - Clear value proposition

2. **Meta Description**
   - Contains multiple service keywords
   - Clear call-to-action
   - Appropriate length

3. **Service Content Keywords**
   - Service card titles contain keywords (Strategic AI Consulting, Fractional CTO)
   - Service descriptions use natural keyword variations
   - Good coverage of core service terms

4. **Blog Keyword Strategy**
   - Blog posts target specific long-tail keywords
   - Good use of technical terms (Claude, TypeScript, Terraform)
   - Natural keyword integration in content

5. **Technical Implementation**
   - Keywords properly placed in OG/Twitter meta tags
   - Canonical URL properly set
   - robots.txt allows full crawling

6. **Brand Differentiation**
   - "Principal Agentic Engineer" creates unique positioning
   - Balances niche terminology with discoverable keywords

---

## 8. Implementation Priority Matrix

| Issue | Severity | Effort | Impact | Priority | Status |
|-------|----------|--------|--------|----------|--------|
| Title/Description Keywords | High | Low | High | P1 | **Completed** |
| H2 Section Headings | High | Medium | High | P1 | Pending |
| H1 Keyword Enhancement | Medium | Low | Medium | P2 | Pending |
| LSI Keywords in Body | Medium | Medium | Medium | P2 | Partial |
| Long-tail Blog Keywords | Medium | High | Medium | P3 | Partial |
| Image Alt Text | Medium | Low | Low | P3 | Pending |
| Location Keywords | Medium | Low | Medium | P3 | Pending |
| Problem-Solution Content | Medium | High | Medium | P4 | Pending |
| Comparison Keywords | Low | High | Low | P4 | Pending |

---

## 9. Recommendations Summary

### Immediate Actions (Week 1)

1. **Add semantic H2 headings to Projects and About sections**
   - Projects: "AI & Agentic Engineering Portfolio"
   - About: "About Adam Slaker"

2. **Update Consulting section H2**
   - Change from "Let's Build Something Together"
   - To: "AI Consulting & Technical Leadership Services"

3. **Enhance hero tagline with keyword**
   - Add "AI" to "intelligent systems" or similar subtle enhancement

### Short-term Actions (Weeks 2-4)

4. **Add visually hidden H1 keyword text**
   - Include "AI Consultant" in H1 for SEO while maintaining visual design

5. **Expand LSI keywords in consulting intro**
   - Add terms: "autonomous agents", "LLM orchestration", "machine learning"

6. **Enhance image alt text**
   - Project logos: Add descriptive, keyword-rich alt text

7. **Add location indicator**
   - Footer or About section: "Based in Madison, WI | Working Remotely"

### Long-term Actions (Month 2+)

8. **Create problem-solution blog content**
   - Target keywords: "AI implementation challenges", "when to hire AI consultant"

9. **Develop case study content**
   - Add "portfolio" keyword naturally to project narratives

10. **Consider service-specific pages**
    - If traffic warrants: /ai-consulting/, /fractional-cto/

---

## 10. Target Keyword List

### Primary Keywords (Currently Optimized)
- AI consultant
- Agentic engineer
- Fractional CTO

### Secondary Keywords (Needs Improvement)
- AI consulting services
- Autonomous agents
- LLM integration
- Claude AI developer
- Technical leadership

### Long-tail Keywords (Blog Targets)
- "Building autonomous AI agents with Claude"
- "How to hire an AI consultant for startup"
- "Fractional CTO services for startups"
- "Agentic AI development best practices"
- "Claude Code workflow automation"

### LSI Keywords (To Integrate)
- Machine learning consultant
- AI strategy
- Multi-agent systems
- LLM orchestration
- Startup technical advisor
- Anthropic integration

---

## Appendix A: File Reference

| File | Purpose | Keyword Opportunities |
|------|---------|----------------------|
| `/workspace/src/pages/index.astro` | Page title, meta | **Optimized** |
| `/workspace/src/data/site-data.ts` | All content data | Hero, Services, Blog |
| `/workspace/src/components/sections/hero/Hero.tsx` | H1, H2 headings | H1 enhancement |
| `/workspace/src/components/sections/projects/ProjectsGrid.tsx` | Projects section | Add H2, alt text |
| `/workspace/src/components/sections/about/AboutGrid.tsx` | About section | Add H2 |
| `/workspace/src/components/sections/consulting/ConsultingSection.tsx` | Consulting | H2 optimization |
| `/workspace/src/components/sections/contact/ContactSection.tsx` | Contact | H2 optimization |
| `/workspace/src/components/sections/projects/ProjectCard.tsx` | Project cards | Alt text |

---

## Appendix B: Keyword Research Notes

### Search Intent Classification

| Keyword | Intent | Funnel Stage |
|---------|--------|--------------|
| "AI consultant" | Commercial | Mid-funnel |
| "What is agentic AI" | Informational | Top-funnel |
| "Hire fractional CTO" | Transactional | Bottom-funnel |
| "Claude AI tutorial" | Informational | Top-funnel |
| "AI consulting cost" | Commercial | Mid-funnel |

### Competitive Landscape Notes

- "AI consultant" is moderately competitive with established agencies
- "Agentic engineer" is a low-competition differentiator
- "Fractional CTO" has growing search volume in startup ecosystem
- Combining terms (e.g., "AI fractional CTO") may capture unique searches

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-15 | Initial audit |
| 2.0 | 2026-01-15 | Updated to reflect implemented title/description changes; revised scoring |

---

*This audit is part of the SEO optimization initiative for adamslaker.dev. For implementation guidance, refer to individual spec documents in `/workspace/docs/seo/specs/`.*
