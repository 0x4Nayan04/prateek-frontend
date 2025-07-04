'use client';

import { Suspense } from 'react';
import { ModernProjectsClient } from './ModernProjectsClient';
import { PillFilteredCaseStudyGrid } from './PillFilteredCaseStudyGrid';
import { CaseStudy } from '@/lib/sanity/types';
import { Column, Text } from '@once-ui-system/core';
import { FilterProvider } from '@/contexts/FilterContext';

interface ModernProjectsClientWrapperProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	columns?: '1' | '2' | '3';
	maxItems?: number;
	enableFilters?: boolean;
	availableFilters?: {
		techStack: string[];
		industry: string[];
	};
}

function LoadingFallback() {
	return (
		<Column
			fillWidth
			horizontal='center'
			paddingY='32'>
			<Text
				variant='body-default-m'
				onBackground='neutral-medium'>
				Loading case studies...
			</Text>
		</Column>
	);
}

export function ModernProjectsClientWrapper({
	enableFilters = false,
	availableFilters = { techStack: [], industry: [] },
	...props
}: ModernProjectsClientWrapperProps) {
	// Always render the same structure to avoid hydration issues
	if (enableFilters) {
		return (
			<FilterProvider>
				<Suspense fallback={<LoadingFallback />}>
					<PillFilteredCaseStudyGrid
						caseStudies={props.caseStudies}
						title={props.title}
						description={props.description}
						maxItems={props.maxItems}
						availableFilters={availableFilters}
						columns={{
							desktop: parseInt(props.columns || '2'),
							tablet: parseInt(props.columns || '2'),
							mobile: 1
						}}
					/>
				</Suspense>
			</FilterProvider>
		);
	}

	// Default behavior without filters
	return (
		<Suspense fallback={<LoadingFallback />}>
			<ModernProjectsClient {...props} />
		</Suspense>
	);
}
