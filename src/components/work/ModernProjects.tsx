import {
	getFeaturedCaseStudies,
	getAllCaseStudies,
	getCaseStudiesPaginated,
	getAvailableFilters
} from '@/lib/utils/content';
import { ModernProjectsClientWrapper } from './ModernProjectsClientWrapper';
import { InfiniteCaseStudyGrid } from './InfiniteCaseStudyGrid';

interface ModernProjectsProps {
	title?: string;
	description?: string;
	maxItems?: number;
	columns?: '1' | '2' | '3';
	useInfiniteScroll?: boolean;
	enableFilters?: boolean;
}

export async function ModernProjects({
	title = 'Featured Projects',
	description,
	maxItems,
	columns = '2',
	useInfiniteScroll = false,
	enableFilters = false
}: ModernProjectsProps) {
	try {
		// For infinite scroll, get initial batch
		if (useInfiniteScroll && !maxItems) {
			const initialData = await getCaseStudiesPaginated(0, 6);
			const columnsConfig = {
				desktop: parseInt(columns),
				tablet: parseInt(columns),
				mobile: 1
			};

			return (
				<InfiniteCaseStudyGrid
					title={title}
					initialCaseStudies={initialData.caseStudies}
					itemsPerPage={6}
					columns={columnsConfig}
				/>
			);
		}

		// For homepage with maxItems or non-infinite scroll
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

		// Return empty infinite scroll or regular component based on useInfiniteScroll
		if (useInfiniteScroll && !maxItems) {
			const columnsConfig = {
				desktop: parseInt(columns),
				tablet: parseInt(columns),
				mobile: 1
			};

			return (
				<InfiniteCaseStudyGrid
					title={title}
					initialCaseStudies={[]}
					itemsPerPage={6}
					columns={columnsConfig}
				/>
			);
		}

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
