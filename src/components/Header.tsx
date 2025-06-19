'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Fade, Flex, ToggleButton } from '@once-ui-system/core';

import {
	about,
	blog,
	display,
	gallery,
	person,
	routes,
	work
} from '@/resources';
import styles from './Header.module.scss';

type TimeDisplayProps = {
	timeZone: string;
	locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

function formatInTimeZone(
	date: Date,
	timeZone: string,
	locale: string = 'en-GB'
): string {
	return new Intl.DateTimeFormat(locale, {
		timeZone,
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(date);
}

function TimeDisplay({ timeZone, locale = 'en-GB' }: TimeDisplayProps) {
	const [time, setTime] = useState<string>('');

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const formattedTime = formatInTimeZone(now, timeZone, locale);
			setTime(formattedTime);
		};

		updateTime(); // Set initial time
		const interval = setInterval(updateTime, 1000); // Update every second

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [timeZone, locale]);

	return <>{time}</>;
}

export const Header = () => {
	const pathname = usePathname() ?? '';
	const router = useRouter();
	const [isAboutInView, setIsAboutInView] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Handle mounting for SSR safety
	useEffect(() => {
		setMounted(true);
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
				data-border=''>
				<Flex
					paddingLeft='12'
					fillWidth
					vertical='center'
					textVariant='body-default-s'>
					{display.location && <Flex hide='s'>{person.location}</Flex>}
				</Flex>
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
							{routes['/about'] && (
								<>
									<ToggleButton
										className='s-flex-hide'
										prefixIcon='person'
										onClick={scrollToAbout}
										label={about.label}
										selected={isAboutActive}
									/>
									<ToggleButton
										className='s-flex-show'
										prefixIcon='person'
										onClick={scrollToAbout}
										selected={isAboutActive}
									/>
								</>
							)}
							{routes['/work'] && (
								<>
									<ToggleButton
										className='s-flex-hide'
										prefixIcon='grid'
										href='/work'
										label={work.label}
										selected={pathname.startsWith('/work')}
									/>
									<ToggleButton
										className='s-flex-show'
										prefixIcon='grid'
										href='/work'
										selected={pathname.startsWith('/work')}
									/>
								</>
							)}
							{routes['/blog'] && (
								<>
									<ToggleButton
										className='s-flex-hide'
										prefixIcon='book'
										href='/blog'
										label={blog.label}
										selected={pathname.startsWith('/blog')}
									/>
									<ToggleButton
										className='s-flex-show'
										prefixIcon='book'
										href='/blog'
										selected={pathname.startsWith('/blog')}
									/>
								</>
							)}
							{routes['/gallery'] && (
								<>
									<ToggleButton
										className='s-flex-hide'
										prefixIcon='gallery'
										href='/gallery'
										label={gallery.label}
										selected={pathname.startsWith('/gallery')}
									/>
									<ToggleButton
										className='s-flex-show'
										prefixIcon='gallery'
										href='/gallery'
										selected={pathname.startsWith('/gallery')}
									/>
								</>
							)}
						</Flex>
					</Flex>
				</Flex>
				<Flex
					fillWidth
					horizontal='end'
					vertical='center'>
					<Flex
						paddingRight='12'
						horizontal='end'
						vertical='center'
						textVariant='body-default-s'
						gap='20'>
						<Flex hide='s'>
							{display.time && <TimeDisplay timeZone={person.location} />}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
