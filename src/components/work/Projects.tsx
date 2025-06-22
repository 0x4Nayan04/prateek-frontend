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

	const sortedCaseStudies = allCaseStudies.sort((a, b) => {
		return a.priority - b.priority; // Lower priority number = higher priority
	});

	const displayedCaseStudies = range
		? sortedCaseStudies.slice(
				range[0] - 1,
				range[1] ?? sortedCaseStudies.length
			)
		: sortedCaseStudies;

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
