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
			translateY={16}
			delay={index * 0.1}>
			<Link
				href={`/work/${caseStudy.slug.current}`}
				style={{
					textDecoration: 'none',
					color: 'inherit',
					display: 'block'
				}}>
				<Card
					fillWidth
					padding='0'
					radius='l'
					border='neutral-alpha-weak'
					background='surface'
					style={{
						overflow: 'hidden',
						cursor: 'pointer',
						position: 'relative',
						transition: 'all 0.3s ease'
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					{/* Thumbnail with Hover Overlay */}
					<div
						style={{
							position: 'relative',
							aspectRatio: '16/10',
							overflow: 'hidden'
						}}>
						<SanityImage
							image={caseStudy.thumbnail}
							width={800}
							height={500}
							alt={caseStudy.thumbnail.alt}
							priority={priority}
							style={{
								transition: 'transform 0.3s ease',
								transform: isHovered ? 'scale(1.05)' : 'scale(1)'
							}}
						/>

						{/* Hover Overlay */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background: 'rgba(0, 0, 0, 0.7)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								opacity: isHovered ? 1 : 0,
								transition: 'opacity 0.3s ease',
								backdropFilter: 'blur(2px)'
							}}>
							<Button
								variant='primary'
								size='m'
								arrowIcon
								onClick={(e: React.MouseEvent) => {
									e.preventDefault();
									e.stopPropagation();
									// Button will still navigate via parent Link
								}}>
								Read Case Study
							</Button>
						</div>
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
							{caseStudy.techStack.length > 0 && (
								<Row
									gap='4'
									wrap>
									{caseStudy.techStack.slice(0, 3).map((tech) => (
										<Tag
											key={tech}
											size='s'
											variant='neutral'>
											{tech}
										</Tag>
									))}
									{caseStudy.techStack.length > 3 && (
										<Tag
											size='s'
											variant='neutral'>
											+{caseStudy.techStack.length - 3}
										</Tag>
									)}
								</Row>
							)}

							{/* Industry Tags */}
							{caseStudy.industry.length > 0 && (
								<Row
									gap='4'
									wrap>
									{caseStudy.industry.slice(0, 2).map((industry) => (
										<Tag
											key={industry}
											size='s'
											variant='brand'>
											{industry}
										</Tag>
									))}
									{caseStudy.industry.length > 2 && (
										<Tag
											size='s'
											variant='brand'>
											+{caseStudy.industry.length - 2}
										</Tag>
									)}
								</Row>
							)}
						</Column>
					</Column>
				</Card>
			</Link>
		</RevealFx>
	);
}
