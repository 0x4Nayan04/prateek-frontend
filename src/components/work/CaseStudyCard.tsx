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
			translateY={8}
			delay={index * 0.02}>
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
						transition: 'all 0.15s ease-in-out',
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
							minHeight: '180px',
							display: 'flex',
							flexDirection: 'column'
						}}>
						{/* Title */}
						<Heading
							variant='heading-strong-l'
							onBackground='neutral-strong'
							style={{
								lineHeight: '1.3',
								fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)',
								fontWeight: '700',
								letterSpacing: '-0.01em',
								marginBottom: '8px',
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden'
							}}>
							{caseStudy.title}
						</Heading>

						{/* Summary */}
						<Text
							variant='body-default-m'
							onBackground='neutral-weak'
							style={{
								lineHeight: '1.6',
								fontSize: 'clamp(0.875rem, 2.8vw, 0.95rem)',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								marginBottom: '12px',
								flex: 1
							}}>
							{caseStudy.summary}
						</Text>

						{/* Enhanced Tags Row */}
						<Row
							gap='8'
							wrap
							style={{
								marginTop: 'auto',
								alignItems: 'flex-start'
							}}>
							{/* Tech Stack Tags with Brand Colors */}
							{caseStudy.techStack
								?.filter((t) => t && t.trim().length > 0)
								.slice(0, 3)
								.map((tech) => (
									<Tag
										key={tech}
										size='s'
										variant='neutral'
										style={{
											fontSize: '0.7rem',
											fontWeight: '600',
											padding: '6px 12px',
											borderRadius: '12px',
											backgroundColor: 'var(--brand-alpha-weak)',
											border: '1px solid var(--brand-alpha-medium)',
											color: 'var(--brand-on-background-strong)',
											transition: 'all 0.15s ease-in-out',
											boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
										}}>
										{tech}
									</Tag>
								))}
							{/* Industry Tags with Accent Colors */}
							{caseStudy.industry
								?.filter((i) => i && i.trim().length > 0)
								.slice(0, 2)
								.map((industry) => (
									<Tag
										key={industry}
										size='s'
										variant='accent'
										style={{
											fontSize: '0.7rem',
											fontWeight: '600',
											padding: '6px 12px',
											borderRadius: '12px',
											backgroundColor: 'var(--accent-alpha-weak)',
											border: '1px solid var(--accent-alpha-medium)',
											color: 'var(--accent-on-background-strong)',
											transition: 'all 0.15s ease-in-out',
											boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
										}}>
										{industry}
									</Tag>
								))}
							{/* Overflow indicator with neutral styling */}
							{(caseStudy.techStack?.filter((t) => t && t.trim().length > 0)
								.length || 0) +
								(caseStudy.industry?.filter((i) => i && i.trim().length > 0)
									.length || 0) >
								5 && (
								<Tag
									size='s'
									variant='neutral'
									style={{
										fontSize: '0.7rem',
										fontWeight: '500',
										padding: '6px 12px',
										borderRadius: '12px',
										backgroundColor: 'var(--neutral-alpha-weak)',
										border: '1px solid var(--neutral-alpha-medium)',
										color: 'var(--neutral-on-background-medium)',
										opacity: 0.8,
										transition: 'all 0.15s ease-in-out'
									}}>
									+
									{(caseStudy.techStack?.filter((t) => t && t.trim().length > 0)
										.length || 0) +
										(caseStudy.industry?.filter((i) => i && i.trim().length > 0)
											.length || 0) -
										5}
								</Tag>
							)}
						</Row>
					</Column>
				</Card>
			</Link>
		</RevealFx>
	);
}
