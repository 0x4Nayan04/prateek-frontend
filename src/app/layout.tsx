import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css';

import classNames from 'classnames';

import {
	Background,
	Column,
	Flex,
	opacity,
	SpacingToken
} from '@once-ui-system/core';
import {
	Footer,
	Header,
	RouteGuard,
	Providers,
	ErrorBoundary
} from '@/components';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';

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
				<script
					id='theme-init'
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                try {
                  const root = document.documentElement;
                  
                  // Set defaults from config
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
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Always use dark theme
                  root.setAttribute('data-theme', 'dark');
                  
                  // Apply any saved style overrides (excluding theme)
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              // Global error handlers for async response issues
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.message && 
                    event.reason.message.includes('A listener indicated an asynchronous response by returning true')) {
                  console.warn('Caught async response error:', event.reason.message);
                  event.preventDefault(); // Prevent the error from being logged to console as unhandled
                  return;
                }
              });

              // Handle extension-related errors (common cause of this issue)
              window.addEventListener('error', function(event) {
                if (event.error && event.error.message && 
                    event.error.message.includes('A listener indicated an asynchronous response by returning true')) {
                  console.warn('Caught extension async error:', event.error.message);
                  event.preventDefault();
                  return;
                }
              });
            `
					}}
				/>
			</head>
			<Providers>
				<Column
					as='body'
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
						paddingTop='xl'
						horizontal='center'
						flex={1}>
						<Flex
							horizontal='center'
							fillWidth
							minHeight='0'>
							<ErrorBoundary>
								<RouteGuard>{children}</RouteGuard>
							</ErrorBoundary>
						</Flex>
					</Flex>
					<Footer />
				</Column>
			</Providers>
		</Flex>
	);
}
