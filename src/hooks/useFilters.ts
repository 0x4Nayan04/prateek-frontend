'use client';

import { useState, useMemo } from 'react';
import { CaseStudy, FilterState } from '@/lib/sanity/types';

export function useFilters(caseStudies: CaseStudy[]) {
	const [filters, setFilters] = useState<FilterState>({
		techStack: [],
		industry: []
	});

	// Get available filter options from case studies
	const availableFilters = useMemo(() => {
		const techStackSet = new Set<string>();
		const industrySet = new Set<string>();

		caseStudies.forEach((caseStudy) => {
			caseStudy.techStack?.forEach((tech) => techStackSet.add(tech));
			caseStudy.industry?.forEach((industry) => industrySet.add(industry));
		});

		return {
			techStack: Array.from(techStackSet).sort(),
			industry: Array.from(industrySet).sort()
		};
	}, [caseStudies]);

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

	const clearFilters = () => {
		setFilters({ techStack: [], industry: [] });
	};

	const hasActiveFilters =
		filters.techStack.length > 0 || filters.industry.length > 0;

	return {
		filters,
		setFilters,
		availableFilters,
		filteredCaseStudies,
		clearFilters,
		hasActiveFilters,
		totalResults: filteredCaseStudies.length,
		totalCaseStudies: caseStudies.length
	};
}
