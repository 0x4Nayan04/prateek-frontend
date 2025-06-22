import { client } from '@/lib/sanity/client';
import { CASE_STUDIES_ALL_QUERY } from '@/lib/sanity/queries';
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

export async function getCaseStudiesPaginated(
	offset: number = 0,
	limit: number = 6
) {
	try {
		const caseStudies: CaseStudy[] = await client.fetch(
			`*[_type == "caseStudy"] | order(priority asc) [${offset}...${
				offset + limit
			}] {
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

		// Get total count for pagination
		const totalCount: number = await client.fetch(
			`count(*[_type == "caseStudy"])`
		);

		return {
			caseStudies,
			totalCount,
			hasMore: offset + limit < totalCount
		};
	} catch (error) {
		console.error('Error fetching paginated case studies:', error);
		return {
			caseStudies: [],
			totalCount: 0,
			hasMore: false
		};
	}
}
