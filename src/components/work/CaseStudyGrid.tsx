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
import { FilterSidebar } from './FilterSidebar';
import { FilterDropdown } from './FilterDropdown';

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
			{/* Header */}
			{(title || description) && (
				<RevealFx
					translateY={12}
					delay={0.1}>
					<Column
						gap='16'
						maxWidth='xs'>
						{title && (
							<Heading
								variant='display-strong-s'
								onBackground='neutral-strong'>
								{title}
							</Heading>
						)}
						{description && (
							<Text
								variant='body-default-m'
								onBackground='neutral-medium'>
								{description}
							</Text>
						)}
					</Column>
				</RevealFx>
			)}

			{/* Filters and Results */}
			{showFilters && (
				<RevealFx
					translateY={12}
					delay={0.2}>
					<Row
						horizontal='space-between'
						vertical='center'
						wrap>
						{/* Mobile Filter Dropdown */}
						<FilterDropdown
							filters={filters}
							availableFilters={availableFilters}
							onFiltersChange={onFiltersChange}
							className='show-s'
						/>

						{/* Results Counter */}
						<Text
							variant='body-default-s'
							onBackground='neutral-weak'>
							{hasResults ? (
								<>
									Showing {displayedCaseStudies.length}
									{maxItems && totalResults > maxItems && ` of ${totalResults}`}
									case {displayedCaseStudies.length === 1 ? 'study' : 'studies'}
								</>
							) : (
								'No case studies found'
							)}
						</Text>
					</Row>
				</RevealFx>
			)}

			{/* Main Content */}
			<Row
				gap='32'
				fillWidth>
				{/* Desktop Sidebar Filters */}
				{showFilters && (
					<FilterSidebar
						filters={filters}
						availableFilters={availableFilters}
						onFiltersChange={onFiltersChange}
						className='hide-s'
					/>
				)}

				{/* Case Studies Grid */}
				<Column
					flex={1}
					gap='24'>
					{hasResults ? (
						<Grid
							columns={columns.desktop as any}
							tabletColumns={columns.tablet as any}
							mobileColumns={columns.mobile as any}
							gap='24'>
							{displayedCaseStudies.map((caseStudy, index) => (
								<CaseStudyCard
									key={caseStudy._id}
									caseStudy={caseStudy}
									index={index}
									priority={index < 4}
								/>
							))}
						</Grid>
					) : (
						<RevealFx
							translateY={16}
							delay={0.3}>
							<Column
								fillWidth
								center
								padding='48'
								gap='16'
								background='surface'
								border='neutral-alpha-weak'
								radius='l'>
								<Text
									variant='heading-default-m'
									onBackground='neutral-strong'
									align='center'>
									No case studies found
								</Text>
								<Text
									variant='body-default-m'
									onBackground='neutral-medium'
									align='center'
									style={{ maxWidth: '400px' }}>
									Try adjusting your filters or check back later for new case
									studies.
								</Text>
							</Column>
						</RevealFx>
					)}
				</Column>
			</Row>
		</Column>
	);
}
