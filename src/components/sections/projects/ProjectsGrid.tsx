import { useEffect, useState } from "react";
import type { Project } from "../../../types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

interface ProjectsGridProps {
	projects: Project[];
	onSelectProject?: (id: string) => void;
	onGitHubClick?: (url: string) => void;
	onDemoClick?: (url: string) => void;
	onCloseModal?: () => void;
	onContinueToAbout?: () => void;
	githubProfileUrl?: string;
}

export function ProjectsGrid({
	projects,
	onSelectProject,
	onGitHubClick,
	onDemoClick,
	onCloseModal,
	onContinueToAbout,
	githubProfileUrl = "https://github.com/aslaker",
}: ProjectsGridProps) {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Trigger entrance animation on mount
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Handle keyboard escape
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && selectedProject) {
				handleCloseModal();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedProject]);

	const handleSelectProject = (project: Project) => {
		setSelectedProject(project);
		onSelectProject?.(project.id);
	};

	const handleCloseModal = () => {
		setSelectedProject(null);
		onCloseModal?.();
	};

	const handleGitHubClick = (url: string) => {
		onGitHubClick?.(url);
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const handleDemoClick = (url: string) => {
		onDemoClick?.(url);
		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<section
			id="projects"
			className="min-h-screen bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8"
		>
			<div className="relative mx-auto max-w-4xl">
				{/* Terminal header */}
				<div
					className={`mb-8 transition-all duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<div className="inline-block rounded bg-zinc-900/80 px-4 py-2" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(var(--theme-primary-dark-rgb), 0.3)' }}>
						<span className="font-mono text-sm" style={{ color: 'var(--theme-primary-dark)' }}>
							<span style={{ color: 'var(--theme-primary-darker)' }}>adam@portfolio</span>
							<span className="text-zinc-500">:</span>
							<span style={{ color: 'var(--theme-secondary)' }}>~/projects</span>
							<span className="text-zinc-500">$ </span>
							<span className="text-zinc-300">ls -la</span>
							<span className="ml-1 inline-block h-4 w-2 animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }} />
						</span>
					</div>
				</div>

				{/* Section description */}
				<div
					className={`mb-8 transition-all delay-150 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<p className="font-mono text-sm leading-relaxed text-zinc-400">
						<span style={{ color: 'var(--theme-primary-darker)' }}>&gt; </span>
						Featured projects showcasing AI/agentic engineering, full-stack
						development, and open source contributions. Click any project to
						explore further.
					</p>
				</div>

				{/* Project count */}
				<div
					className={`mb-6 transition-all delay-300 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<span className="font-mono text-xs text-zinc-400">
						total {projects.length}
					</span>
				</div>

				{/* Projects grid */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							onSelect={() => handleSelectProject(project)}
						/>
					))}
				</div>

				{/* Section CTA */}
				<div
					className={`mt-12 text-center transition-all delay-700 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<p className="mb-6 font-mono text-xs text-zinc-600">
						<span style={{ color: 'var(--theme-primary-darker)' }}>[</span>
						Click a project to view details
						<span style={{ color: 'var(--theme-primary-darker)' }}>]</span>
					</p>

					{/* Primary CTA */}
					<button
						onClick={onContinueToAbout}
						className="group inline-flex items-center gap-2 bg-transparent px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-300"
						style={{
							color: 'var(--theme-primary)',
							borderWidth: '1px',
							borderStyle: 'solid',
							borderColor: 'rgba(var(--theme-primary-rgb), 0.5)',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = 'var(--theme-primary)'
							e.currentTarget.style.backgroundColor = 'rgba(var(--theme-primary-rgb), 0.1)'
							e.currentTarget.style.boxShadow = '0 0 20px rgba(var(--theme-primary-rgb), 0.2)'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = 'rgba(var(--theme-primary-rgb), 0.5)'
							e.currentTarget.style.backgroundColor = 'transparent'
							e.currentTarget.style.boxShadow = 'none'
						}}
					>
						<span style={{ color: 'var(--theme-secondary)' }}>
							&gt;
						</span>
						Learn About Me
					</button>

					{/* Secondary link */}
					<div className="mt-4">
						<a
							href={githubProfileUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono text-xs text-zinc-500 transition-colors"
							onMouseEnter={(e) => {
								e.currentTarget.style.color = 'var(--theme-primary)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = ''
							}}
						>
							<span style={{ color: 'var(--theme-primary-darker)' }}>[</span>
							View more on GitHub
							<span style={{ color: 'var(--theme-primary-darker)' }}>]</span>
						</a>
					</div>
				</div>
			</div>

			{/* Project detail modal */}
			<ProjectModal
				project={selectedProject}
				onClose={handleCloseModal}
				onGitHubClick={handleGitHubClick}
				onDemoClick={handleDemoClick}
			/>
		</section>
	);
}
