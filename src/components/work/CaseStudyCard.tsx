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
					paddingX='20'
					paddingY='20'
					radius='m'
					style={{
						height: '100%',
						border: '1px solid var(--neutral-alpha-medium)',
						transition: 'all 0.15s ease'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-2px)';
						e.currentTarget.style.boxShadow =
							'0 8px 24px var(--neutral-alpha-medium)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0)';
						e.currentTarget.style.boxShadow = 'none';
					}}>
					<Column
						fillWidth
						gap='16'
						style={{
							position: 'relative',
							overflow: 'hidden'
						}}>
						{/* Image Container */}
						<div
							style={{
								position: 'relative',
								width: '100%',
								aspectRatio: '16/10',
								overflow: 'hidden',
								borderRadius: '8px',
								transition: 'transform 0.15s ease',
								background: 'var(--neutral-alpha-weak)'
							}}
							onMouseEnter={(e) => {
								const img = e.currentTarget.querySelector('img');
								if (img) {
									img.style.transform = 'scale(1.02)';
								}
							}}
							onMouseLeave={(e) => {
								const img = e.currentTarget.querySelector('img');
								if (img) {
									img.style.transform = 'scale(1)';
								}
							}}>
							<SanityImage
								image={caseStudy.thumbnail}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									transition: 'opacity 0.15s ease',
									transform: 'scale(1)'
								}}
							/>
						</div>

						{/* Content */}
						<Column
							padding='20'
							gap='16'>
							{/* Title */}
							<Heading
								variant='heading-strong-m'
								onBackground='neutral-strong'
								style={{
									lineHeight: '1.3',
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
								onBackground='neutral-medium'
								style={{
									lineHeight: '1.6',
									display: '-webkit-box',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden'
								}}>
								{caseStudy.summary}
							</Text>

							{/* Tags */}
							<Column gap='8'>
								{/* Tech Stack Tags */}
								{(() => {
									const techStackLength = caseStudy.techStack?.length ?? 0;
									return (
										techStackLength > 0 && (
											<Row
												gap='4'
												wrap>
												{caseStudy.techStack?.slice(0, 3).map((tech) => (
													<Tag
														key={tech}
														size='s'
														variant='neutral'>
														{tech}
													</Tag>
												))}
												{techStackLength > 3 && (
													<Tag
														size='s'
														variant='neutral'>
														+{techStackLength - 3}
													</Tag>
												)}
											</Row>
										)
									);
								})()}

								{/* Industry Tags */}
								{(() => {
									const industryLength = caseStudy.industry?.length ?? 0;
									return (
										industryLength > 0 && (
											<Row
												gap='4'
												wrap>
												{caseStudy.industry?.slice(0, 2).map((industry) => (
													<Tag
														key={industry}
														size='s'
														variant='brand'>
														{industry}
													</Tag>
												))}
												{industryLength > 2 && (
													<Tag
														size='s'
														variant='brand'>
														+{industryLength - 2}
													</Tag>
												)}
											</Row>
										)
									);
								})()}
							</Column>
						</Column>
					</Column>
				</Card>
			</Link>
		</RevealFx>
	);
}
