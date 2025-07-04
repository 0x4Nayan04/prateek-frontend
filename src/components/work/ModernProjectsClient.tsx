'use client';

import { CaseStudy } from '@/lib/sanity/types';
import { ModernCaseStudyGrid } from './ModernCaseStudyGrid';

interface ModernProjectsClientProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	columns?: '1' | '2' | '3';
	maxItems?: number;
}

export function ModernProjectsClient({
	caseStudies,
	title = 'Highlighted Projects',
	description,
	columns = '2',
	maxItems
}: ModernProjectsClientProps) {
	// Convert columns string to object format expected by ModernCaseStudyGrid
	const columnsConfig = {
		desktop: parseInt(columns),
		tablet: parseInt(columns),
		mobile: 1
	};

	// Don't show "View All" button since we show all case studies by default
	const showViewAllButton = false;

	return (
		<ModernCaseStudyGrid
			caseStudies={caseStudies}
			title={title}
			description={description}
			maxItems={maxItems}
			showViewAllButton={showViewAllButton}
			columns={columnsConfig}
		/>
	);
}
