import { ModernProjects } from '@/components/work/ModernProjects';
import { baseURL, work } from '@/resources';
import { Column, Meta } from '@once-ui-system/core';

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateMetadata() {
	return Meta.generate({
		title: work.title,
		description: work.description,
		baseURL: baseURL,
		image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
		path: work.path
	});
}

export default function Work() {
	return (
		<Column
			fillWidth
			horizontal='center'
			paddingY='0'
			paddingX='l'
			gap='0'
			style={
				{
					'@media (max-width: 768px)': {
						paddingLeft: 'var(--responsive-space-m)',
						paddingRight: 'var(--responsive-space-m)'
					}
				} as React.CSSProperties
			}>
			<ModernProjects
				title='Case Studies'
				showFilters={false}
				columns='2'
				useInfiniteScroll={true}
			/>
		</Column>
	);
}
