/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				heading: ['Space Grotesk', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				// Primary - Lime (Matrix green accents)
				lime: {
					50: '#f7fee7',
					100: '#ecfccb',
					200: '#d9f99d',
					300: '#bef264',
					400: '#a3e635',
					500: '#84cc16',
					600: '#65a30d',
					700: '#4d7c0f',
					800: '#3f6212',
					900: '#365314',
					950: '#1a2e05',
				},
				// Secondary - Emerald
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
					950: '#022c22',
				},
				// Neutral - Zinc
				zinc: {
					50: '#fafafa',
					100: '#f4f4f5',
					200: '#e4e4e7',
					300: '#d4d4d8',
					400: '#a1a1aa',
					500: '#71717a',
					600: '#52525b',
					700: '#3f3f46',
					800: '#27272a',
					900: '#18181b',
					950: '#09090b',
				},
			},
			boxShadow: {
				'glow-lime': '0 0 20px rgba(163, 230, 53, 0.4)',
				'glow-lime-lg': '0 0 40px rgba(163, 230, 53, 0.4)',
				'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.2)',
			},
			animation: {
				'wave': 'wave 8s ease-in-out infinite',
				'blink': 'blink 1s step-end infinite',
				'pulse-glow': 'pulse 2s ease-in-out infinite',
			},
			keyframes: {
				wave: {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-20px) scale(1.05)' },
				},
				blink: {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' },
				},
			},
		},
	},
	plugins: [],
};
