'use client';

import { useEffect } from 'react';

export function StagewiseToolbar() {
	useEffect(() => {
		// Only initialize in development mode and on the client side
		if (
			process.env.NODE_ENV === 'development' &&
			typeof window !== 'undefined'
		) {
			// Dynamic import to avoid SSR issues
			import('@stagewise/toolbar')
				.then(({ initToolbar }) => {
					initToolbar({
						plugins: []
					});
				})
				.catch((error) => {
					console.warn('Failed to load stagewise toolbar:', error);
				});
		}
	}, []);

	// This component doesn't render anything visible
	return null;
}
