'use client';

import { useState, useCallback, useEffect } from 'react';
import {
	Column,
	Text,
	Heading,
	RevealFx,
	InfiniteScroll,
	Grid
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

	const loadMore = useCallback(async () => {
		if (loading) return false;

		setLoading(true);

		try {
			const result = await getCaseStudiesPaginated(offset, itemsPerPage);

			if (result.caseStudies.length > 0) {
				setItems((prev) => [...prev, ...result.caseStudies]);
				setOffset((prev) => prev + result.caseStudies.length);
				setHasMore(result.hasMore);
				return result.hasMore;
			} else {
				setHasMore(false);
				return false;
			}
		} catch (error) {
			console.error('Error loading more case studies:', error);
			setHasMore(false);
			return false;
		} finally {
			setLoading(false);
		}
	}, [offset, itemsPerPage, loading]);

	// Initialize hasMore state based on initial data
	useEffect(() => {
		if (initialCaseStudies.length < itemsPerPage) {
			setHasMore(false);
		}
	}, [initialCaseStudies.length, itemsPerPage]);

	const renderCaseStudyItem = (caseStudy: CaseStudy, index: number) => (
		<ModernCaseStudyCard
			key={caseStudy._id}
			caseStudy={caseStudy}
			index={index}
			priority={index < 4}
		/>
	);

	const renderGrid = (items: CaseStudy[]) => {
		// Create chunks for grid layout
		const chunks: CaseStudy[][] = [];
		for (let i = 0; i < items.length; i += columns.desktop) {
			chunks.push(items.slice(i, i + columns.desktop));
		}

		return (
			<Column
				gap='48'
				fillWidth>
				{chunks.map((chunk, chunkIndex) => (
					<Grid
						key={chunkIndex}
						columns={columns.desktop as any}
						tabletColumns={columns.tablet as any}
						mobileColumns={columns.mobile as any}
						gap='48'
						fillWidth>
						{chunk.map((caseStudy, index) =>
							renderCaseStudyItem(
								caseStudy,
								chunkIndex * columns.desktop + index
							)
						)}
					</Grid>
				))}
			</Column>
		);
	};

	return (
		<Column
			fillWidth
			gap='40'>
			{/* Header */}
			{title && (
				<RevealFx
					translateY={12}
					delay={0.1}
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

			{/* Infinite Scroll Grid */}
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
						translateY={16}
						horizontal='center'
						delay={0.1}>
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
						translateY={16}
						horizontal='center'
						delay={0.1}>
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
						translateY={16}
						delay={0.3}>
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
