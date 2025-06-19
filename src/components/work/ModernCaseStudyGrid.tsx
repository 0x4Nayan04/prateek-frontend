'use client';

import {
	Column,
	Row,
	Grid,
	Text,
	Heading,
	RevealFx,
	Button,
	InfiniteScroll
} from '@once-ui-system/core';
import { CaseStudy, FilterState, AvailableFilters } from '@/lib/sanity/types';
import { ModernCaseStudyCard } from './ModernCaseStudyCard';
import { FilterSidebar } from './FilterSidebar';
import { FilterDropdown } from './FilterDropdown';
import { useState, useCallback } from 'react';

interface ModernCaseStudyGridProps {
	caseStudies: CaseStudy[];
	filters: FilterState;
	availableFilters: AvailableFilters | null;
	onFiltersChange: (filters: FilterState) => void;
	showFilters?: boolean;
	title?: string;
	description?: string;
	maxItems?: number;
	showViewAllButton?: boolean;
	columns?: {
		desktop: number;
		tablet: number;
		mobile: number;
	};
}

export function ModernCaseStudyGrid({
	caseStudies,
	filters,
	availableFilters,
	onFiltersChange,
	showFilters = true,
	title,
	description,
	maxItems,
	showViewAllButton = false,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: ModernCaseStudyGridProps) {
	const displayedCaseStudies = maxItems
		? caseStudies.slice(0, maxItems)
		: caseStudies;

	const hasResults = displayedCaseStudies.length > 0;
	const totalResults = caseStudies.length;
	const hasMoreResults = maxItems && totalResults > maxItems;

	// Only show filters if we have available filters data
	const shouldShowFilters = showFilters && availableFilters;

	return (
		<Column
			fillWidth
			gap='40'>
			{/* Title Section */}
			<RevealFx
				translateY={6}
				delay={0.02}
				fillWidth
				horizontal='center'
				paddingBottom='16'>
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

			{/* Description Section */}
			<RevealFx
				translateY={6}
				delay={0.04}>
				<Column gap='24'>
					<Text
						variant='body-default-l'
						onBackground='neutral-medium'
						align='center'
						style={{
							maxWidth: '600px',
							margin: '0 auto',
							lineHeight: '1.6'
						}}>
						{description}
					</Text>
				</Column>
			</RevealFx>

			{/* Filters and Results */}
			{shouldShowFilters && (
				<RevealFx
					translateY={6}
					delay={0.04}>
					<Column
						paddingX='l'
						gap='m'>
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
										{maxItems &&
											totalResults > maxItems &&
											` of ${totalResults}`}
										case{' '}
										{displayedCaseStudies.length === 1 ? 'study' : 'studies'}
									</>
								) : (
									'No case studies found'
								)}
							</Text>
						</Row>
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
					{/* Desktop Sidebar Filters */}
					{shouldShowFilters && (
						<Row
							fillWidth
							gap='40'
							style={{ alignItems: 'flex-start' }}>
							<FilterSidebar
								filters={filters}
								availableFilters={availableFilters}
								onFiltersChange={onFiltersChange}
								className='hide-s'
							/>

							{/* Case Studies Grid with Sidebar */}
							<Column
								flex={1}
								gap='s'
								fillWidth>
								{hasResults ? (
									<>
										<Grid
											columns={columns.desktop as any}
											tabletColumns={columns.tablet as any}
											mobileColumns={1}
											gap='48'
											fillWidth>
											{displayedCaseStudies.map((caseStudy, index) => (
												<ModernCaseStudyCard
													key={caseStudy._id}
													caseStudy={caseStudy}
													index={index}
													priority={index < 4}
												/>
											))}
										</Grid>

										{/* View All Button for Homepage */}
										{(showViewAllButton || hasMoreResults) && (
											<RevealFx
												translateY={8}
												horizontal='center'
												delay={0.08}>
												<Column
													center
													paddingTop='32'>
													<Button
														id='view-all-case-studies'
														href='/work'
														variant='primary'
														size='l'
														arrowIcon>
														Show more case studies
														{hasMoreResults &&
															` (${totalResults - displayedCaseStudies.length} more)`}
													</Button>
												</Column>
											</RevealFx>
										)}
									</>
								) : (
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
												Try adjusting your filters to see more results.
											</Text>
										</Column>
									</RevealFx>
								)}
							</Column>
						</Row>
					)}

					{/* No Sidebar - Full Width Grid */}
					{!shouldShowFilters && (
						<Column
							fillWidth
							gap='s'>
							{hasResults ? (
								<>
									<Grid
										columns={columns.desktop as any}
										tabletColumns={columns.tablet as any}
										mobileColumns={1}
										gap='48'
										fillWidth>
										{displayedCaseStudies.map((caseStudy, index) => (
											<ModernCaseStudyCard
												key={caseStudy._id}
												caseStudy={caseStudy}
												index={index}
												priority={index < 4}
											/>
										))}
									</Grid>

									{/* View All Button for Homepage */}
									{(showViewAllButton || hasMoreResults) && (
										<RevealFx
											translateY={8}
											horizontal='center'
											delay={0.08}>
											<Column
												center
												paddingTop='32'>
												<Button
													id='view-all-case-studies'
													href='/work'
													variant='primary'
													size='l'
													arrowIcon>
													Show more case studies
													{hasMoreResults &&
														` (${totalResults - displayedCaseStudies.length} more)`}
												</Button>
											</Column>
										</RevealFx>
									)}
								</>
							) : (
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
											Try adjusting your filters to see more results.
										</Text>
									</Column>
								</RevealFx>
							)}
						</Column>
					)}
				</Column>
			</Row>
		</Column>
	);
}
