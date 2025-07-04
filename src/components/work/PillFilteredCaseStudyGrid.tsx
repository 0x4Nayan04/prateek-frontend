'use client';

import { useMemo } from 'react';
import { Column, Grid, Heading, Text } from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { ModernCaseStudyCard } from './ModernCaseStudyCard';
import { PillFilterSystem } from './filters/PillFilterSystem';
import { useFilters } from '@/contexts/FilterContext';
import { filterCaseStudies } from '@/lib/utils/content';

interface PillFilteredCaseStudyGridProps {
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

export function PillFilteredCaseStudyGrid({
	caseStudies,
	title,
	description,
	maxItems,
	availableFilters,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: PillFilteredCaseStudyGridProps) {
	const { filters } = useFilters();

	// Filter the case studies based on current filters
	const filteredCaseStudies = useMemo(() => {
		const filtered = filterCaseStudies(caseStudies, filters);
		return maxItems ? filtered.slice(0, maxItems) : filtered;
	}, [caseStudies, filters, maxItems]);

	const hasResults = filteredCaseStudies.length > 0;

	return (
		<Column
			fillWidth
			gap='32'
			horizontal='center'>
			{/* Title */}
			{title && (
				<Heading
					variant='display-strong-l'
					align='center'
					onBackground='neutral-strong'
					style={{
						fontSize: 'clamp(2rem, 5vw, 3rem)',
						lineHeight: '1.2'
					}}>
					{title}
				</Heading>
			)}

			{/* Description */}
			{description && (
				<Text
					variant='body-default-l'
					onBackground='neutral-medium'
					align='center'
					style={{
						maxWidth: '600px',
						lineHeight: '1.6'
					}}>
					{description}
				</Text>
			)}

			{/* Pill Filter System */}
			<Column
				fillWidth
				horizontal='center'
				gap='24'
				paddingY='16'>
				<div
					style={{
						width: '100%',
						paddingLeft: 'clamp(20px, 5vw, 32px)',
						paddingRight: 'clamp(20px, 5vw, 32px)',
						maxWidth: '100%',
						boxSizing: 'border-box',
						display: 'flex',
						justifyContent: 'center'
					}}>
					<div
						style={{
							width: '100%',
							maxWidth:
								'1032px' /* 500px + 32px gap + 500px = 1032px for 2 cards + gap */,
							display: 'flex',
							justifyContent: 'center'
						}}>
						<PillFilterSystem availableFilters={availableFilters} />
					</div>
				</div>
			</Column>

			{/* Results */}
			<Column
				fillWidth
				gap='32'
				horizontal='center'>
				{/* Main Content with Balanced Padding */}
				<div
					style={{
						width: '100%',
						paddingLeft: 'clamp(20px, 5vw, 32px)',
						paddingRight: 'clamp(20px, 5vw, 32px)',
						maxWidth: '100%',
						boxSizing: 'border-box'
					}}>
					{/* Grid */}
					{hasResults ? (
						<Grid
							columns='2'
							tabletColumns='2'
							mobileColumns='1'
							gap='32'
							fillWidth
							style={{
								justifyItems: 'center',
								alignItems: 'stretch',
								paddingLeft: '0',
								paddingRight: '0',
								marginLeft: '0',
								marginRight: '0',
								maxWidth: '100%',
								boxSizing: 'border-box',
								gridAutoRows: '1fr'
							}}
							data-grid>
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
										priority={index < 4}
									/>
								</div>
							))}
						</Grid>
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
								Try selecting different filters to see more results.
							</Text>
						</Column>
					)}
				</div>
			</Column>
		</Column>
	);
}
