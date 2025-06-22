import {
	getFeaturedCaseStudies,
	getAllCaseStudies,
	getCaseStudiesPaginated
} from '@/lib/utils/content';
import { ModernProjectsClientWrapper } from './ModernProjectsClientWrapper';
import { InfiniteCaseStudyGrid } from './InfiniteCaseStudyGrid';

interface ModernProjectsProps {
	title?: string;
	description?: string;
	maxItems?: number;
	columns?: '1' | '2' | '3';
	useInfiniteScroll?: boolean;
}

export async function ModernProjects({
	title = 'Featured Projects',
	description,
	maxItems,
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

		return (
			<ModernProjectsClientWrapper
				caseStudies={caseStudies}
				title={title}
				description={description}
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
			<ModernProjectsClientWrapper
				caseStudies={[]}
				title={title}
				description={description}
				columns={columns}
				maxItems={maxItems}
			/>
		);
	}
}
