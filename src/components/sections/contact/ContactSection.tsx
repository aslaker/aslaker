import { useEffect, useState } from "react";
import type { CalendarConfig, TopicOption } from "../../../types";

interface ContactSectionProps {
	topicOptions: TopicOption[];
	calendarConfig: CalendarConfig;
	onContactClick?: () => void;
}

export function ContactSection({ onContactClick }: ContactSectionProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section
			id="contact"
			className="min-h-screen bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8"
		>
			<div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.02]">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
              linear-gradient(rgba(var(--theme-primary-rgb), 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--theme-primary-rgb), 0.3) 1px, transparent 1px)
            `,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			<div className="relative mx-auto max-w-2xl">
				<div
					className={`mb-8 transition-all duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<div
						className="inline-block rounded bg-zinc-900/80 px-4 py-2"
						style={{
							borderWidth: "1px",
							borderStyle: "solid",
							borderColor: "rgba(var(--theme-primary-dark-rgb), 0.3)",
						}}
					>
						<span
							className="font-mono text-sm"
							style={{ color: "var(--theme-primary-dark)" }}
						>
							<span style={{ color: "var(--theme-primary-darker)" }}>
								adam@portfolio
							</span>
							<span className="text-zinc-500">:</span>
							<span style={{ color: "var(--theme-secondary)" }}>~/contact</span>
							<span className="text-zinc-500">$ </span>
							<span className="text-zinc-300">./reach-out.sh</span>
							<span
								className="ml-1 inline-block h-4 w-2 animate-pulse"
								style={{ backgroundColor: "var(--theme-primary)" }}
							/>
						</span>
					</div>
				</div>

				<div
					className={`transition-all delay-150 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
					}`}
				>
					<h1 className="mb-4 text-3xl font-medium text-zinc-100 sm:text-4xl">
						<span style={{ color: "var(--theme-primary-dark)" }}># </span>
						Let&apos;s Build Something
					</h1>
					<p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-300">
						Whether you&apos;re looking to integrate AI into your product, need
						a technical partner, or want to explore what&apos;s
						possible—I&apos;d love to hear from you.
					</p>
				</div>

				<div
					className={`transition-all delay-300 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<div
						className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300"
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor =
								"rgba(var(--theme-primary-dark-rgb), 0.3)";
							e.currentTarget.style.boxShadow =
								"0 0 40px rgba(var(--theme-primary-rgb), 0.05)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = "";
							e.currentTarget.style.boxShadow = "none";
						}}
					>
						<div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
							<div
								className="absolute -right-10 -top-10 h-20 w-20 rotate-45"
								style={{
									background:
										"linear-gradient(to bottom, rgba(var(--theme-primary-dark-rgb), 0.2), transparent)",
								}}
							/>
						</div>

						<div
							className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-5"
							style={{
								background:
									"linear-gradient(to bottom right, rgba(var(--theme-primary-rgb), 0.1), rgba(var(--theme-secondary-rgb), 0.1))",
							}}
						/>

						<div className="relative">
							<div className="mb-6 flex items-center gap-3">
								<div
									className="flex h-10 w-10 items-center justify-center rounded border border-zinc-700/50 bg-zinc-800/50 transition-all duration-300"
									style={{ color: "var(--theme-primary-dark)" }}
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										className="h-5 w-5"
									>
										<path
											d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div>
									<h2 className="font-mono text-lg font-medium text-zinc-100">
										Start a Conversation
									</h2>
									<p className="text-sm text-zinc-400">
										Response within 24 hours
									</p>
								</div>
							</div>

							<p className="mb-6 text-zinc-300">
								Click below to open the contact form. Share your project
								details, and we&apos;ll schedule a time to chat about how I can
								help.
							</p>

							<button
								type="button"
								onClick={onContactClick}
								className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded border-none px-8 py-4 font-mono text-sm font-medium uppercase tracking-widest text-zinc-900 transition-all duration-300"
								style={{ backgroundColor: "var(--theme-primary-dark)" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor =
										"var(--theme-primary)";
									e.currentTarget.style.boxShadow =
										"0 0 40px rgba(var(--theme-primary-rgb), 0.4)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor =
										"var(--theme-primary-dark)";
									e.currentTarget.style.boxShadow = "none";
								}}
							>
								<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
								<span className="relative flex items-center gap-2">
									<span style={{ color: "var(--theme-primary-darker)" }} aria-hidden="true">
										&gt;
									</span>
									Get in Touch
								</span>
							</button>
						</div>

						<div
							className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
							style={{
								background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`,
							}}
						/>
					</div>
				</div>

				<div
					className={`mt-8 text-center transition-all delay-500 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<p className="mb-4 font-mono text-xs text-zinc-400">
						<span style={{ color: "var(--theme-primary-darker)" }} aria-hidden="true">[</span>
						Or reach out directly
						<span style={{ color: "var(--theme-primary-darker)" }} aria-hidden="true">]</span>
					</p>
					<div className="flex justify-center gap-6">
						<a
							href="mailto:hello@adamslaker.dev"
							className="group inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors"
							onMouseEnter={(e) =>
								(e.currentTarget.style.color = "var(--theme-primary)")
							}
							onMouseLeave={(e) => (e.currentTarget.style.color = "")}
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-4 w-4"
							>
								<path
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>Email</span>
						</a>
						<a
							href="https://linkedin.com/in/adam-slaker"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors"
							onMouseEnter={(e) =>
								(e.currentTarget.style.color = "var(--theme-primary)")
							}
							onMouseLeave={(e) => (e.currentTarget.style.color = "")}
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-4 w-4"
							>
								<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
								<rect x="2" y="9" width="4" height="12" />
								<circle cx="4" cy="4" r="2" />
							</svg>
							<span>LinkedIn</span>
						</a>
					</div>
				</div>

				<div
					className={`mt-12 text-center transition-all delay-700 duration-700 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<p className="font-mono text-xs text-zinc-600">
						<span style={{ color: "var(--theme-primary-darker)" }}>[</span>
						Currently accepting new projects
						<span style={{ color: "var(--theme-primary-darker)" }}>]</span>
					</p>
				</div>
			</div>
		</section>
	);
}
