import { getCaseStudiesPaginated } from '@/lib/utils/content';
import { HomeCaseStudies } from './HomeCaseStudies';

export async function HomeCaseStudiesWrapper() {
	try {
		// Get initial 6 case studies
		const initialData = await getCaseStudiesPaginated(0, 6);

		return (
			<HomeCaseStudies
				initialCaseStudies={initialData.caseStudies}
				itemsPerPage={6}
			/>
		);
	} catch (error) {
		console.error('Error fetching initial case studies:', error);
		return (
			<HomeCaseStudies
				initialCaseStudies={[]}
				itemsPerPage={6}
			/>
		);
	}
}
