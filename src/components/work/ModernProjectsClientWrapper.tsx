'use client';

import { Suspense, useEffect, useState } from 'react';
import { ModernProjectsClient } from './ModernProjectsClient';
import { FilteredCaseStudyGrid } from './FilteredCaseStudyGrid';
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
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// If filters are enabled and we're on the client, wrap with FilterProvider and use FilteredCaseStudyGrid
	if (enableFilters && isClient) {
		return (
			<FilterProvider>
				<Suspense fallback={<LoadingFallback />}>
					<FilteredCaseStudyGrid
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

	// Default behavior without filters or during SSR
	return (
		<Suspense fallback={<LoadingFallback />}>
			<ModernProjectsClient {...props} />
		</Suspense>
	);
}
