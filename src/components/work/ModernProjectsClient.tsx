'use client';

import { useState, useMemo } from 'react';
import { CaseStudy, FilterState, AvailableFilters } from '@/lib/sanity/types';
import { ModernCaseStudyGrid } from './ModernCaseStudyGrid';

interface ModernProjectsClientProps {
	caseStudies: CaseStudy[];
	availableFilters: AvailableFilters | null;
	title?: string;
	description?: string;
	showFilters?: boolean;
	columns?: '1' | '2' | '3';
	maxItems?: number;
}

export function ModernProjectsClient({
	caseStudies,
	availableFilters,
	title = 'Highlighted Projects',
	description,
	showFilters = true,
	columns = '2',
	maxItems
}: ModernProjectsClientProps) {
	const [filters, setFilters] = useState<FilterState>({
		techStack: [],
		industry: []
	});

	// Filter case studies based on current filters
	const filteredCaseStudies = useMemo(() => {
		if (filters.techStack.length === 0 && filters.industry.length === 0) {
			return caseStudies;
		}

		return caseStudies.filter((caseStudy) => {
			const matchesTechStack =
				filters.techStack.length === 0 ||
				filters.techStack.some((tech) => caseStudy.techStack?.includes(tech));

			const matchesIndustry =
				filters.industry.length === 0 ||
				filters.industry.some((industry) =>
					caseStudy.industry?.includes(industry)
				);

			return matchesTechStack && matchesIndustry;
		});
	}, [caseStudies, filters]);

	// Convert columns string to object format expected by ModernCaseStudyGrid
	const columnsConfig = {
		desktop: parseInt(columns),
		tablet: parseInt(columns),
		mobile: 1
	};

	// Show "View All" button only if maxItems is specified (homepage usage)
	const showViewAllButton = maxItems !== undefined;

	return (
		<ModernCaseStudyGrid
			caseStudies={filteredCaseStudies}
			filters={filters}
			availableFilters={availableFilters}
			onFiltersChange={setFilters}
			showFilters={showFilters}
			title={title}
			description={description}
			maxItems={maxItems}
			showViewAllButton={showViewAllButton}
			columns={columnsConfig}
		/>
	);
}
 