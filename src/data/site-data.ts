import type {
	BoardGamesInterest,
	CalendarConfig,
	CTA,
	Hero,
	Intro,
	LocalTechLabsCallout,
	MountainBikingInterest,
	NavigationItem,
	Project,
	Service,
	SocialLink,
	TopicOption,
	TTRPGInterest,
	Writing,
} from "../types";

// =============================================================================
// Navigation
// =============================================================================

export const navigationItems: NavigationItem[] = [
	{ label: "Projects", href: "#projects" },
	{ label: "About", href: "#about" },
	{ label: "Consulting", href: "#consulting" },
	{ label: "Contact", href: "#contact" },
	// { label: "Blog", href: "/blog" }, // TODO: Uncomment when blog content is ready
];

// =============================================================================
// Hero
// =============================================================================

export const hero: Hero = {
	name: "Adam Slaker",
	title: "Principal Agentic Engineer",
	tagline: "Building intelligent systems that think, adapt, and ship.",
	primaryCta: {
		label: "View Projects",
		href: "#projects",
	},
	secondaryCta: {
		label: "Get in Touch",
		href: "#contact",
	},
};

export const socialLinks: SocialLink[] = [
	{
		id: "github",
		platform: "GitHub",
		url: "https://github.com/aslaker",
		icon: "github",
	},
	{
		id: "linkedin",
		platform: "LinkedIn",
		url: "https://linkedin.com/in/adamslaker",
		icon: "linkedin",
	},
];

// =============================================================================
// Projects
// =============================================================================

export const projects: Project[] = [
	{
		id: "ephemeris-iss-tracker",
		title: "Ephemeris ISS Tracker",
		shortDescription:
			"A real-time visualization of the International Space Station's orbital path with predictive pass notifications.",
		fullDescription:
			"Ephemeris tracks the International Space Station in real-time, rendering its orbital path on an interactive 3D globe and calculating upcoming visible passes for any location on Earth.\n\nBuilt as a passion project exploring orbital mechanics and data visualization.",
		logoUrl: "/projects/ephemeris/logo.png",
		tags: ["Open Source", "Data Viz", "Offline-First"],
		technologies: [
			"React",
			"TypeScript",
			"TanStack Router",
			"TanStack Query",
			"Tailwind CSS",
			"Cloudflare Workers",
		],
		screenshots: [],
		githubUrl: "https://github.com/aslaker/ephemeris",
		demoUrl: "https://ephemeris.observer",
	},
	{
		id: "auto-claude",
		title: "Auto-Claude",
		shortDescription:
			"An autonomous multi-agent coding framework with parallel execution, git worktree isolation, and self-validating QA loops.",
		fullDescription:
			"Auto-Claude is an open-source desktop application that lets you describe software goals while AI agents handle planning, implementation, and validation autonomously. It manages the complete development lifecycle from task creation through code integration.\n\nKey features include parallel agent execution (up to 12 terminals), git worktree-based isolation to preserve main branch safety, AI-powered merge with automatic conflict resolution, and integrations with GitHub, GitLab, and Linear.",
		logoUrl: "/projects/auto-claude/logo.png",
		tags: ["AI/ML", "Open Source", "Desktop App"],
		technologies: [
			"TypeScript",
			"Electron",
			"Python",
			"Claude Code CLI",
			"Git",
		],
		screenshots: [],
		githubUrl: "https://github.com/AndyMik90/Auto-Claude",
		demoUrl: null,
	},
	{
		id: "tasterra",
		title: "Pre-Launch B2B SaaS",
		shortDescription:
			"An AI-powered platform for the food & beverage industry, revolutionizing sensory QA programs.",
		fullDescription:
			"A sensory evaluation platform bringing lab-quality taste panel analysis to craft beverage producers with AI-powered off-flavor detection.\n\nHelps breweries, wineries, and distilleries conduct professional sensory panels, detect off-flavors with AI, and maintain product consistency across locations. Features include multiple panel types, real-time collaboration, trend analysis, and professional report generation.",
		logoUrl: "/projects/tasterra/logo.png",
		tags: ["AI/ML", "B2B SaaS", "Full-Stack"],
		technologies: ["Next.js", "Convex", "Clerk", "OpenRouter", "wink-nlp"],
		screenshots: [],
		githubUrl: null,
		demoUrl: null,
	},
];

