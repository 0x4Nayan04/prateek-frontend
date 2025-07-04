'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Fade, Flex, ToggleButton } from '@once-ui-system/core';

import { routes, work } from '@/resources';
import styles from './Header.module.scss';

export const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [isAboutInView, setIsAboutInView] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Handle mounting for SSR safety and responsive detection
	useEffect(() => {
		setMounted(true);

		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	// Set up intersection observer to track about section visibility
	useEffect(() => {
		if (!mounted || pathname !== '/') {
			setIsAboutInView(false);
			return;
		}

		const aboutSection = document.getElementById('about');
		if (!aboutSection) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target.id === 'about') {
						setIsAboutInView(entry.isIntersecting);
						// Update URL hash when about section comes into view
						if (entry.isIntersecting) {
							window.history.replaceState(null, '', '#about');
						} else {
							// Remove hash when scrolling away from about section
							if (window.location.hash === '#about') {
								window.history.replaceState(null, '', '/');
							}
						}
					}
				});
			},
			{
				// Trigger when 50% of the about section is visible
				threshold: 0.5,
				// Add some margin to trigger before the section is fully in view
				rootMargin: '-20% 0px -20% 0px'
			}
		);

		observer.observe(aboutSection);

		return () => {
			observer.disconnect();
		};
	}, [mounted, pathname]);

	// Determine if About section should be highlighted
	const isAboutActive =
		mounted &&
		pathname === '/' &&
		(isAboutInView ||
			(typeof window !== 'undefined' && window.location.hash === '#about'));

	// Determine if Home section should be highlighted (exclude when about is active)
	const isHomeActive = pathname === '/' && !isAboutActive;

	const scrollToAbout = () => {
		// If we're already on the homepage, just scroll to about
		if (pathname === '/') {
			const aboutSection = document.getElementById('about');
			if (aboutSection) {
				aboutSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
				// Update URL hash to reflect the about section
				window.history.replaceState(null, '', '#about');
			}
		} else {
			// If we're on a different page, navigate to homepage with hash
			router.push('/#about');
		}
	};

	return (
		<>
			<Fade
				hide='s'
				fillWidth
				position='fixed'
				height='104'
				zIndex={9}
			/>
			<Fade
				show='s'
				fillWidth
				position='fixed'
				bottom='0'
				to='top'
				height='104'
				zIndex={9}
			/>
			<Flex
				fitHeight
				position='fixed'
				className={styles.position}
				as='header'
				zIndex={10}
				fillWidth
				padding='4'
				horizontal='center'
				data-border='playful'>
				<Flex
					paddingLeft='12'
					fillWidth
					vertical='center'
					textVariant='body-default-s'></Flex>
				<Flex
					fillWidth
					horizontal='center'>
					<Flex
						background='page'
						border='neutral-alpha-weak'
						radius='m-4'
						shadow='l'
						padding='4'
						horizontal='center'
						zIndex={1}
						data-border='playful'>
						<Flex
							gap='4'
							vertical='center'
							textVariant='body-default-s'
							suppressHydrationWarning>
							{routes['/'] && (
								<ToggleButton
									prefixIcon='home'
									href='/'
									label={!isMobile ? 'Home' : undefined}
									selected={isHomeActive}
								/>
							)}
							<ToggleButton
								prefixIcon='person'
								onClick={scrollToAbout}
								label={!isMobile ? 'About' : undefined}
								selected={isAboutActive}
							/>
							{routes['/work'] && (
								<ToggleButton
									prefixIcon='grid'
									href='/work'
									label={!isMobile ? work.label : undefined}
									selected={pathname.startsWith('/work')}
								/>
							)}
						</Flex>
					</Flex>
				</Flex>
				<Flex
					paddingRight='12'
					fillWidth
					horizontal='end'
					vertical='center'
					textVariant='body-default-s'></Flex>
			</Flex>
		</>
	);
};
