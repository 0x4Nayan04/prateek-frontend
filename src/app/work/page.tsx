import { ModernProjects } from '@/components/work/ModernProjects';
import { Column } from '@once-ui-system/core';
export const revalidate = 60; // ISR revalidation every 60 seconds

export default function Work() {
	return (
		<Column
			fillWidth
			horizontal='center'
			paddingY='0'
			paddingX='l'
			gap='0'>
			<ModernProjects
				title='Case Studies'
				showFilters={false}
				columns='2'
				useInfiniteScroll={true}
			/>
		</Column>
	);
}