// =============================================================================
// Consulting
// =============================================================================

export const consultingIntro: Intro = {
	headline: "Let's Build Something Together",
	body: "I help teams navigate the rapidly evolving AI landscape—whether that's architecting agentic systems, modernizing your web presence, or providing ongoing technical leadership. With hands-on experience building production AI systems and a pragmatic approach to technology, I focus on solutions that actually ship.",
};

export const services: Service[] = [
	{
		id: "strategic-ai",
		title: "Strategic AI Consulting",
		description:
			"One-on-one sessions to help you understand where AI fits in your business. We'll cut through the hype, identify high-impact opportunities, and create a practical roadmap for implementation. Ideal for founders and technical leaders exploring agentic architectures, LLM integration, or AI-powered workflows.",
		placeholder: "Starting at $X/session",
		icon: "brain",
	},
	// {
	// 	id: "website-dev",
	// 	title: "Website Development",
	// 	description:
	// 		"Full-service website design, development, and ongoing management. From modern React applications to marketing sites that convert, I handle the technical complexity so you can focus on your business. Includes performance optimization, SEO fundamentals, and a maintainable codebase.",
	// 	placeholder: "Custom pricing",
	// 	icon: "globe",
	// },
	{
		id: "speaking",
		title: "Speaking",
		description:
			"Available for meetups and tech talks on AI agents, Claude Code workflows, agentic architectures, and full-stack development in the AI era. My talks focus on hands-on demos and real-world use cases—no slides full of theory, just practical techniques you can apply immediately.",
		placeholder: "Custom pricing",
		icon: "microphone",
	},
	{
		id: "fractional-cto",
		title: "Fractional CTO",
		description:
			"Part-time technical leadership for startups and growing teams. I'll help you make architecture decisions, build engineering culture, evaluate build-vs-buy tradeoffs, and keep your technical strategy aligned with business goals. Perfect for non-technical founders or teams between senior hires.",
		placeholder: "Monthly retainer",
		icon: "users",
	},
];

export const consultingCta: CTA = {
	text: "Book a Consult",
	subtext: "30-minute conversation to explore how I can help",
	href: "#contact",
	attribution: "via Local Tech Labs",
};

export const localTechLabsCallout: LocalTechLabsCallout = {
	text: "Interested in AI voice agents for your business?",
	linkText: "Check out Local Tech Labs",
	href: "https://localtechlabs.io",
};

// =============================================================================
// Contact
// =============================================================================

export const topicOptions: TopicOption[] = [
	{
		id: "strategic-ai",
		label: "Strategic AI Consulting",
		value: "Strategic AI Consulting",
	},
	{
		id: "web-dev",
		label: "Website Development",
		value: "Website Development",
	},
	{
		id: "fractional-cto",
		label: "Fractional CTO",
		value: "Fractional CTO",
	},
	{
		id: "speaking",
		label: "Speaking",
		value: "Speaking",
	},
];

export const calendarConfig: CalendarConfig = {
	provider: "google",
	embedUrl: "https://calendar.app.google/d1Vjg23d8nged7Es8",
	fallbackUrl: "https://calendar.app.google/d1Vjg23d8nged7Es8",
};

// =============================================================================
// About / Interests
// =============================================================================

export const ttrpgInterest: TTRPGInterest = {
	id: "ttrpg",
	title: "Tabletop RPGs",
	theme: "character-sheet",
	traits: [
		{
			name: "Agentic Intuition",
			value: 16,
			description: "Knowing when to let AI run vs. when to intervene",
		},
		{
			name: "Flow State",
			value: 18,
			description: "Deep focus capacity for complex problems",
		},
		{
			name: "Caffeine Metabolism",
			value: 15,
			description: "Unusually high tolerance, possibly adaptive",
		},
		{
			name: "Risk Appetite",
			value: 17,
			description: "Send it. Applies to trails and architecture decisions",
		},
		{
			name: "Kid Patience",
			value: 14,
			description: "Infinite loops don't crash this process",
		},
		{
			name: "Strategic Depth",
			value: 16,
			description: "Sees three moves ahead, plans for twelve",
		},
	],
	flavorText: "Roll for initiative",
};

