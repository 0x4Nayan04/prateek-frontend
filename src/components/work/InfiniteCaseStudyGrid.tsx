'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
	Column,
	Text,
	Heading,
	RevealFx,
	InfiniteScroll,
	Grid,
	Button,
	Row
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
				gap='16'>
				{/* Header */}
				{title && (
					<RevealFx
						translateY={6}
						delay={0.02}
						fillWidth
						horizontal='center'
						paddingBottom='8'>
						<Column
							horizontal='center'
							gap='8'>
							<Heading
								wrap='balance'
								variant='display-strong-l'
								align='center'
								style={{
									fontSize: 'clamp(2rem, 8vw, 3rem)',
									lineHeight: '1.2'
								}}>
								{title}
							</Heading>
						</Column>
					</RevealFx>
				)}

				{/* Main Content */}
				<Row
					fillWidth
					horizontal='center'>
					<Column
						fillWidth
						paddingX='l'>
						{/* Initial static grid for SSR */}
						<Column
							fillWidth
							paddingX='l'
							style={{
								paddingLeft: 'clamp(8px, 2vw, 48px)',
								paddingRight: 'clamp(8px, 2vw, 48px)'
							}}
							gap='s'>
							{initialCaseStudies.length > 0 ? (
								<Grid
									columns={columns.desktop as any}
									tabletColumns={columns.tablet as any}
									mobileColumns={columns.mobile as any}
									gap='64'
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
									radius='xl'
									style={{
										minHeight: '200px'
									}}>
									<Text
										variant='heading-strong-l'
										onBackground='neutral-strong'
										align='center'>
										Loading case studies...
									</Text>
								</Column>
							)}
						</Column>
					</Column>
				</Row>
			</Column>
		);
	}

	return (
		<Column
			fillWidth
			gap='16'>
			{/* Header */}
			{title && (
				<RevealFx
					translateY={6}
					delay={0.02}
					fillWidth
					horizontal='center'
					paddingBottom='8'>
					<Column
						horizontal='center'
						gap='8'>
						<Heading
							wrap='balance'
							variant='display-strong-l'
							align='center'
							style={{
								fontSize: 'clamp(2rem, 8vw, 3rem)',
								lineHeight: '1.2'
							}}>
							{title}
						</Heading>
					</Column>
				</RevealFx>
			)}

			{/* Main Content */}
			<Row
				fillWidth
				horizontal='center'>
				<Column
					fillWidth
					paddingX='l'>
					{/* Infinite Scroll Grid */}
					<Column
						fillWidth
						paddingX='l'
						style={{
							paddingLeft: 'clamp(8px, 2vw, 48px)',
							paddingRight: 'clamp(8px, 2vw, 48px)'
						}}
						gap='s'>
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
											gap='64'
											fillWidth
											style={{
												marginBottom:
													index + columns.desktop < items.length
														? '32px'
														: '0px'
											}}>
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
									paddingTop='16'>
									<Text
										variant='body-default-s'
										onBackground='neutral-weak'
										align='center'>
										Loading more...
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
									paddingTop='16'>
									<Text
										variant='body-default-s'
										onBackground='neutral-weak'
										align='center'
										style={{ fontSize: '0.8rem' }}>
										You&apos;ve reached the end
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
									radius='xl'
									style={{
										minHeight: '200px'
									}}>
									<Text
										variant='heading-strong-l'
										onBackground='neutral-strong'
										align='center'>
										No case studies found
									</Text>
									<Text
										variant='body-default-m'
										onBackground='neutral-weak'
										align='center'>
										Check back later for new case studies.
									</Text>
								</Column>
							</RevealFx>
						)}
					</Column>
				</Column>
			</Row>
		</Column>
	);
}
