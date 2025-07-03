'use client';

import {
	BorderStyle,
	ChartMode,
	ChartVariant,
	DataThemeProvider,
	IconProvider,
	NeutralColor,
	ScalingSize,
	Schemes,
	SolidStyle,
	SolidType,
	SurfaceStyle,
	ThemeProvider,
	ToastProvider,
	TransitionStyle
} from '@once-ui-system/core';
import { style, dataStyle } from '../resources';
import { iconLibrary } from '../resources/icons';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	// Force dark theme on client-side
	useEffect(() => {
		const root = document.documentElement;

		// Set theme attributes immediately
		const config = {
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
		};

		Object.entries(config).forEach(([key, value]) => {
			root.setAttribute('data-' + key, value);
		});

		// Force dark theme - this is critical for consistency
		root.setAttribute('data-theme', 'dark');

		// Remove any conflicting theme attributes that might cause light theme
		root.removeAttribute('data-theme-preference');
		root.removeAttribute('data-color-scheme');

		// Set CSS custom property as backup
		root.style.setProperty('color-scheme', 'dark');

		// Override any system preferences
		if (window.matchMedia) {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
			// Ignore system preference - always use dark
			const forceHandler = () => {
				root.setAttribute('data-theme', 'dark');
				root.style.setProperty('color-scheme', 'dark');
			};
			mediaQuery.addEventListener('change', forceHandler);

			return () => {
				mediaQuery.removeEventListener('change', forceHandler);
			};
		}
	}, []);

	return (
		<ThemeProvider
			brand={style.brand as Schemes}
			accent={style.accent as Schemes}
			neutral={style.neutral as NeutralColor}
			solid={style.solid as SolidType}
			solidStyle={style.solidStyle as SolidStyle}
			border={style.border as BorderStyle}
			surface={style.surface as SurfaceStyle}
			transition={style.transition as TransitionStyle}
			scaling={style.scaling as ScalingSize}
			theme='dark'>
			<DataThemeProvider
				variant={dataStyle.variant as ChartVariant}
				mode={dataStyle.mode as ChartMode}
				height={dataStyle.height}
				axis={{
					stroke: dataStyle.axis.stroke
				}}
				tick={{
					fill: dataStyle.tick.fill,
					fontSize: dataStyle.tick.fontSize,
					line: dataStyle.tick.line
				}}>
				<ToastProvider>
					<IconProvider icons={iconLibrary}>{children}</IconProvider>
				</ToastProvider>
			</DataThemeProvider>
		</ThemeProvider>
	);
}
