import {
	getFeaturedCaseStudies,
	getAllCaseStudies,
	getAvailableFilters
} from '@/lib/utils/content';
import { ModernProjectsClientWrapper } from './ModernProjectsClientWrapper';

interface ModernProjectsProps {
	title?: string;
	description?: string;
	maxItems?: number;
	columns?: '1' | '2' | '3';
	enableFilters?: boolean;
}

export async function ModernProjects({
	title = 'Featured Projects',
	description,
	maxItems,
	columns = '2',
	enableFilters = false
}: ModernProjectsProps) {
	try {
		// Get case studies based on maxItems
		const caseStudies = maxItems
			? await getFeaturedCaseStudies(maxItems)
			: await getAllCaseStudies();

		// Get available filters if filtering is enabled
		const availableFilters = enableFilters
			? await getAvailableFilters()
			: { techStack: [], industry: [] };

		return (
			<ModernProjectsClientWrapper
				caseStudies={caseStudies}
				title={title}
				description={description}
				columns={columns}
				maxItems={maxItems}
				enableFilters={enableFilters}
				availableFilters={availableFilters}
			/>
		);
	} catch (error) {
		console.error('Error fetching case studies:', error);

		return (
			<ModernProjectsClientWrapper
				caseStudies={[]}
				title={title}
				description={description}
				columns={columns}
				maxItems={maxItems}
				enableFilters={enableFilters}
				availableFilters={{ techStack: [], industry: [] }}
			/>
		);
	}
}
