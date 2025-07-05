'use client';

import { Suspense, useEffect, useState } from 'react';
import { ModernProjectsClientWrapper } from './ModernProjectsClientWrapper';
import { CaseStudy } from '@/lib/sanity/types';
import { Column, Text } from '@once-ui-system/core';

interface ClientOnlyFilteredProjectsProps {
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

export function ClientOnlyFilteredProjects(
	props: ClientOnlyFilteredProjectsProps
) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <LoadingFallback />;
	}

	return (
		<Suspense fallback={<LoadingFallback />}>
			<ModernProjectsClientWrapper {...props} />
		</Suspense>
	);
}
