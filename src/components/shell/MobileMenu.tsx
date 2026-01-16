import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { NavigationItem, SocialLink } from "../../types";
import { StyleSelector } from "./StyleSelector";
import { SocialLinks } from "./SocialLinks";

interface MobileMenuProps {
	items: NavigationItem[];
	socialLinks?: SocialLink[];
	onNavigate?: (href: string) => void;
}

export function MobileMenu({
	items,
	socialLinks = [],
	onNavigate,
}: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleNavigate = (href: string) => {
		setIsOpen(false);
		if (onNavigate) {
			onNavigate(href);
		} else {
			// Default behavior: scroll to anchor
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<>
			{/* Hamburger Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
				aria-label={isOpen ? "Close menu" : "Open menu"}
			>
				{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</button>

			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-zinc-950"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Slide-out Panel */}
			<div
				className={`
          fixed right-0 top-0 bottom-0 z-50 w-72 transform shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
				style={{ backgroundColor: "#18181b", minHeight: "100vh" }}
			>
				{/* Panel Header */}
				<div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
					<span className="font-heading text-sm text-zinc-400">Navigation</span>
					<button
						onClick={() => setIsOpen(false)}
						className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
						aria-label="Close menu"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Navigation Links */}
				<nav className="flex flex-col p-4">
					{items.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={(e) => {
								e.preventDefault();
								handleNavigate(item.href);
							}}
							className={`
                flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors font-heading
                ${
									item.isActive
										? ""
										: "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
								}
              `}
							style={item.isActive ? {
								backgroundColor: 'rgba(var(--theme-primary-rgb), 0.1)',
								color: 'var(--theme-primary)'
							} : undefined}
						>
							{item.isActive && (
								<span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }} />
							)}
							{item.label}
						</a>
					))}
				</nav>

				{/* Social Links */}
				{socialLinks.length > 0 && (
					<div className="border-t border-zinc-800 p-4">
						<span className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">
							Connect
						</span>
						<SocialLinks links={socialLinks} size="lg" />
					</div>
				)}

				{/* Style Selector */}
				<div className="border-t border-zinc-800 p-4">
					<span className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-500">
						Customize
					</span>
					<StyleSelector variant="full" />
				</div>
			</div>
		</>
	);
}
