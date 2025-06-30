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
			gap='s'
			horizontal='center'
			paddingY='1'>
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
				gap='s'
				paddingY='1'>
				<FilterSystem availableFilters={availableFilters} />
			</Column>

			{/* Results */}
			<Column
				fillWidth
				gap='l'
				horizontal='center'
				maxWidth='xl'
				paddingTop='0'>
				{/* Grid */}
				{hasResults ? (
					<Column
						fillWidth
						paddingTop='m'>
						<Grid
							columns='2'
							tabletColumns='2'
							mobileColumns='1'
							gap='64'
							fillWidth
							style={{
								justifyItems: 'center',
								alignItems: 'stretch',
								paddingLeft: 'clamp(16px, 3vw, 32px)',
								paddingRight: 'clamp(16px, 3vw, 32px)',
								gridAutoRows: '1fr'
							}}>
							{filteredCaseStudies.map((caseStudy, index) => (
								<div
									key={caseStudy._id}
									style={{
										width: '100%',
										maxWidth: '500px',
										display: 'flex',
										flexDirection: 'column',
										height: '100%'
									}}>
									<ModernCaseStudyCard
										caseStudy={caseStudy}
										index={index}
									/>
								</div>
							))}
						</Grid>
					</Column>
				) : (
					<Column
						gap='24'
						horizontal='center'
						paddingY='xl'
						style={{
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
