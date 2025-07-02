'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ScrollToHash() {
	const router = useRouter();

	useEffect(() => {
		// Get the hash from the URL
		const hash = window.location.hash;
		if (hash) {
			// Remove the '#' symbol
			const id = hash.replace('#', '');
			const element = document.getElementById(id);
			if (element) {
				// Calculate offset based on section type
				let headerHeight;
				if (id === 'case-studies') {
					headerHeight = 104; // Position case studies right below header, hiding hero section
				} else {
					headerHeight = 104 + 64; // Standard spacing for other sections like about
				}

				const elementPosition = element.offsetTop - headerHeight;

				window.scrollTo({
					top: Math.max(0, elementPosition),
					behavior: 'smooth'
				});
			}
		}
	}, [router]);

	return null;
}
