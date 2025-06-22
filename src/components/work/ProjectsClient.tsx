'use client';

import { CaseStudy } from '@/lib/sanity/types';
import { CaseStudyGrid } from './CaseStudyGrid';

interface ProjectsClientProps {
	caseStudies: CaseStudy[];
}

export function ProjectsClient({ caseStudies }: ProjectsClientProps) {
	return (
		<CaseStudyGrid
			caseStudies={caseStudies}
			title='Case Studies'
			description='Explore data-driven solutions and strategic impact across various industries and technologies.'
			columns={{ desktop: 1, tablet: 1, mobile: 1 }}
		/>
	);
}
