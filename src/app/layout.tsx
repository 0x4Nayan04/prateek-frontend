import '@/resources/dark-theme-enforce.css';
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
			data-theme='dark'
			data-color-scheme='dark'
			style={{
				colorScheme: 'dark',
				backgroundColor: 'var(--neutral-100, #020b10)'
			}}
			className={classNames(
				fonts.heading.variable,
				fonts.body.variable,
				fonts.label.variable,
				fonts.code.variable
			)}>
			<head>
				<meta
					name='color-scheme'
					content='dark'
				/>
				<meta
					name='theme-color'
					content='#020b10'
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: `
							html, body {
								background-color: #020b10 !important;
								color: #d4e4ec !important;
								color-scheme: dark !important;
							}
							html[data-theme="light"] {
								background-color: #020b10 !important;
								color: #d4e4ec !important;
								color-scheme: dark !important;
							}
						`
					}}
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
					id='theme-init'
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                try {
                  const root = document.documentElement;
                  
                  // Force dark theme immediately before any rendering
                  root.setAttribute('data-theme', 'dark');
                  root.style.setProperty('color-scheme', 'dark');
                  
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
                  
                  // Remove any conflicting attributes that might cause light theme
                  root.removeAttribute('data-theme-preference');
                  root.removeAttribute('data-color-scheme');
                  
                  // Override system preferences completely
                  const style = document.createElement('style');
                  style.textContent = \`
                    :root {
                      color-scheme: dark !important;
                    }
                    @media (prefers-color-scheme: light) {
                      :root {
                        color-scheme: dark !important;
                      }
                    }
                    html[data-theme="light"] {
                      filter: invert(0) !important;
                    }
                    html {
                      background-color: var(--neutral-100, #020b10) !important;
                    }
                  \`;
                  document.head.appendChild(style);
                  
                  // Ensure dark theme persists
                  const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                        const currentTheme = root.getAttribute('data-theme');
                        if (currentTheme !== 'dark') {
                          root.setAttribute('data-theme', 'dark');
                        }
                      }
                    });
                  });
                  
                  observer.observe(root, {
                    attributes: true,
                    attributeFilter: ['data-theme', 'data-color-scheme']
                  });
                  
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  // Fallback
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.setProperty('color-scheme', 'dark');
                }
              })();
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
