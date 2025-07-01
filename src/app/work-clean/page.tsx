import { CleanCaseStudyGrid } from '@/components/work/CleanCaseStudyGrid';
import { getAllCaseStudies } from '@/lib/utils/content';
import { Column } from '@once-ui-system/core';
import type { Metadata } from 'next';
import { work, baseURL } from '@/resources';

export const revalidate = 60; // ISR revalidation every 60 seconds

export const metadata: Metadata = {
	title: `${work.title} - Clean`,
	description: `${work.description} - Clean responsive implementation`,
	openGraph: {
		title: `${work.title} - Clean`,
		description: `${work.description} - Clean responsive implementation`,
		url: `${baseURL}/work-clean`,
		images: [
			{
				url: `${baseURL}/og-work.png`,
				width: 1200,
				height: 630,
				alt: work.title,
				type: 'image/png'
			}
		],
		type: 'website'
	}
};

export default async function WorkClean() {
	const caseStudies = await getAllCaseStudies();

	return (
		<Column
			fillWidth
			horizontal='center'
			paddingY='16'
			gap='12'>
			<CleanCaseStudyGrid
				caseStudies={caseStudies}
				title='Case Studies - Clean Implementation'
			/>
		</Column>
	);
}
