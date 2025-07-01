import { Button, Column, Row, RevealFx } from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';

interface CaseStudyPaginationProps {
	currentSlug: string;
	allCaseStudies: CaseStudy[];
}

export function CaseStudyPagination({
	currentSlug,
	allCaseStudies
}: CaseStudyPaginationProps) {
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
				gap='0'
				data-case-study-pagination
				style={{
					marginTop: '56px',
					paddingTop: '24px',
					borderTop: '1px solid var(--neutral-alpha-medium)',
					lineHeight: '1'
				}}>
				<Row
					fillWidth
					horizontal='space-between'
					vertical='center'
					gap='16'
					style={{
						minHeight: '48px',
						alignItems: 'center'
					}}>
					{/* Previous Case Study Button */}
					<div
						style={{
							flex: '1',
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
							minHeight: '48px'
						}}>
						{previousCaseStudy && (
							<Button
								href={`/work/${previousCaseStudy.slug.current}`}
								variant='secondary'
								size='s'
								prefixIcon='chevronLeft'
								style={{
									maxWidth: '280px',
									fontSize: '14px',
									fontWeight: '500',
									padding: '12px 16px',
									textAlign: 'left',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									fontFamily: '"Inter", sans-serif',
									lineHeight: '1.4',
									height: '44px',
									display: 'flex',
									alignItems: 'center'
								}}>
								{previousCaseStudy.title}
							</Button>
						)}
					</div>

					{/* Next Case Study Button */}
					<div
						style={{
							flex: '1',
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							minHeight: '48px'
						}}>
						{nextCaseStudy && (
							<Button
								href={`/work/${nextCaseStudy.slug.current}`}
								variant='secondary'
								size='s'
								suffixIcon='chevronRight'
								style={{
									maxWidth: '280px',
									fontSize: '14px',
									fontWeight: '500',
									padding: '12px 16px',
									textAlign: 'right',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									fontFamily: '"Inter", sans-serif',
									lineHeight: '1.4',
									height: '44px',
									display: 'flex',
									alignItems: 'center'
								}}>
								{nextCaseStudy.title}
							</Button>
						)}
					</div>
				</Row>
			</Column>
		</RevealFx>
	);
}
