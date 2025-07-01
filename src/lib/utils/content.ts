import { client } from '@/lib/sanity/client';
import {
	CASE_STUDIES_ALL_QUERY,
	AVAILABLE_FILTERS_QUERY
} from '@/lib/sanity/queries';
import { CaseStudy } from '@/lib/sanity/types';

export async function getAllCaseStudies() {
	try {
		// Get all Sanity case studies
		const caseStudies: CaseStudy[] = await client.fetch(CASE_STUDIES_ALL_QUERY);
		return caseStudies;
	} catch (error) {
		console.error('Error fetching case studies:', error);
		return [];
	}
}

export async function getFeaturedCaseStudies(limit: number = 6) {
	try {
		// Use the homepage query but limit the results - back to original without metadata
		const caseStudies: CaseStudy[] = await client.fetch(
			`*[_type == "caseStudy"] | order(priority asc) [0...${limit}] {
				_id,
				title,
				slug,
				summary,
				thumbnail,
				images,
				techStack,
				industry,
				priority
			}`
		);
		return caseStudies;
	} catch (error) {
		console.error('Error fetching featured case studies:', error);
		return [];
	}
}

export async function getCaseStudyBySlug(slug: string) {
	try {
		const caseStudy: CaseStudy = await client.fetch(
			`*[_type == "caseStudy" && slug.current == $slug][0] {
				_id,
				title,
				slug,
				summary,
				thumbnail {
					...,
					asset-> {
						...,
						metadata { dimensions }
					}
				},
				images[] {
					...,
					asset-> {
						...,
						metadata { dimensions }
					}
				},
				techStack,
				industry,
				priority,
				clientOverview,
				problem,
				approach,
				solution,
				result,
				iframePreview,
				pdfFile,
				externalLinks
			}`,
			{ slug }
		);
		return caseStudy;
	} catch (error) {
		console.error('Error fetching case study:', error);
		return null;
	}
}

// New function to get available filters
export async function getAvailableFilters() {
	try {
		const filters = await client.fetch(AVAILABLE_FILTERS_QUERY);
		const cleanArray = (arr: string[] = []) => {
			const cleaned = arr
				.map((item) => (typeof item === 'string' ? item.trim() : ''))
				.filter((item) => item.length > 0);
			return Array.from(new Set(cleaned));
		};

		return {
			techStack: cleanArray(filters.techStack),
			industry: cleanArray(filters.industry)
		};
	} catch (error) {
		console.error('Error fetching available filters:', error);
		return {
			techStack: [],
			industry: []
		};
	}
}

// New function to filter case studies
export function filterCaseStudies(
	caseStudies: CaseStudy[],
	filters: {
		techStack: string[];
		industry: string[];
	}
): CaseStudy[] {
	if (filters.techStack.length === 0 && filters.industry.length === 0) {
		return caseStudies;
	}

	return caseStudies.filter((caseStudy) => {
		// Check if any of the selected tech stack filters match
		const techStackMatch =
			filters.techStack.length === 0 ||
			filters.techStack.some(
				(tech) => caseStudy.techStack?.includes(tech) ?? false
			);

		// Check if any of the selected industry filters match
		const industryMatch =
			filters.industry.length === 0 ||
			filters.industry.some(
				(industry) => caseStudy.industry?.includes(industry) ?? false
			);

		// Return true if both conditions are met (OR logic for multiple selections within same category, AND logic between categories)
		return techStackMatch && industryMatch;
	});
}
