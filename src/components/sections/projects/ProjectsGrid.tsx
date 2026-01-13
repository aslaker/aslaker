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
}

export function ProjectsGrid({
	projects,
	onSelectProject,
	onGitHubClick,
	onDemoClick,
	onCloseModal,
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
			{/* Matrix rain background effect */}
			<div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.03]">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM4NGNjMTYiPjE8L3RleHQ+PC9zdmc+')] animate-pulse" />
			</div>

			<div className="relative mx-auto max-w-4xl">
				{/* Terminal header */}
				<div
					className={`mb-8 transition-all duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<div className="inline-block rounded border border-lime-500/30 bg-zinc-900/80 px-4 py-2">
						<span className="font-mono text-sm text-lime-500">
							<span className="text-lime-600">adam@portfolio</span>
							<span className="text-zinc-500">:</span>
							<span className="text-emerald-400">~/projects</span>
							<span className="text-zinc-500">$ </span>
							<span className="text-zinc-300">ls -la</span>
							<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-lime-400" />
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
						<span className="text-lime-600">&gt; </span>
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
					<span className="font-mono text-xs text-zinc-600">
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

				{/* Footer prompt */}
				<div
					className={`mt-12 text-center transition-all delay-700 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<p className="font-mono text-xs text-zinc-600">
						<span className="text-lime-600">[</span>
						Click a project to view details
						<span className="text-lime-600">]</span>
					</p>
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
