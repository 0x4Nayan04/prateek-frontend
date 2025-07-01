import { Button, Column, Row, RevealFx, Line } from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';

interface CleanPaginationProps {
	currentSlug: string;
	allCaseStudies: CaseStudy[];
}

export function CleanPagination({
	currentSlug,
	allCaseStudies
}: CleanPaginationProps) {
	// Find current case study index
	const currentIndex = allCaseStudies.findIndex(
		(study) => study.slug.current === currentSlug
	);

	// Determine previous and next case studies
	const previousCaseStudy =
		currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null;
	const nextCaseStudy =
		currentIndex < allCaseStudies.length - 1
			? allCaseStudies[currentIndex + 1]
			: null;

	// If no navigation available, don't render anything
	if (!previousCaseStudy && !nextCaseStudy) {
		return null;
	}

	return (
		<RevealFx
			translateY={8}
			delay={0.2}>
			<Column
				fillWidth
				gap='16'>
				{/* Divider line */}
				<Line
					fillWidth
					background='neutral-alpha-medium'
				/>

				{/* Navigation buttons in a compact row layout */}
				<Row
					fillWidth
					gap='l'
					horizontal='center'
					vertical='center'>
					{/* Previous case study button */}
					{previousCaseStudy && (
						<Button
							href={`/work/${previousCaseStudy.slug.current}`}
							variant='secondary'
							size='l'
							prefixIcon='chevronLeft'
							weight='default'
							style={{
								flex: '1',
								maxWidth: '300px',
								minHeight: '44px',
								fontSize: '14px',
								fontWeight: '500',
								padding: '12px 20px',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								borderRadius: '8px'
							}}>
							{previousCaseStudy.title}
						</Button>
					)}

					{/* Next case study button */}
					{nextCaseStudy && (
						<Button
							href={`/work/${nextCaseStudy.slug.current}`}
							variant='secondary'
							size='l'
							suffixIcon='chevronRight'
							weight='default'
							style={{
								flex: '1',
								maxWidth: '300px',
								minHeight: '44px',
								fontSize: '14px',
								fontWeight: '500',
								padding: '12px 20px',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								borderRadius: '8px'
							}}>
							{nextCaseStudy.title}
						</Button>
					)}
				</Row>
			</Column>
		</RevealFx>
	);
}
