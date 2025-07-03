'use client';

import { useState } from 'react';
import {
	Card,
	Column,
	Row,
	Heading,
	Text,
	Tag,
	Button,
	RevealFx
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { SanityImage } from '@/components/sanity/SanityImage';
import Link from 'next/link';
import styles from './ModernCaseStudyCard.module.scss';

interface CaseStudyCardProps {
	caseStudy: CaseStudy;
	index: number;
	priority?: boolean;
}

export function CaseStudyCard({
	caseStudy,
	index,
	priority = false
}: CaseStudyCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<RevealFx
			translateY={4}
			delay={index * 0.05}>
			<Link
				href={`/work/${caseStudy.slug.current}`}
				style={{
					textDecoration: 'none',
					cursor: 'pointer',
					display: 'block',
					height: '100%'
				}}>
				<Card
					fillWidth
					fillHeight
					radius='l'
					direction='column'
					border='neutral-alpha-strong'
					background='brand-alpha-weak'
					minHeight='48'
					style={{
						overflow: 'hidden',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						cursor: 'pointer',
						transition:
							'all var(--animation-duration-short) var(--animation-easing-standard)',
						maxWidth: '100%',
						margin: '0 auto'
					}}
					className={styles.caseStudyCard}>
					{/* Image Container */}
					<div
						style={{
							padding: '8px',
							background: 'rgb(250, 250, 250)',
							borderRadius: '12px 12px 0 0'
						}}>
						<div
							style={{
								position: 'relative',
								width: '100%',
								aspectRatio: '16/9',
								overflow: 'hidden',
								borderRadius: '8px',
								border: '1px solid rgb(230, 230, 230)',
								boxShadow:
									'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
								background: 'var(--neutral-alpha-weak)'
							}}>
							<SanityImage
								image={caseStudy.thumbnail}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover'
								}}
								priority={priority}
							/>
						</div>
					</div>

					{/* Clean Visual Separator */}
					<div
						style={{
							width: '100%',
							height: '1px',
							background: 'rgb(230, 230, 230)',
							margin: '0'
						}}
					/>

					{/* Content Section with improved spacing */}
					<Column
						fillWidth
						flex={1}
						padding='m'
						gap='s'
						horizontal='start'
						vertical='start'
						style={{
							justifyContent: 'space-between',
							minHeight: '200px',
							display: 'flex',
							flexDirection: 'column'
						}}>
						{/* Title and Summary Container */}
						<Column
							fillWidth
							gap='xs'
							style={{ flex: '1 1 auto' }}>
							{/* Title */}
							<Text
								variant='heading-strong-l'
								onBackground='neutral-strong'
								style={{
									lineHeight: '1.3',
									fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
									fontWeight: '700',
									letterSpacing: '-0.01em',
									marginBottom: '8px',
									display: '-webkit-box',
									WebkitLineClamp: 2,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden'
								}}>
								{caseStudy.title}
							</Text>

							{/* Summary */}
							<Text
								variant='body-default-m'
								onBackground='neutral-weak'
								style={{
									lineHeight: '1.6',
									fontSize: 'clamp(0.8rem, 2.2vw, 0.875rem)',
									marginBottom: '12px',
									flex: 1
								}}
								className='case-study-summary'>
								{caseStudy.summary}
							</Text>
						</Column>

						{/* Tags Row - Matching reference design */}
						<Row
							gap='8'
							wrap
							style={{
								marginTop: 'auto',
								alignItems: 'flex-start'
							}}>
							{/* Tech Stack Tags - Match detail page styling */}
							{caseStudy.techStack
								?.filter((t) => t && t.trim().length > 0)
								.slice(0, 3)
								.map((tech) => (
									<span
										key={tech}
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											padding: '6px 12px',
											backgroundColor: 'var(--neutral-alpha-weak)',
											color: 'var(--neutral-on-background-strong)',
											fontSize: '14px',
											fontWeight: '500',
											fontFamily: '"Inter", sans-serif',
											borderRadius: '6px',
											border: '1px solid var(--neutral-alpha-medium)',
											transition: 'all 0.2s ease',
											lineHeight: '1',
											whiteSpace: 'nowrap',
											maxWidth: '120px',
											overflow: 'hidden',
											textOverflow: 'ellipsis'
										}}>
										{tech}
									</span>
								))}

							{/* Industry Tags - Match detail page styling */}
							{caseStudy.industry?.slice(0, 2).map((industry) => (
								<span
									key={industry}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										padding: '6px 12px',
										backgroundColor: 'var(--brand-alpha-weak)',
										color: 'var(--brand-on-background-strong)',
										fontSize: '14px',
										fontWeight: '500',
										fontFamily: '"Inter", sans-serif',
										borderRadius: '6px',
										border: '1px solid var(--brand-alpha-medium)',
										transition: 'all 0.2s ease',
										lineHeight: '1',
										whiteSpace: 'nowrap',
										maxWidth: '130px',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									}}>
									{industry}
								</span>
							))}

							{/* Overflow indicator if more tags exist */}
							{((caseStudy.techStack?.length || 0) > 3 ||
								(caseStudy.industry?.length || 0) > 2) && (
								<span
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										padding: '6px 12px',
										backgroundColor: 'var(--neutral-alpha-weak)',
										color: 'var(--neutral-on-background-medium)',
										fontSize: '14px',
										fontWeight: '500',
										fontFamily: '"Inter", sans-serif',
										borderRadius: '6px',
										border: '1px solid var(--neutral-alpha-medium)',
										transition: 'all 0.2s ease',
										lineHeight: '1',
										opacity: 0.7
									}}>
									+
									{Math.max(0, (caseStudy.techStack?.length || 0) - 3) +
										Math.max(0, (caseStudy.industry?.length || 0) - 2)}
								</span>
							)}
						</Row>
					</Column>
				</Card>
			</Link>
		</RevealFx>
	);
}
