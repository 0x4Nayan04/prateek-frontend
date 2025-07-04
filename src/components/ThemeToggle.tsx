'use client';

import React, { useEffect, useState } from 'react';
import { ToggleButton, useTheme } from '@once-ui-system/core';

export const ThemeToggle: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Force dark theme on mount
		setTheme('dark');
	}, [setTheme]);

	useEffect(() => {
		// Always enforce dark theme
		if (theme !== 'dark') {
			setTheme('dark');
		}
	}, [theme, setTheme]);

	if (!mounted) {
		return null;
	}

	// Always show dark mode icon since we're locked to dark
	return (
		<ToggleButton
			prefixIcon='dark'
			onClick={() => setTheme('dark')} // Always set to dark
			aria-label='Dark mode (locked)'
		/>
	);
};
