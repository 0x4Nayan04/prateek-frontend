'use client';

import { Suspense } from 'react';
import { ModernProjectsClient } from './ModernProjectsClient';
import { CaseStudy } from '@/lib/sanity/types';
import { Column, Text } from '@once-ui-system/core';

interface ModernProjectsClientWrapperProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	columns?: '1' | '2' | '3';
	maxItems?: number;
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

export function ModernProjectsClientWrapper(
	props: ModernProjectsClientWrapperProps
) {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<ModernProjectsClient {...props} />
		</Suspense>
	);
}
