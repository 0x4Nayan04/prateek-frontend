import { getAllCaseStudies } from '@/lib/utils/content';
import { ModernProjectsClient } from './ModernProjectsClient';

interface ProjectsProps {
	range?: [number, number?];
	maxItems?: number;
	title?: string;
	description?: string;
	columns?: '1' | '2' | '3';
}

export async function Projects({
	range,
	maxItems,
	title,
	description,
	columns = '2'
}: ProjectsProps) {
	const allCaseStudies = await getAllCaseStudies();

	// Case studies are already sorted by _createdAt desc in the query
	const displayedCaseStudies = range
		? allCaseStudies.slice(range[0] - 1, range[1] ?? allCaseStudies.length)
		: allCaseStudies;

	return (
		<ModernProjectsClient
			caseStudies={displayedCaseStudies}
			maxItems={maxItems}
			title={title}
			description={description}
			columns={columns}
		/>
	);
}
