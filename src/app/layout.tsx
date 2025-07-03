import '@/resources/dark-theme-override.css';
import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/responsive-system.css';
import '@/resources/custom-overrides.css';
import '@/resources/custom.css';
import '@/components/work/mobile-fixes.css';

import classNames from 'classnames';
import type { Metadata } from 'next';

import {
	Background,
	Column,
	Flex,
	opacity,
	SpacingToken
} from '@once-ui-system/core';
import { Footer, Header, Providers, ScrollToTop } from '@/components';
import { StagewiseToolbar } from '@/components/StagewiseToolbar';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';

export const metadata: Metadata = {
	metadataBase: new URL(baseURL),
	title: {
		default: home.title,
		template: `%s | ${home.title}`
	},
	description: home.description,
	openGraph: {
		title: home.title,
		description: home.description,
		url: baseURL,
		siteName: home.title,
		images: [
			{
				url: `${baseURL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: home.title,
				type: 'image/png'
			}
		],
		locale: 'en_US',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: home.title,
		description: home.description,
		images: [`${baseURL}/og-image.png`],
		creator: '@pratik_sri'
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	manifest: '/site.webmanifest',
	alternates: {
		canonical: baseURL
	},
	keywords: [
		'Product Manager',
		'Data Analyst',
		'Power BI',
		'Business Intelligence',
		'Portfolio',
		'Pratik Srivastava'
	],
	authors: [{ name: 'Pratik Srivastava' }],
	creator: 'Pratik Srivastava',
	publisher: 'Pratik Srivastava',
	category: 'Portfolio'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Flex
			suppressHydrationWarning
			as='html'
			lang='en'
			fillWidth
			className={classNames(
				fonts.heading.variable,
				fonts.body.variable,
				fonts.label.variable,
				fonts.code.variable
			)}>
			<head>
				{/* Force dark theme meta tags */}
				<meta
					name='color-scheme'
					content='dark'
				/>
				<meta
					name='theme-color'
					content='#020b10'
				/>
				<meta
					name='msapplication-navbutton-color'
					content='#020b10'
				/>
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>

				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='manifest'
					href='/site.webmanifest'
				/>
				<script
					id='theme-force-dark'
					dangerouslySetInnerHTML={{
						__html: `
              // Immediate execution before any rendering - force dark theme
              (function() {
                const root = document.documentElement;
                const body = document.body;
                
                // Force dark theme at DOM level immediately
                root.style.colorScheme = 'dark';
                root.style.backgroundColor = '#020b10';
                root.setAttribute('data-theme', 'dark');
                
                // Ensure body has dark background
                if (body) {
                  body.style.backgroundColor = '#020b10';
                  body.style.color = '#e7f8ff';
                }
                
                // Override any system theme detection
                if (window.matchMedia) {
                  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  // Always report dark theme regardless of system preference
                  Object.defineProperty(mediaQuery, 'matches', { value: true, writable: false });
                }
              })();
            `
					}}
				/>
				<script
					id='theme-init'
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                try {
                  const root = document.documentElement;
                  
                  // Set theme attributes from config
                  const config = ${JSON.stringify({
										brand: style.brand,
										accent: style.accent,
										neutral: style.neutral,
										solid: style.solid,
										'solid-style': style.solidStyle,
										border: style.border,
										surface: style.surface,
										transition: style.transition,
										scaling: style.scaling,
										'viz-style': dataStyle.variant
									})};
                  
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Always use dark theme for portfolio
                  root.setAttribute('data-theme', 'dark');
                  
                  // Force dark theme styles
                  root.style.colorScheme = 'dark';
                  root.style.backgroundColor = '#020b10';
                  
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.style.backgroundColor = '#020b10';
                }
              })();
            `
					}}
				/>
				<script
					id='theme-persistence'
					dangerouslySetInnerHTML={{
						__html: `
              // Ensure dark theme persists after any dynamic content loads
              document.addEventListener('DOMContentLoaded', function() {
                const root = document.documentElement;
                const body = document.body;
                
                // Final enforcement of dark theme
                root.setAttribute('data-theme', 'dark');
                root.style.colorScheme = 'dark';
                root.style.backgroundColor = '#020b10';
                
                if (body) {
                  body.style.backgroundColor = '#020b10';
                  body.style.color = '#e7f8ff';
                }
                
                // Monitor for any theme changes and override them
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                      if (root.getAttribute('data-theme') !== 'dark') {
                        root.setAttribute('data-theme', 'dark');
                      }
                    }
                  });
                });
                
                observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
              });
            `
					}}
				/>
			</head>
			<Providers>
				<StagewiseToolbar />
				<Column
					as='body'
					className='body-wrapper'
					suppressHydrationWarning
					background='page'
					fillWidth
					style={{
						minHeight: '100vh',
						overflow: 'hidden auto',
						display: 'flex',
						flexDirection: 'column'
					}}
					margin='0'
					padding='0'
					horizontal='center'>
					<Background
						position='fixed'
						mask={{
							x: effects.mask.x,
							y: effects.mask.y,
							radius: effects.mask.radius,
							cursor: effects.mask.cursor
						}}
						gradient={{
							display: effects.gradient.display,
							opacity: effects.gradient.opacity as opacity,
							x: effects.gradient.x,
							y: effects.gradient.y,
							width: effects.gradient.width,
							height: effects.gradient.height,
							tilt: effects.gradient.tilt,
							colorStart: effects.gradient.colorStart,
							colorEnd: effects.gradient.colorEnd
						}}
						dots={{
							display: effects.dots.display,
							opacity: effects.dots.opacity as opacity,
							size: effects.dots.size as SpacingToken,
							color: effects.dots.color
						}}
						grid={{
							display: effects.grid.display,
							opacity: effects.grid.opacity as opacity,
							color: effects.grid.color,
							width: effects.grid.width,
							height: effects.grid.height
						}}
						lines={{
							display: effects.lines.display,
							opacity: effects.lines.opacity as opacity,
							size: effects.lines.size as SpacingToken,
							thickness: effects.lines.thickness,
							angle: effects.lines.angle,
							color: effects.lines.color
						}}
					/>
					<Flex
						fillWidth
						minHeight='16'
						hide='s'
					/>
					<Header />
					<Flex
						zIndex={0}
						fillWidth
						padding='8'
						paddingTop='l'
						horizontal='center'
						flex={1}>
						<Flex
							horizontal='center'
							fillWidth
							minHeight='0'>
							{children}
						</Flex>
					</Flex>
					<Footer />
					<ScrollToTop />
				</Column>
			</Providers>
		</Flex>
	);
}
