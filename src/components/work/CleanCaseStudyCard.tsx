import { CaseStudy } from '@/lib/sanity/types';
import { SanityImage } from '@/components/sanity/SanityImage';
import { RevealFx, Text, Row } from '@once-ui-system/core';
import Link from 'next/link';

interface CleanCaseStudyCardProps {
	caseStudy: CaseStudy;
	index: number;
	priority?: boolean;
}

export function CleanCaseStudyCard({
	caseStudy,
	index,
	priority = false
}: CleanCaseStudyCardProps) {
	return (
		<RevealFx
			translateY={4}
			delay={index * 0.05}>
			<Link
				href={`/work/${caseStudy.slug.current}`}
				className='card-base'
				style={{
					textDecoration: 'none',
					color: 'inherit',
					background: 'var(--brand-alpha-weak)',
					border: '1px solid var(--neutral-alpha-strong)',
					transition: 'all var(--transition-standard)'
				}}>
				{/* Image Section - Natural aspect ratio */}
				<div className='card-image'>
					<SanityImage
						image={caseStudy.thumbnail}
						className='image-responsive image-cover'
						priority={priority}
					/>
				</div>

				{/* Content Section - Natural height */}
				<div className='card-content'>
					{/* Title */}
					<Text
						variant='heading-strong-l'
						onBackground='neutral-strong'
						className='card-title'>
						{caseStudy.title}
					</Text>

					{/* Summary */}
					<Text
						variant='body-default-m'
						onBackground='neutral-weak'
						className='card-description'>
						{caseStudy.summary}
					</Text>

					{/* Tags Footer */}
					<div className='card-footer'>
						{/* Tech Stack */}
						{caseStudy.techStack && caseStudy.techStack.length > 0 && (
							<Row
								gap='8'
								wrap
								style={{ marginBottom: 'var(--space-xs)' }}>
								{caseStudy.techStack.slice(0, 3).map((tech, techIndex) => (
									<span
										key={techIndex}
										style={{
											fontSize: '0.75rem',
											fontWeight: '500',
											padding: '4px 8px',
											backgroundColor: 'var(--neutral-alpha-weak)',
											color: 'var(--neutral-on-background-strong)',
											borderRadius: '4px',
											border: '1px solid var(--neutral-alpha-medium)',
											whiteSpace: 'nowrap',
											maxWidth: '120px',
											overflow: 'hidden',
											textOverflow: 'ellipsis'
										}}>
										{tech}
									</span>
								))}
								{caseStudy.techStack.length > 3 && (
									<span
										style={{
											fontSize: '0.75rem',
											fontWeight: '500',
											padding: '4px 8px',
											color: 'var(--neutral-on-background-weak)',
											fontStyle: 'italic'
										}}>
										+{caseStudy.techStack.length - 3} more
									</span>
								)}
							</Row>
						)}

						{/* Industry */}
						{caseStudy.industry && caseStudy.industry.length > 0 && (
							<Row
								gap='8'
								wrap>
								{caseStudy.industry.slice(0, 2).map((ind, indIndex) => (
									<span
										key={indIndex}
										style={{
											fontSize: '0.75rem',
											fontWeight: '500',
											padding: '4px 8px',
											backgroundColor: 'var(--brand-alpha-weak)',
											color: 'var(--brand-on-background-strong)',
											borderRadius: '4px',
											border: '1px solid var(--brand-alpha-medium)',
											whiteSpace: 'nowrap',
											maxWidth: '120px',
											overflow: 'hidden',
											textOverflow: 'ellipsis'
										}}>
										{ind}
									</span>
								))}
							</Row>
						)}
					</div>
				</div>
			</Link>
		</RevealFx>
	);
}
