'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
	Column,
	Text,
	Heading,
	RevealFx,
	InfiniteScroll,
	Grid,
	Button
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { ModernCaseStudyCard } from './ModernCaseStudyCard';
import { getCaseStudiesPaginated } from '@/lib/utils/content';
interface InfiniteCaseStudyGridProps {
	title?: string;
	initialCaseStudies?: CaseStudy[];
	itemsPerPage?: number;
	columns?: {
		desktop: number;
		tablet: number;
		mobile: number;
	};
}

export function InfiniteCaseStudyGrid({
	title,
	initialCaseStudies = [],
	itemsPerPage = 6,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: InfiniteCaseStudyGridProps) {
	const [items, setItems] = useState<CaseStudy[]>(initialCaseStudies);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [offset, setOffset] = useState(initialCaseStudies.length);
	const [mounted, setMounted] = useState(false);
	const isMountedRef = useRef(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	// Handle hydration and setup cleanup
	useEffect(() => {
		setMounted(true);
		isMountedRef.current = true;

		// Initialize hasMore state based on initial data
		if (initialCaseStudies.length < itemsPerPage) {
			setHasMore(false);
		}

		// Cleanup function
		return () => {
			isMountedRef.current = false;
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [initialCaseStudies.length, itemsPerPage]);

	const loadMore = useCallback(async () => {
		if (loading || !mounted || !isMountedRef.current) return false;

		// Cancel any previous request
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		// Create new abort controller for this request
		abortControllerRef.current = new AbortController();
		const currentController = abortControllerRef.current;

		if (!isMountedRef.current) return false;
		setLoading(true);

		try {
			const result = await getCaseStudiesPaginated(offset, itemsPerPage);

			// Check if request was cancelled or component unmounted
			if (currentController.signal.aborted || !isMountedRef.current) {
				return false;
			}

			if (result.caseStudies.length > 0) {
				setItems((prev) => [...prev, ...result.caseStudies]);
				setOffset((prev) => prev + result.caseStudies.length);
				setHasMore(result.hasMore);
				return result.hasMore;
			} else {
				setHasMore(false);
				return false;
			}
		} catch (error: any) {
			// If the request was aborted, don't log it as an error
			if (error.name === 'AbortError' || currentController.signal.aborted) {
				return false;
			}

			console.error('Error loading more case studies:', error);
			if (isMountedRef.current) {
				setHasMore(false);
			}
			return false;
		} finally {
			if (isMountedRef.current) {
				setLoading(false);
			}
		}
	}, [offset, itemsPerPage, loading, mounted]);

	// Don't render infinite scroll until mounted to avoid hydration issues
	if (!mounted) {
		return (
			<Column
				fillWidth
				gap='40'>
				{/* Header */}
				{title && (
					<RevealFx
						translateY={6}
						delay={0.02}
						fillWidth
						horizontal='center'
						vertical='center'
						paddingY='m'>
						<Heading
							variant='display-strong-l'
							onBackground='neutral-strong'
							align='center'
							style={{
								fontSize: '48px',
								fontWeight: '800',
								color: 'white'
							}}>
							{title}
						</Heading>
					</RevealFx>
				)}

				{/* Initial static grid for SSR */}
				<Column
					fillWidth
					paddingX='l'>
					{initialCaseStudies.length > 0 ? (
						<Grid
							columns={columns.desktop as any}
							tabletColumns={columns.tablet as any}
							mobileColumns={columns.mobile as any}
							gap='48'
							fillWidth>
							{initialCaseStudies.map((caseStudy, index) => (
								<ModernCaseStudyCard
									key={caseStudy._id}
									caseStudy={caseStudy}
									index={index}
									priority={index < 4}
								/>
							))}
						</Grid>
					) : (
						<Column
							fillWidth
							center
							padding='xl'
							gap='20'
							background='surface'
							border='neutral-alpha-weak'
							radius='xl'>
							<Text
								variant='heading-default-l'
								onBackground='neutral-strong'
								align='center'
								style={{ fontSize: '28px', fontWeight: '700' }}>
								Loading case studies...
							</Text>
						</Column>
					)}
				</Column>
			</Column>
		);
	}

	return (
		<Column
			fillWidth
			gap='40'>
			{/* Header */}
			{title && (
				<RevealFx
					translateY={6}
					delay={0.02}
					fillWidth
					horizontal='center'
					vertical='center'
					paddingY='m'>
					<Heading
						variant='display-strong-l'
						onBackground='neutral-strong'
						align='center'
						style={{
							fontSize: '48px',
							fontWeight: '800',
							color: 'white'
						}}>
						{title}
					</Heading>
				</RevealFx>
			)}

			{/* Infinite Scroll Grid - Only after mounting */}
			<Column
				fillWidth
				paddingX='l'>
				<InfiniteScroll
					items={items}
					loadMore={loadMore}
					loading={loading}
					threshold={400}
					renderItem={(item, index) => {
						// For grid layout, we need to group items
						if (index === 0 || index % columns.desktop === 0) {
							const gridItems = items.slice(index, index + columns.desktop);
							return (
								<Grid
									key={`grid-${Math.floor(index / columns.desktop)}`}
									columns={columns.desktop as any}
									tabletColumns={columns.tablet as any}
									mobileColumns={columns.mobile as any}
									gap='48'
									fillWidth
									style={{ marginBottom: '48px' }}>
									{gridItems.map((gridItem, gridIndex) => (
										<ModernCaseStudyCard
											key={gridItem._id}
											caseStudy={gridItem}
											index={index + gridIndex}
											priority={index + gridIndex < 4}
										/>
									))}
								</Grid>
							);
						}
						return null;
					}}
				/>

				{/* Loading indicator */}
				{loading && (
					<RevealFx
						translateY={8}
						horizontal='center'
						delay={0.06}>
						<Column
							center
							paddingTop='32'>
							<Text
								variant='body-default-m'
								onBackground='neutral-medium'
								align='center'>
								Loading more case studies...
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* No more items message */}
				{!hasMore && items.length > 0 && (
					<RevealFx
						translateY={8}
						horizontal='center'
						delay={0.06}>
						<Column
							center
							paddingTop='32'>
							<Text
								variant='body-default-s'
								onBackground='neutral-weak'
								align='center'>
								You've reached the end of our case studies
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* No items found */}
				{items.length === 0 && !loading && (
					<RevealFx
						translateY={8}
						delay={0.06}>
						<Column
							fillWidth
							center
							padding='xl'
							gap='20'
							background='surface'
							border='neutral-alpha-weak'
							radius='xl'>
							<Text
								variant='heading-default-l'
								onBackground='neutral-strong'
								align='center'
								style={{ fontSize: '28px', fontWeight: '700' }}>
								No case studies found
							</Text>
							<Text
								variant='body-default-l'
								onBackground='neutral-medium'
								align='center'
								style={{
									maxWidth: '400px',
									fontSize: '16px',
									lineHeight: '1.6'
								}}>
								Check back later for new case studies.
							</Text>
						</Column>
					</RevealFx>
				)}
			</Column>
		</Column>
	);
}
