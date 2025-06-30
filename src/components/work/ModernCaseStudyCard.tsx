'use client';

import { urlFor } from '@/lib/sanity/client';
import { CaseStudy } from '@/lib/sanity/types';
import {
	Card,
	Carousel,
	Column,
	RevealFx,
	Row,
	Tag,
	Text
} from '@once-ui-system/core';
import Link from 'next/link';
import styles from './ModernCaseStudyCard.module.scss';

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
	// Use images array first, fallback to thumbnail if no images
	const displayImages =
		caseStudy.images && caseStudy.images.length > 0
			? caseStudy.images
			: caseStudy.thumbnail
				? [caseStudy.thumbnail]
				: [];

	// Prepare carousel items from Sanity images
	const carouselItems = displayImages.map((image, idx) => {
		const imageUrl = urlFor(image)
			.width(1400)
			.height(1000)
			.quality(100)
			.format('webp')
			.url();

		return {
			slide: imageUrl,
			alt: image.alt || `${caseStudy.title} - Image ${idx + 1}`
		};
	});

	// Handle carousel clicks to prevent navigation
	const handleCarouselClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<RevealFx
			translateY={8}
			delay={index * 0.02}>
			<Link
				href={`/work/${caseStudy.slug.current}`}
				style={{
					textDecoration: 'none',
					color: 'inherit',
					display: 'block',
					width: '100%',
					height: '100%'
				}}>
				<Card
					fillWidth
					fillHeight
					radius='l'
					direction='column'
					border='neutral-alpha-strong'
					background='brand-alpha-weak'
					style={{
						overflow: 'hidden',
						height: '100%',
						minHeight: '520px', // Consistent minimum height
						display: 'flex',
						flexDirection: 'column',
						cursor: 'pointer',
						transition: 'all 0.15s ease-in-out'
					}}
					className={styles.caseStudyCard}>
					{/* Image Section - Fixed aspect ratio with increased height */}
					<div
						style={{
							flex: '0 0 auto', // Don't grow or shrink
							height: '320px', // Optimized height for better proportions matching reference
							padding: '6px', // Slightly more breathing space around image
							background: 'rgb(250, 250, 250)',
							borderRadius: '12px 12px 0 0'
						}}>
						{carouselItems.length > 0 ? (
							<div
								style={{
									borderRadius: '8px',
									overflow: 'hidden',
									border: '1px solid rgb(230, 230, 230)',
									boxShadow:
										'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
									height: '100%'
								}}>
								<div
									data-carousel-control='true'
									onClick={handleCarouselClick}
									style={{ height: '100%' }}>
									<Carousel
										items={carouselItems}
										aspectRatio='16 / 10'
										indicator={carouselItems.length > 1 ? 'line' : undefined}
										controls={carouselItems.length > 1}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										style={{
											borderRadius: '7px',
											height: '100%'
										}}
									/>
								</div>
							</div>
						) : (
							<div
								style={{
									borderRadius: '8px',
									overflow: 'hidden',
									border: '1px solid rgb(230, 230, 230)',
									boxShadow:
										'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#666',
									background: 'rgb(248, 248, 248)'
								}}>
								No images available
							</div>
						)}
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

					{/* Content Section - Optimized spacing to match reference */}
					<Column
						fillWidth
						flex={1}
						padding='s' // Balanced padding for proper spacing
						gap='s' // Proper gap for readable spacing
						horizontal='start'
						vertical='start'
						style={{
							justifyContent: 'space-between',
							minHeight: '200px' // Balanced content height with larger image
						}}>
						{/* Title and Summary Container */}
						<Column
							fillWidth
							gap='xs' // Balanced gap between title and summary
							style={{ flex: '1 1 auto' }}>
							{/* Title */}
							<Text
								variant='heading-strong-l'
								onBackground='neutral-strong'
								style={{
									lineHeight: '1.2',
									fontSize: 'clamp(1.125rem, 3.5vw, 1.375rem)',
									fontWeight: '700',
									letterSpacing: '-0.01em'
								}}>
								{caseStudy.title}
							</Text>

							{/* Summary */}
							<Text
								variant='body-default-m'
								onBackground='neutral-weak'
								style={{
									lineHeight: '1.5',
									fontSize: 'clamp(0.8rem, 2.8vw, 0.9rem)',
									display: '-webkit-box',
									WebkitLineClamp: 2, // Keep at 2 lines for tighter layout
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
									textOverflow: 'ellipsis'
								}}>
								{caseStudy.summary}
							</Text>
						</Column>

						{/* Tags Row - Anchored to bottom */}
						<Row
							gap='xs' // Proper gap between tags
							wrap
							style={{
								flex: '0 0 auto', // Don't grow or shrink
								alignItems: 'flex-start',
								marginTop: 'auto'
							}}>
							{/* Tech Stack Tags */}
							{caseStudy.techStack?.slice(0, 3).map((tech) => (
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

							{/* Industry Tags */}
							{caseStudy.industry?.slice(0, 2).map((industry) => (
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

							{/* Overflow indicator */}
							{(caseStudy.techStack?.length || 0) +
								(caseStudy.industry?.length || 0) >
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
									{(caseStudy.techStack?.length || 0) +
										(caseStudy.industry?.length || 0) -
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
