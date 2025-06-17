import { Column, Meta, Schema } from '@once-ui-system/core';
import { baseURL, about, person, work } from '@/resources';
import { ModernProjects } from '@/components/work/ModernProjects';

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
			maxWidth='l'
			paddingX='24'
			paddingY='32'>
			<Schema
				as='webPage'
				baseURL={baseURL}
				path={work.path}
				title={work.title}
				description={work.description}
				image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
				author={{
					name: person.name,
					url: `${baseURL}${about.path}`,
					image: `${baseURL}${person.avatar}`
				}}
			/>
			<ModernProjects
				title='All Case Studies'
				description='Comprehensive collection of data-driven solutions, strategic implementations, and impactful results across various industries and technologies'
				showFilters={false}
				columns='2'
			/>
		</Column>
	);
}
