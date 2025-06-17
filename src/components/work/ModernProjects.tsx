import {
	getFeaturedCaseStudies,
	getAllCaseStudies,
	getAvailableFilters
} from '@/lib/utils/content';
import { ModernProjectsClient } from './ModernProjectsClient';

interface ModernProjectsProps {
	title?: string;
	description?: string;
	maxItems?: number;
	showFilters?: boolean;
	columns?: '1' | '2' | '3';
}

export async function ModernProjects({
	title = 'Featured Projects',
	description,
	maxItems,
	showFilters = false,
	columns = '2'
}: ModernProjectsProps) {
	try {
		const caseStudies = maxItems
			? await getFeaturedCaseStudies(maxItems)
			: await getAllCaseStudies();
		const availableFilters = showFilters ? await getAvailableFilters() : null;

		return (
			<ModernProjectsClient
				caseStudies={caseStudies}
				availableFilters={availableFilters}
				title={title}
				description={description}
				showFilters={showFilters}
				columns={columns}
				maxItems={maxItems}
			/>
		);
	} catch (error) {
		console.error('Error fetching case studies:', error);
		return (
			<ModernProjectsClient
				caseStudies={[]}
				availableFilters={null}
				title={title}
				description={description}
				showFilters={showFilters}
				columns={columns}
				maxItems={maxItems}
			/>
		);
	}
}