export const boardGamesInterest: BoardGamesInterest = {
	id: "board-games",
	title: "Board Games",
	theme: "scorecard",
	games: [
		{
			name: "Bruges",
			designer: "Stefan Feld",
			category: "Euro",
			playCount: 12,
			rating: 9,
		},
		{
			name: "Wingspan",
			designer: "Elizabeth Hargrave",
			category: "Engine Building",
			playCount: 24,
			rating: 9,
		},
		{
			name: "Voidfall",
			designer: "David Turczi & Nigel Buckle",
			category: "4X Euro",
			playCount: 8,
			rating: 10,
		},
		{
			name: "Arcs",
			designer: "Cole Wehrle",
			category: "Trick-Taking Strategy",
			playCount: 15,
			rating: 10,
		},
		{
			name: "Pax Pamir (2nd Edition)",
			designer: "Cole Wehrle",
			category: "Area Control",
			playCount: 18,
			rating: 10,
		},
		{
			name: "Scales of Fate",
			designer: "Max Anderson, Zac Dixon & Austin Harrison",
			category: "Strategic Deduction",
			playCount: 6,
			rating: 8,
		},
		{
			name: "Tend",
			designer: "Max Anderson, Zac Dixon, Austin Harrison & Toby Sarnelle",
			category: "Flip-and-Write",
			playCount: 10,
			rating: 8,
		},
	],
	totalPlays: 93,
	favoriteDesigner: "Cole Wehrle",
};

export const mountainBikingInterest: MountainBikingInterest = {
	id: "mountain-biking",
	title: "Mountain Biking",
	theme: "trail-map",
	areas: [
		{
			name: "Quarry Ridge",
			trails: [
				{ name: "Connector", difficulty: "beginner" },
				{ name: "Dizzy", difficulty: "beginner" },
				{ name: "Lakeview", difficulty: "beginner" },
				{ name: "Skills Loop", difficulty: "beginner" },
				{ name: "Rewind", difficulty: "intermediate" },
				{ name: "Bottoms Up", difficulty: "intermediate" },
				{ name: "Northwoods", difficulty: "intermediate" },
				{ name: "Pork Chop", difficulty: "advanced" },
				{ name: "Sandy Climb", difficulty: "advanced" },
				{ name: "Ambulance Climb", difficulty: "advanced" },
				{ name: "Big Sister", difficulty: "advanced" },
				{ name: "Little Sister", difficulty: "advanced" },
				{ name: "B-Line", difficulty: "advanced" },
				{ name: "Sandy Bowl", difficulty: "advanced" },
				{ name: "Tunnel Trail", difficulty: "advanced" },
				{ name: "Snaggletooth", difficulty: "expert" },
			],
		},
		{
			name: "Blackhawk",
			trails: [
				{ name: "Skills Area", difficulty: "beginner" },
				{ name: "Don't Worry, Be Happy", difficulty: "beginner" },
				{ name: "Ziggy Up", difficulty: "intermediate" },
				{ name: "Ziggy Down", difficulty: "intermediate" },
				{ name: "Twist and Shout", difficulty: "intermediate" },
				{ name: "Howling Wolff", difficulty: "advanced" },
				{ name: "Rollercoaster", difficulty: "advanced" },
			],
		},
		{
			name: "Saris Trails",
			trails: [
				{ name: "Pump Track", difficulty: "beginner" },
				{ name: "Skills Lines", difficulty: "intermediate" },
			],
		},
		{
			name: "Seminole",
			trails: [
				{ name: "Outer Loop", difficulty: "beginner" },
				{ name: "Inner Loop", difficulty: "intermediate" },
			],
		},
	],
	coaching: {
		certification: "NICA Level 1",
		yearsExperience: 3,
		organization: "National Interscholastic Cycling Association",
	},
};

export const interests = [
	ttrpgInterest,
	boardGamesInterest,
	mountainBikingInterest,
];

// =============================================================================
// Blog / Writings
// =============================================================================

