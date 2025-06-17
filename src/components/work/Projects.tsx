import { Column } from '@once-ui-system/core';
import { getAllCaseStudies } from '@/lib/utils/content';
import { CaseStudy } from '@/lib/sanity/types';
import { ProjectCard } from '@/components';
import { urlFor } from '@/lib/sanity/client';

interface ProjectsProps {
	range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
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
		<Column
			fillWidth
			gap='xl'
			marginBottom='40'
			paddingX='l'>
			{displayedCaseStudies.map((caseStudy, index) => {
				// Convert Sanity images to URLs for ProjectCard
				const imageUrls = [];

				// Add thumbnail as first image
				if (caseStudy.thumbnail?.asset?._ref) {
					imageUrls.push(
						urlFor(caseStudy.thumbnail).width(800).height(500).url()
					);
				}

				// Add additional images if available
				if (caseStudy.images && caseStudy.images.length > 0) {
					caseStudy.images.forEach((img) => {
						if (img.asset?._ref) {
							imageUrls.push(urlFor(img).width(800).height(500).url());
						}
					});
				}

				return (
					<ProjectCard
						priority={index < 2}
						key={caseStudy._id}
						href={`work/${caseStudy.slug.current}`}
						images={imageUrls}
						title={caseStudy.title}
						description={caseStudy.summary}
						content='case-study' // Indicate this is a case study for the "Read case study" link
						avatars={[]} // Case studies don't have team avatars like MDX projects
						link={caseStudy.externalLinks?.[0]?.url || ''}
					/>
				);
			})}
		</Column>
	);
}
