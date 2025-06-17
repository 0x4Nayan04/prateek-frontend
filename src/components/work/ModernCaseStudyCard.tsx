'use client';

import { useState } from 'react';
import {
	Card,
	Column,
	Text,
	Row,
	Tag,
	RevealFx,
	Media,
	Button,
	Icon
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/client';

interface ModernCaseStudyCardProps {
	caseStudy: CaseStudy;
	index: number;
	priority?: boolean;
}

export function ModernCaseStudyCard({
	caseStudy,
	index,
	priority = false
}: ModernCaseStudyCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Use images array first, fallback to thumbnail if no images
	const displayImages =
		caseStudy.images && caseStudy.images.length > 0
			? caseStudy.images
			: caseStudy.thumbnail
				? [caseStudy.thumbnail]
				: [];

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prev) => (prev - 1 + displayImages.length) % displayImages.length
		);
	};

	const goToImage = (index: number) => {
		setCurrentImageIndex(index);
	};

	const currentImage = displayImages[currentImageIndex];

	return (
		<RevealFx
			translateY={16}
			delay={index * 0.1}>
			<Card
				fillWidth
				radius='l'
				direction='column'
				border='neutral-alpha-medium'
				style={{
					overflow: 'hidden',
					transition: 'all 0.2s ease-in-out'
				}}>
				{/* Custom Image Carousel */}
				{currentImage && (
					<div
						style={{
							position: 'relative',
							width: '100%',
							aspectRatio: '16/10',
							overflow: 'hidden'
						}}>
						<Media
							src={urlFor(currentImage).width(800).height(500).url()}
							alt={currentImage.alt || caseStudy.title}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							style={{
								objectFit: 'contain',
								transition: 'opacity 0.3s ease-in-out'
							}}
						/>

						{/* Navigation Arrows - Only show if multiple images */}
						{displayImages.length > 1 && (
							<>
								{/* Previous Button */}
								<Button
									variant='secondary'
									size='s'
									onClick={prevImage}
									style={{
										position: 'absolute',
										left: '12px',
										top: '50%',
										transform: 'translateY(-50%)',
										background: 'rgba(0, 0, 0, 0.7)',
										backdropFilter: 'blur(8px)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										borderRadius: '50%',
										width: '40px',
										height: '40px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										zIndex: 10
									}}>
									<Icon
										name='chevronLeft'
										size='s'
										onBackground='neutral-strong'
									/>
								</Button>

								{/* Next Button */}
								<Button
									variant='secondary'
									size='s'
									onClick={nextImage}
									style={{
										position: 'absolute',
										right: '12px',
										top: '50%',
										transform: 'translateY(-50%)',
										background: 'rgba(0, 0, 0, 0.7)',
										backdropFilter: 'blur(8px)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										borderRadius: '50%',
										width: '40px',
										height: '40px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										zIndex: 10
									}}>
									<Icon
										name='chevronRight'
										size='s'
										onBackground='neutral-strong'
									/>
								</Button>

								{/* Dot Indicators */}
								<Row
									gap='8'
									center
									style={{
										position: 'absolute',
										bottom: '16px',
										left: '50%',
										transform: 'translateX(-50%)',
										background: 'rgba(0, 0, 0, 0.7)',
										backdropFilter: 'blur(8px)',
										padding: '8px 16px',
										borderRadius: '20px',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										zIndex: 10
									}}>
									{displayImages.map((_, idx) => (
										<button
											key={idx}
											onClick={() => goToImage(idx)}
											style={{
												width: '8px',
												height: '8px',
												borderRadius: '50%',
												border: 'none',
												background:
													idx === currentImageIndex
														? 'rgba(255, 255, 255, 0.9)'
														: 'rgba(255, 255, 255, 0.4)',
												cursor: 'pointer',
												transition: 'all 0.2s ease-in-out',
												transform:
													idx === currentImageIndex ? 'scale(1.2)' : 'scale(1)'
											}}
										/>
									))}
								</Row>
							</>
						)}
					</div>
				)}

				{/* Content Section */}
				<Column
					fillWidth
					padding='24'
					gap='16'
					horizontal='start'>
					{/* Title */}
					<Text
						variant='heading-strong-l'
						onBackground='neutral-strong'
						style={{
							lineHeight: '1.3',
							fontSize: '1.5rem',
							fontWeight: '700'
						}}>
						{caseStudy.title}
					</Text>

					{/* Summary - Truncated to 2 lines */}
					<Text
						variant='body-default-m'
						onBackground='neutral-weak'
						style={{
							lineHeight: '1.5',
							fontSize: '1rem',
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}}>
						{caseStudy.summary}
					</Text>

					{/* Improved Tags Row */}
					<Row
						gap='8'
						wrap
						style={{ marginTop: '4px' }}>
						{/* Tech Stack Tags */}
						{caseStudy.techStack?.slice(0, 3).map((tech) => (
							<Tag
								key={tech}
								size='s'
								variant='neutral'
								style={{
									fontSize: '0.75rem',
									fontWeight: '500',
									padding: '4px 12px',
									borderRadius: '12px',
									backgroundColor: 'var(--neutral-alpha-weak)',
									border: '1px solid var(--neutral-alpha-medium)',
									color: 'var(--neutral-on-background-strong)'
								}}>
								{tech}
							</Tag>
						))}

						{/* Industry Tags */}
						{caseStudy.industry?.slice(0, 2).map((industry) => (
							<Tag
								key={industry}
								size='s'
								variant='accent'
								style={{
									fontSize: '0.75rem',
									fontWeight: '500',
									padding: '4px 12px',
									borderRadius: '12px',
									backgroundColor: 'var(--accent-alpha-weak)',
									border: '1px solid var(--accent-alpha-medium)',
									color: 'var(--accent-on-background-strong)'
								}}>
								{industry}
							</Tag>
						))}

						{/* Show overflow indicator */}
						{(caseStudy.techStack?.length || 0) +
							(caseStudy.industry?.length || 0) >
							5 && (
							<Tag
								size='s'
								variant='neutral'
								style={{
									fontSize: '0.75rem',
									fontWeight: '500',
									padding: '4px 12px',
									borderRadius: '12px',
									backgroundColor: 'var(--neutral-alpha-weak)',
									border: '1px solid var(--neutral-alpha-medium)',
									color: 'var(--neutral-on-background-medium)',
									opacity: 0.8
								}}>
								+
								{(caseStudy.techStack?.length || 0) +
									(caseStudy.industry?.length || 0) -
									5}
							</Tag>
						)}
					</Row>
				</Column>
			</Card>
		</RevealFx>
	);
}