export const writings: Writing[] = [
	{
		id: "writing-001",
		slug: "building-autonomous-agents-with-claude",
		title: "Building Autonomous Agents with Claude: Lessons from Auto-Claude",
		excerpt:
			"After months of building Auto-Claude, I've learned that the key to effective autonomous agents isn't more sophisticated prompting—it's knowing when to hand control back to humans.",
		content: `# Building Autonomous Agents with Claude: Lessons from Auto-Claude

After months of building Auto-Claude, I've learned that the key to effective autonomous agents isn't more sophisticated prompting—it's knowing when to hand control back to humans.

## The Autonomy Spectrum

When I started building Auto-Claude, I imagined a fully autonomous system that could handle complex multi-step tasks without intervention. What I discovered was that the most effective agents operate on a spectrum of autonomy.

\`\`\`typescript
type AutonomyLevel = 'full' | 'supervised' | 'assisted' | 'manual'

interface AgentDecision {
  action: string
  confidence: number
  autonomyThreshold: number
}

function shouldProceed(decision: AgentDecision): boolean {
  return decision.confidence >= decision.autonomyThreshold
}
\`\`\`

## Key Takeaways

1. **Confidence calibration matters more than capability** - An agent that knows when it doesn't know is more valuable than one that always tries.

2. **Human checkpoints aren't failures** - They're features. Build them into your agent's decision tree.

3. **Context windows are precious** - Every token spent on unnecessary context is a token not spent on reasoning.

## What's Next

In my next post, I'll dive into the specific patterns I use for context management in long-running agent sessions.`,
		thumbnailImage: "/images/blog/autonomous-agents-thumb.jpg",
		headerImage: "/images/blog/autonomous-agents-header.jpg",
		publishedAt: "2024-12-15",
		readTime: 8,
		tags: ["Agentic AI", "Claude", "TypeScript"],
	},
	{
		id: "writing-002",
		slug: "terraform-patterns-for-ai-workloads",
		title:
			"Terraform Patterns for AI Workloads: GPU Instances Without the Pain",
		excerpt:
			"GPU instances are expensive and tricky to manage. Here's how I structure Terraform modules to spin up AI infrastructure on-demand without burning through cloud credits.",
		content: `# Terraform Patterns for AI Workloads

GPU instances are expensive and tricky to manage. Here's how I structure Terraform modules to spin up AI infrastructure on-demand without burning through cloud credits.

## The Problem

Running AI workloads in the cloud means dealing with:
- Spot instance interruptions
- GPU availability across regions
- Cost optimization for bursty workloads

## My Approach

\`\`\`hcl
module "ai_compute" {
  source = "./modules/gpu-cluster"

  instance_type    = "g5.xlarge"
  spot_enabled     = true
  fallback_regions = ["us-east-1", "us-west-2", "eu-west-1"]

  auto_shutdown = {
    enabled      = true
    idle_minutes = 30
  }
}
\`\`\`

The key insight is treating GPU compute as ephemeral by default. Everything persists to S3, and instances spin up only when needed.

## Cost Savings

This pattern reduced our inference costs by 73% compared to reserved instances, with only a 2-minute cold start penalty.`,
		thumbnailImage: "/images/blog/terraform-gpu-thumb.jpg",
		headerImage: "/images/blog/terraform-gpu-header.jpg",
		publishedAt: "2024-11-28",
		readTime: 6,
		tags: ["Cloud Ops", "Terraform", "AI Infrastructure"],
	},
	{
		id: "writing-003",
		slug: "type-safe-llm-outputs",
		title: "Type-Safe LLM Outputs: Zod Schemas for Structured Generation",
		excerpt:
			"LLMs are notoriously unpredictable. Here's how I use Zod schemas to enforce structure on AI outputs and catch malformed responses before they break my app.",
		content: `# Type-Safe LLM Outputs

LLMs are notoriously unpredictable. Here's how I use Zod schemas to enforce structure on AI outputs and catch malformed responses before they break my app.

## The Challenge

When you ask an LLM to return JSON, you might get:
- Valid JSON (great!)
- JSON with markdown code fences (common)
- Partial JSON (timeout or token limit)
- An apology instead of JSON (thanks, safety filters)

## The Solution

\`\`\`typescript
import { z } from 'zod'

const TaskSchema = z.object({
  title: z.string().min(1).max(200),
  priority: z.enum(['low', 'medium', 'high']),
  subtasks: z.array(z.string()).default([]),
  dueDate: z.string().datetime().optional()
})

type Task = z.infer<typeof TaskSchema>

async function parseAIResponse(raw: string): Task {
  // Strip markdown fences if present
  const cleaned = raw.replace(/\`\`\`json\\n?|\`\`\`\\n?/g, '')

  const parsed = JSON.parse(cleaned)
  return TaskSchema.parse(parsed)
}
\`\`\`

## Going Further

Combine this with retry logic and you get resilient AI integrations that gracefully handle the chaos of LLM outputs.`,
		thumbnailImage: null,
		headerImage: "/images/blog/zod-schemas-header.jpg",
		publishedAt: "2024-11-10",
		readTime: 5,
		tags: ["TypeScript", "Agentic AI", "Zod"],
	},
	{
		id: "writing-004",
		slug: "why-i-stopped-using-langchain",
		title: "Why I Stopped Using LangChain (And What I Use Instead)",
		excerpt:
			"LangChain is powerful but often overkill. For most agentic applications, a simpler approach with direct API calls and custom orchestration gives you more control with less complexity.",
		content: `# Why I Stopped Using LangChain

LangChain is powerful but often overkill. For most agentic applications, a simpler approach with direct API calls and custom orchestration gives you more control with less complexity.

## The Abstraction Tax

LangChain abstracts away the details of working with LLMs. That's great for getting started, but it becomes a liability when:

1. You need to debug why your agent is behaving unexpectedly
2. You want fine-grained control over prompts and context
3. You're optimizing for token usage and latency

## My Alternative Stack

- **Direct API calls** to Claude/OpenAI with a thin wrapper
- **Custom state machines** for agent orchestration
- **Zod** for output validation
- **Simple function calling** instead of complex tool abstractions

## When LangChain Makes Sense

I still reach for LangChain when:
- Rapid prototyping with unfamiliar models
- Using their excellent document loaders
- Building RAG pipelines with their vector store integrations

But for production agentic systems? I prefer knowing exactly what's happening under the hood.`,
		thumbnailImage: null,
		headerImage: null,
		publishedAt: "2024-10-22",
		readTime: 7,
		tags: ["Agentic AI", "Architecture", "Opinion"],
	},
	{
		id: "writing-005",
		slug: "real-time-iss-tracking-with-react",
		title: "Real-Time ISS Tracking with React: Building Ephemeris",
		excerpt:
			"A deep dive into building Ephemeris, my open-source ISS tracker. From orbital mechanics APIs to smooth React animations, here's how it all comes together.",
		content: `# Real-Time ISS Tracking with React

A deep dive into building Ephemeris, my open-source ISS tracker. From orbital mechanics APIs to smooth React animations, here's how it all comes together.

## The Vision

I wanted to build something that makes space feel accessible. The ISS orbits Earth every 90 minutes, and I wanted people to be able to see exactly where it is at any moment.

## Data Sources

Ephemeris pulls from multiple APIs:
- **N2YO** for real-time TLE data
- **Open Notify** for crew information
- **Custom calculations** for pass predictions

\`\`\`typescript
interface ISSPosition {
  latitude: number
  longitude: number
  altitude: number // kilometers
  velocity: number // km/s
  timestamp: number
}

async function getCurrentPosition(): Promise<ISSPosition> {
  const response = await fetch(
    'https://api.n2yo.com/rest/v1/satellite/positions/25544'
  )
  // Transform and return...
}
\`\`\`

## Smooth Animations

The tricky part is making the ISS marker move smoothly between API updates. I use linear interpolation based on the known velocity:

\`\`\`typescript
function interpolatePosition(
  start: ISSPosition,
  elapsed: number
): ISSPosition {
  // ISS moves ~7.66 km/s
  // Calculate new lat/lng based on elapsed time
}
\`\`\`

## Try It Out

Ephemeris is open source. Check it out on GitHub and watch the ISS fly over your location.`,
		thumbnailImage: "/images/blog/ephemeris-thumb.jpg",
		headerImage: "/images/blog/ephemeris-header.jpg",
		publishedAt: "2024-09-15",
		readTime: 10,
		tags: ["React", "Open Source", "TypeScript"],
	},
];

export const blogTags: string[] = [
	"Agentic AI",
	"TypeScript",
	"Claude",
	"Cloud Ops",
	"Terraform",
	"AI Infrastructure",
	"Zod",
	"Architecture",
	"Opinion",
	"React",
	"Open Source",
];
