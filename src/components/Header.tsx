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
	const [isCaseStudiesInView, setIsCaseStudiesInView] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Handle mounting for SSR safety
	useEffect(() => {
		setMounted(true);
	}, []);

	// Set up intersection observer to track about and case studies section visibility
	useEffect(() => {
		if (!mounted || pathname !== '/') {
			setIsAboutInView(false);
			setIsCaseStudiesInView(false);
			return;
		}

		const aboutSection = document.getElementById('about');
		const caseStudiesSection = document.getElementById('case-studies');

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
					} else if (entry.target.id === 'case-studies') {
						setIsCaseStudiesInView(entry.isIntersecting);
						// Update URL hash when case studies section comes into view
						if (entry.isIntersecting) {
							window.history.replaceState(null, '', '#case-studies');
						} else {
							// Remove hash when scrolling away from case studies section
							if (window.location.hash === '#case-studies') {
								window.history.replaceState(null, '', '/');
							}
						}
					}
				});
			},
			{
				// Trigger when 50% of the section is visible
				threshold: 0.5,
				// Add some margin to trigger before the section is fully in view
				rootMargin: '-20% 0px -20% 0px'
			}
		);

		if (aboutSection) observer.observe(aboutSection);
		if (caseStudiesSection) observer.observe(caseStudiesSection);

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

	// Determine if Case Studies section should be highlighted
	const isCaseStudiesActive =
		mounted &&
		pathname === '/' &&
		(isCaseStudiesInView ||
			(typeof window !== 'undefined' &&
				window.location.hash === '#case-studies'));

	const scrollToAbout = () => {
		// If we're already on the homepage, just scroll to about
		if (pathname === '/') {
			const aboutSection = document.getElementById('about');
			if (aboutSection) {
				// Calculate offset to account for sticky header
				const headerHeight = 104 + 32; // Header height + some padding for better visibility
				const elementPosition = aboutSection.offsetTop - headerHeight;

				window.scrollTo({
					top: Math.max(0, elementPosition),
					behavior: 'smooth'
				});

				// Update URL hash to reflect the about section
				window.history.replaceState(null, '', '#about');
			}
		} else {
			// If we're on a different page, navigate to homepage with hash
			router.push('/#about');
		}
	};

	const scrollToCaseStudies = () => {
		// If we're already on the homepage, just scroll to case studies
		if (pathname === '/') {
			const caseStudiesSection = document.getElementById('case-studies');

			if (caseStudiesSection) {
				// Position the section right below the header to hide hero content
				const elementPosition = caseStudiesSection.offsetTop - 104; // Just header height

				window.scrollTo({
					top: Math.max(0, elementPosition),
					behavior: 'smooth'
				});

				// Update URL hash to reflect the case studies section
				window.history.replaceState(null, '', '#case-studies');
			}
		} else {
			// If we're on a different page, navigate to homepage with hash
			router.push('/#case-studies');
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
				data-border=''>
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
						zIndex={1}>
						<Flex
							gap='4'
							vertical='center'
							textVariant='body-default-s'
							suppressHydrationWarning>
							{routes['/'] && (
								<>
									<ToggleButton
										className='s-flex-hide'
										prefixIcon='home'
										href='/'
										label='Home'
										selected={pathname === '/'}
									/>
									<ToggleButton
										className='s-flex-show'
										prefixIcon='home'
										href='/'
										selected={pathname === '/'}
									/>
								</>
							)}
							<>
								<ToggleButton
									className='s-flex-hide'
									prefixIcon='person'
									onClick={scrollToAbout}
									label='About'
									selected={isAboutActive}
								/>
								<ToggleButton
									className='s-flex-show'
									prefixIcon='person'
									onClick={scrollToAbout}
									selected={isAboutActive}
								/>{' '}
							</>
							<>
								<ToggleButton
									className='s-flex-hide'
									prefixIcon='grid'
									onClick={scrollToCaseStudies}
									label={work.label}
									selected={isCaseStudiesActive}
								/>
								<ToggleButton
									className='s-flex-show'
									prefixIcon='grid'
									onClick={scrollToCaseStudies}
									selected={isCaseStudiesActive}
								/>
							</>
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
