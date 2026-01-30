import { useCallback, useEffect, useRef } from "react";
import type { Project } from "../../../types";
import { PhaseIndicator } from "./PhaseIndicator";

interface ProjectModalProps {
	project: Project | null;
	onClose?: () => void;
	onGitHubClick?: (url: string) => void;
	onDemoClick?: (url: string) => void;
}

export function ProjectModal({
	project,
	onClose,
	onGitHubClick,
	onDemoClick,
}: ProjectModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);

	// Handle escape key press
	useEffect(() => {
		if (!project) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose?.();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [project, onClose]);

	// Focus trap and focus management
	useEffect(() => {
		if (!project || !modalRef.current) return;

		// Store the previously focused element
		previousActiveElement.current = document.activeElement as HTMLElement;

		// Focus the modal container
		modalRef.current.focus();

		// Prevent body scroll
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
			// Restore focus to the previously focused element
			previousActiveElement.current?.focus();
		};
	}, [project]);

	// Focus trap handler
	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key !== "Tab" || !modalRef.current) return;

		const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (e.shiftKey && document.activeElement === firstElement) {
			e.preventDefault();
			lastElement?.focus();
		} else if (!e.shiftKey && document.activeElement === lastElement) {
			e.preventDefault();
			firstElement?.focus();
		}
	}, []);

	if (!project) return null;

	const modalTitleId = `project-modal-title-${project.id}`;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-modal-title"
			onKeyDown={handleKeyDown}
		>
			{/* Backdrop with matrix rain effect */}
			<div
				className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm"
				aria-hidden="true"
			>
				{/* Animated scanlines */}
				<div
					className="absolute inset-0 animate-pulse"
					style={{
						background:
							"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(var(--theme-primary-dark-rgb), 0.03) 2px, rgba(var(--theme-primary-dark-rgb), 0.03) 4px)",
					}}
				/>
			</div>

			{/* Modal container */}
			<div
				ref={modalRef}
				tabIndex={-1}
				role="dialog"
				aria-modal="true"
				aria-labelledby={modalTitleId}
				className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg border border-lime-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(132,204,22,0.2)] focus:outline-none"
				onClick={(e) => e.stopPropagation()}
				style={{
					animation: "modalSlideIn 0.3s ease-out",
				}}
			>
				{/* Terminal header bar */}
				<div
					className="flex items-center justify-between bg-zinc-900/80 px-4 py-3"
					style={{
						borderBottomWidth: "1px",
						borderBottomStyle: "solid",
						borderBottomColor: "rgba(var(--theme-primary-dark-rgb), 0.3)",
					}}
				>
					<div className="flex items-center gap-3">
						<div className="flex gap-1.5" aria-hidden="true">
							<button
								onClick={onClose}
								className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 focus:ring-offset-zinc-900"
								aria-label="Close modal"
							/>
							<span className="h-3 w-3 rounded-full bg-yellow-500/50" />
							<span
								className="h-3 w-3 rounded-full"
								style={{
									backgroundColor: "rgba(var(--theme-primary-dark-rgb), 0.5)",
								}}
							/>
						</div>
						<span
							className="font-mono text-xs"
							style={{ color: "rgba(var(--theme-primary-dark-rgb), 0.7)" }}
						>
							project --view {project.id}
						</span>
					</div>
					<button
						onClick={onClose}
						className="font-mono text-xs text-zinc-500 transition-colors"
						onMouseEnter={(e) =>
							(e.currentTarget.style.color = "var(--theme-primary)")
						}
						onMouseLeave={(e) => (e.currentTarget.style.color = "")}
					>
						[ESC]
					</button>
				</div>

				{/* Scrollable content */}
				<div className="max-h-[calc(90vh-60px)] overflow-y-auto p-6">
					{/* Project header */}
					<div className="mb-6">
						<div className="mb-4 flex items-start gap-4">
							{/* Logo */}
							<div
								className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded bg-zinc-900"
								style={{
									borderWidth: "1px",
									borderStyle: "solid",
									borderColor: "rgba(var(--theme-primary-dark-rgb), 0.3)",
								}}
							>
								{project.logoUrl ? (
									<img
										src={project.logoUrl}
										alt={`${project.title} logo`}
										loading="lazy"
										decoding="async"
										className="h-14 w-14 object-contain"
									/>
								) : (
									<span
										className="font-mono text-3xl"
										style={{ color: "var(--theme-primary)" }}
									>
										{project.title.charAt(0)}
									</span>
								)}
							</div>

							<div className="flex-1">
								<h2
									id="project-modal-title"
									className="mb-2 font-mono text-2xl font-bold"
									style={{ color: "var(--theme-primary)" }}
								>
									<span style={{ color: "var(--theme-primary-darker)" }}>
										${" "}
									</span>
									{project.title}
								</h2>
								<p className="font-mono text-sm leading-relaxed text-zinc-400">
									{project.shortDescription}
								</p>
							</div>
						</div>

						{/* Tags */}
						<div className="flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="rounded px-3 py-1 font-mono text-xs"
									style={{
										borderWidth: "1px",
										borderStyle: "solid",
										borderColor: "rgba(var(--theme-secondary-dark-rgb), 0.4)",
										backgroundColor:
											"rgba(var(--theme-secondary-dark-rgb), 0.1)",
										color: "var(--theme-secondary)",
									}}
								>
									[{tag}]
								</span>
							))}
						</div>

						{/* Phase indicator */}
						<div className="mt-4">
							<PhaseIndicator phase={project.phase} size="md" />
						</div>
					</div>

					{/* Full description */}
					<div className="mb-6 rounded border border-zinc-800 bg-zinc-900/50 p-4">
						<div
							className="mb-2 font-mono text-xs"
							style={{ color: "rgba(var(--theme-primary-dark-rgb), 0.7)" }}
						>
							# README.md
						</div>
						<div className="space-y-4 font-mono text-sm leading-relaxed text-zinc-300">
							{project.fullDescription.split("\n\n").map((paragraph, i) => (
								<p key={i}>{paragraph}</p>
							))}
						</div>
					</div>

					{/* Technologies */}
					<div className="mb-6">
						<div
							className="mb-3 font-mono text-xs"
							style={{ color: "rgba(var(--theme-primary-dark-rgb), 0.7)" }}
						>
							# Tech Stack
						</div>
						<div className="flex flex-wrap gap-2">
							{project.technologies.map((tech) => (
								<span
									key={tech}
									className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-mono text-xs text-zinc-300"
								>
									{tech}
								</span>
							))}
						</div>
					</div>

					{/* Screenshots */}
					{project.screenshots.length > 0 && (
						<div className="mb-6">
							<div
								className="mb-3 font-mono text-xs"
								style={{ color: "rgba(var(--theme-primary-dark-rgb), 0.7)" }}
							>
								# Screenshots ({project.screenshots.length})
							</div>
							<div className="grid gap-3">
								{project.screenshots.map((screenshot, i) => (
									<div
										key={i}
										className="aspect-video rounded border border-zinc-800 bg-zinc-900 p-2"
									>
										<div className="flex h-full items-center justify-center font-mono text-xs text-zinc-600">
											[Screenshot {i + 1}]
											<br />
											{screenshot}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Action buttons */}
					<div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-6">
						{project.githubUrl && (
							<button
								onClick={() => onGitHubClick?.(project.githubUrl!)}
								className="group flex items-center gap-2 rounded px-4 py-2.5 font-mono text-sm transition-all"
								style={{
									borderWidth: "1px",
									borderStyle: "solid",
									borderColor: "rgba(var(--theme-primary-dark-rgb), 0.4)",
									backgroundColor: "rgba(var(--theme-primary-dark-rgb), 0.1)",
									color: "var(--theme-primary)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = "var(--theme-primary)";
									e.currentTarget.style.backgroundColor =
										"rgba(var(--theme-primary-dark-rgb), 0.2)";
									e.currentTarget.style.boxShadow =
										"0 0 20px rgba(var(--theme-primary-dark-rgb), 0.2)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor =
										"rgba(var(--theme-primary-dark-rgb), 0.4)";
									e.currentTarget.style.backgroundColor =
										"rgba(var(--theme-primary-dark-rgb), 0.1)";
									e.currentTarget.style.boxShadow = "none";
								}}
							>
								<svg
									className="h-4 w-4"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								<span>git clone</span>
								<span
									className="opacity-0 transition-opacity group-hover:opacity-100"
									style={{ color: "var(--theme-primary-darker)" }}
								>
									_
								</span>
							</button>
						)}

						{project.demoUrl && (
							<button
								onClick={() => onDemoClick?.(project.demoUrl!)}
								className="group flex items-center gap-2 rounded px-4 py-2.5 font-mono text-sm transition-all"
								style={{
									borderWidth: "1px",
									borderStyle: "solid",
									borderColor: "rgba(var(--theme-secondary-dark-rgb), 0.4)",
									backgroundColor: "rgba(var(--theme-secondary-dark-rgb), 0.1)",
									color: "var(--theme-secondary)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = "var(--theme-secondary)";
									e.currentTarget.style.backgroundColor =
										"rgba(var(--theme-secondary-dark-rgb), 0.2)";
									e.currentTarget.style.boxShadow =
										"0 0 20px rgba(var(--theme-secondary-dark-rgb), 0.2)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor =
										"rgba(var(--theme-secondary-dark-rgb), 0.4)";
									e.currentTarget.style.backgroundColor =
										"rgba(var(--theme-secondary-dark-rgb), 0.1)";
									e.currentTarget.style.boxShadow = "none";
								}}
							>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
								<span>Live Demo</span>
								<span
									className="opacity-0 transition-opacity group-hover:opacity-100"
									style={{ color: "var(--theme-secondary-dark)" }}
								>
									_
								</span>
							</button>
						)}

						{!project.githubUrl && !project.demoUrl && (
							<div className="font-mono text-sm text-zinc-600">
								<span className="text-yellow-500/70">[!</span> Links unavailable
								- project in pre-launch
								<span className="text-yellow-500/70">]</span>
							</div>
						)}
					</div>
				</div>

				{/* Keyframes */}
				<style>{`
          @keyframes modalSlideIn {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
			</div>
		</div>
	);
}
