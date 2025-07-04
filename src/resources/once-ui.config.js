const baseURL = 'https://pratik-srivastava-bi.vercel.app';

const routes = {
	'/': true,
	'/work': true
};

const display = {
	location: false,
	time: false,
	themeSwitcher: false
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
	theme: 'dark', // system | dark | light
	neutral: 'gray', // sand | gray | slate
	brand: 'cyan', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
	accent: 'red', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
	solid: 'contrast', // color | contrast
	solidStyle: 'flat', // flat | plastic
	border: 'playful', // rounded | playful | conservative
	surface: 'translucent', // filled | translucent
	transition: 'all', // all | micro | macro
	scaling: '100' // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
	variant: 'gradient', // flat | gradient | outline
	mode: 'categorical', // categorical | divergent | sequential
	height: 24, // default chart height
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
		opacity: 40,
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

export { routes, baseURL, fonts, style, effects, dataStyle, display };
