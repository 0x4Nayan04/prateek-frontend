'use client';

import {
	Column,
	Row,
	Grid,
	Text,
	Heading,
	RevealFx
} from '@once-ui-system/core';
import { CaseStudy, FilterState, AvailableFilters } from '@/lib/sanity/types';
import { CaseStudyCard } from './CaseStudyCard';

interface CaseStudyGridProps {
	caseStudies: CaseStudy[];
	filters: FilterState;
	availableFilters: AvailableFilters;
	onFiltersChange: (filters: FilterState) => void;
	showFilters?: boolean;
	title?: string;
	description?: string;
	maxItems?: number;
	columns?: {
		desktop: number;
		tablet: number;
		mobile: number;
	};
}

export function CaseStudyGrid({
	caseStudies,
	filters,
	availableFilters,
	onFiltersChange,
	showFilters = true,
	title,
	description,
	maxItems,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: CaseStudyGridProps) {
	const displayedCaseStudies = maxItems
		? caseStudies.slice(0, maxItems)
		: caseStudies;

	const hasResults = displayedCaseStudies.length > 0;
	const totalResults = caseStudies.length;

	return (
		<Column
			fillWidth
			gap='32'>
			{/* Title and Filters */}
					<Column
				fillWidth
				gap='24'>
				{/* Title */}
						{title && (
					<RevealFx
						translateY={6}
						delay={0.02}>
							<Heading
							variant='display-strong-l'
							align='center'
								onBackground='neutral-strong'>
								{title}
							</Heading>
				</RevealFx>
			)}

				{/* Filters - Removed as showFilters is always false */}
			{showFilters && (
				<RevealFx
						translateY={6}
						delay={0.04}>
						<Text
							variant='body-default-s'
							onBackground='neutral-medium'
							align='center'>
							Filters would appear here
						</Text>
				</RevealFx>
			)}
			</Column>

			{/* Results */}
			<Column
				fillWidth
				gap='32'>
				{/* Results Info */}
				{(filters.techStack.length > 0 || filters.industry.length > 0) && (
					<Text
						variant='body-default-s'
						onBackground='neutral-medium'
						align='center'>
						Showing {displayedCaseStudies.length} of {caseStudies.length} case
						studies
					</Text>
				)}

				{/* Grid */}
				{displayedCaseStudies.length > 0 ? (
					<RevealFx
						translateY={8}
						delay={0.06}>
						<Grid
							columns='2'
							tabletColumns='2'
							mobileColumns='1'
							gap='24'
							fillWidth>
							{displayedCaseStudies.map((caseStudy, index) => (
								<CaseStudyCard
									key={caseStudy._id}
									caseStudy={caseStudy}
									index={index}
								/>
							))}
						</Grid>
					</RevealFx>
				) : (
								<Text
									variant='body-default-m'
									onBackground='neutral-medium'
						align='center'>
						No case studies match the selected filters.
								</Text>
					)}
				</Column>
		</Column>
	);
}
