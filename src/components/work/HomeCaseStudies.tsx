'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
	Column,
	Text,
	Heading,
	RevealFx,
	InfiniteScroll,
	Grid,
	Row
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { ModernCaseStudyCard } from './ModernCaseStudyCard';
import { getCaseStudiesPaginated } from '@/lib/utils/content';

interface HomeCaseStudiesProps {
	initialCaseStudies: CaseStudy[];
	itemsPerPage?: number;
}

export function HomeCaseStudies({
	initialCaseStudies,
	itemsPerPage = 6
}: HomeCaseStudiesProps) {
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

	// Don't render until mounted to avoid hydration issues
	if (!mounted) {
		return (
			<Grid
				columns='2'
				tabletColumns='2'
				mobileColumns='1'
				gap='64'
				fillWidth>
				{initialCaseStudies.map((caseStudy, index) => (
					<ModernCaseStudyCard
						key={caseStudy._id}
						caseStudy={caseStudy}
						index={index}
					/>
				))}
			</Grid>
		);
	}

	return (
		<Column
			fillWidth
			gap='16'>
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
								if (index === 0 || index % 2 === 0) {
									const gridItems = items.slice(index, index + 2);
									return (
										<Grid
											key={`grid-${Math.floor(index / 2)}`}
											columns='2'
											tabletColumns='2'
											mobileColumns='1'
											gap='64'
											fillWidth
											style={{
												marginBottom: index + 2 < items.length ? '32px' : '0px'
											}}>
											{gridItems.map((gridItem, gridIndex) => (
												<ModernCaseStudyCard
													key={gridItem._id}
													caseStudy={gridItem}
													index={index + gridIndex}
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
