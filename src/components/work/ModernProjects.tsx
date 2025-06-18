import {
	getFeaturedCaseStudies,
	getAllCaseStudies,
	getAvailableFilters,
	getCaseStudiesPaginated
} from '@/lib/utils/content';
import { ModernProjectsClient } from './ModernProjectsClient';
import { InfiniteCaseStudyGrid } from './InfiniteCaseStudyGrid';

interface ModernProjectsProps {
	title?: string;
	description?: string;
	maxItems?: number;
	showFilters?: boolean;
	columns?: '1' | '2' | '3';
	useInfiniteScroll?: boolean;
}

export async function ModernProjects({
	title = 'Featured Projects',
	description,
	maxItems,
	showFilters = false,
	columns = '2',
	useInfiniteScroll = false
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
