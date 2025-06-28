'use client';

import { useMemo } from 'react';
import { Column, Grid, Heading, Text } from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { ModernCaseStudyCard } from './ModernCaseStudyCard';
import { FilterSystem } from './filters';
import { useFilters } from '@/contexts/FilterContext';
import { filterCaseStudies } from '@/lib/utils/content';

interface FilteredCaseStudyGridProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	maxItems?: number;
	availableFilters: {
		techStack: string[];
		industry: string[];
	};
	columns?: {
		desktop: number;
		tablet: number;
		mobile: number;
	};
}

export function FilteredCaseStudyGrid({
	caseStudies,
	title,
	description,
	maxItems,
	availableFilters,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: FilteredCaseStudyGridProps) {
	const { filters } = useFilters();

	// Filter the case studies based on current filters
	const filteredCaseStudies = useMemo(() => {
		const filtered = filterCaseStudies(caseStudies, filters);
		return maxItems ? filtered.slice(0, maxItems) : filtered;
	}, [caseStudies, filters, maxItems]);

	const hasResults = filteredCaseStudies.length > 0;
	const totalResults = filteredCaseStudies.length;

	return (
		<Column
			fillWidth
			gap='24'
			horizontal='center'>
			{/* Title */}
			{title && (
				<Heading
					variant='display-strong-l'
					align='center'
					onBackground='neutral-strong'>
					{title}
				</Heading>
			)}

			{/* Filter System */}
			<Column
				fillWidth
				horizontal='center'
				gap='16'>
				<FilterSystem availableFilters={availableFilters} />
			</Column>

			{/* Results */}
			<Column
				fillWidth
				gap='24'
				horizontal='center'>
				{/* Grid */}
				{hasResults ? (
					<Grid
						columns='2'
						tabletColumns='2'
						mobileColumns='1'
						gap='4'
						fillWidth
						maxWidth='l'
						style={{
							justifyItems: 'center'
						}}>
						{filteredCaseStudies.map((caseStudy, index) => (
							<div
								key={caseStudy._id}
								style={{
									maxWidth: '400px',
									width: '100%',
									marginBottom: '16px'
								}}>
								<ModernCaseStudyCard
									caseStudy={caseStudy}
									index={index}
								/>
							</div>
						))}
					</Grid>
				) : (
					<Column
						gap='16'
						horizontal='center'
						style={{
							padding: '48px 24px',
							textAlign: 'center'
						}}>
						<Text
							variant='heading-strong-m'
							onBackground='neutral-strong'>
							No case studies found
						</Text>
						<Text
							variant='body-default-m'
							onBackground='neutral-medium'
							style={{ maxWidth: '400px' }}>
							Try adjusting your filters or clear all filters to see more
							results.
						</Text>
					</Column>
				)}
			</Column>
		</Column>
	);
}
