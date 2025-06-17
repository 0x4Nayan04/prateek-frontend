'use client';

import { usePathname } from 'next/navigation';
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
import { ThemeToggle } from './ThemeToggle';

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

const scrollToAbout = () => {
	const aboutSection = document.getElementById('about');
	if (aboutSection) {
		aboutSection.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
};

export const Header = () => {
	const pathname = usePathname() ?? '';

	return (
		<>
			<Fade
				hide='s'
				fillWidth
				position='fixed'
				height='80'
				zIndex={9}
			/>
			<Fade
				show='s'
				fillWidth
				position='fixed'
				bottom='0'
				to='top'
				height='80'
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
										selected={false}
									/>
									<ToggleButton
										className='s-flex-show'
										prefixIcon='person'
										onClick={scrollToAbout}
										selected={false}
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
							{display.themeSwitcher && (
								<>
									<ThemeToggle />
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
