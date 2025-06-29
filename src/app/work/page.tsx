import { ModernProjects } from '@/components/work/ModernProjects';
import { Column } from '@once-ui-system/core';
import type { Metadata } from 'next';
import { work, baseURL } from '@/resources';

export const revalidate = 60; // ISR revalidation every 60 seconds

export const metadata: Metadata = {
	title: work.title,
	description: work.description,
	openGraph: {
		title: work.title,
		description: work.description,
		url: `${baseURL}/work`,
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
	},
	twitter: {
		card: 'summary_large_image',
		title: work.title,
		description: work.description,
		images: [`${baseURL}/og-work.png`],
		creator: '@pratik_sri'
	}
};

export default function Work() {
	return (
		<Column
			fillWidth
			horizontal='center'
			paddingY='16'
			paddingX='l'
			gap='8'>
			<ModernProjects
				title='Case Studies'
				useInfiniteScroll={false}
				enableFilters={true}
				columns='2'
			/>
		</Column>
	);
}
