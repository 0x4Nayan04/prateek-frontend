const baseURL = 'https://pratik-srivastava-bi.vercel.app';

const routes = {
	'/': true,
	'/work': true
};

// Import and set font for each variant
import { Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';

const heading = Inter({
	variable: '--font-heading',
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	preload: true,
	fallback: [
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Arial',
		'sans-serif'
	]
});

const body = Inter({
	variable: '--font-body',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600'],
	preload: true,
	fallback: [
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Arial',
		'sans-serif'
	]
});

const label = Inter({
	variable: '--font-label',
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600'],
	preload: false, // Only preload critical fonts
	fallback: [
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Arial',
		'sans-serif'
	]
});

const code = Geist_Mono({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
	preload: false, // Code font is typically not critical
	fallback: [
		'Menlo',
		'Monaco',
		'Consolas',
		'Liberation Mono',
		'Courier New',
		'monospace'
	]
});

const fonts = {
	heading: heading,
	body: body,
	label: label,
	code: code
};

// default customization applied to the HTML in the main layout.tsx
const style = {
	theme: 'dark', // Confirmed
	neutral: 'gray', // Slightly bluish-dark background observed
	brand: 'aqua', // Brand buttons and gradients use warm orange tones
	accent: 'yellow', // Icons and highlights like "stat cards" use yellow/gold
	solid: 'contrast', // Strong button color (not high contrast)
	solidStyle: 'flat', // Buttons and inputs are slightly glossy/glass-like
	border: 'playful', // Borders are sharp and minimal
	surface: 'translucent', // Glowing, glassy section surfaces
	transition: 'all', // Multiple animations (hover, icon pulses, etc.)
	scaling: '100' // Seems like default scaling; feels natural and readable
};

const dataStyle = {
	variant: 'flat', // Clean flat visual
	mode: 'categorical', // Consistent section-based colors
	height: 28, // Slightly taller stat visuals
	axis: {
		stroke: 'var(--neutral-alpha-weak)'
	},
	tick: {
		fill: 'var(--neutral-on-background-weak)',
		fontSize: 11,
		line: false
	}
};

const effects = {
	mask: {
		cursor: false,
		x: 50,
		y: 0,
		radius: 100
	},
	gradient: {
		display: false,
		opacity: 100,
		x: 50,
		y: 60,
		width: 100,
		height: 50,
		tilt: 0,
		colorStart: 'accent-background-strong',
		colorEnd: 'page-background'
	},
	dots: {
		display: true,
		opacity: 80,
		size: '2',
		color: 'brand-background-strong'
	},
	grid: {
		display: false,
		opacity: 100,
		color: 'neutral-alpha-medium',
		width: '0.25rem',
		height: '0.25rem'
	},
	lines: {
		display: false,
		opacity: 100,
		color: 'neutral-alpha-weak',
		size: '16',
		thickness: 1,
		angle: 45
	}
};

export { routes, baseURL, fonts, style, effects, dataStyle };
