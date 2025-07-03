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

	// Prepare carousel items from Sanity images with better optimization
	const carouselItems =
		displayImages.length > 0
			? displayImages.map((image, idx) => {
					try {
						const imageUrl = urlFor(image)
							.width(800) // Reduced from 1400 for better performance
							.height(500) // Adjusted to maintain 16:10 aspect ratio
							.quality(85) // Reduced from 100 for better performance
							.format('webp')
							.fit('crop') // Ensure proper cropping
							.crop('center') // Center crop for better composition
							.url();

						return {
							slide: imageUrl,
							alt: image.alt || `${caseStudy.title} - Image ${idx + 1}`
						};
					} catch (error) {
						console.warn(
							'Error generating image URL for',
							caseStudy.title,
							error
						);
						// Return placeholder data structure if URL generation fails
						return {
							slide: `/og-image.png`, // Fallback to a public image
							alt: `${caseStudy.title} - Preview not available`
						};
					}
				})
			: []; // No fallback items if no images

	// Handle carousel clicks to prevent navigation
	const handleCarouselClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<RevealFx
			translateY={4}
			delay={index * 0.05}>
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
						minHeight: '520px',
						display: 'flex',
						flexDirection: 'column',
						cursor: 'pointer',
						transition:
							'all var(--animation-duration-short) var(--animation-easing-standard)'
					}}
					className={styles.caseStudyCard}>
					{/* Image Section - Improved responsive container */}
					<div
						style={{
							flex: '0 0 auto',
							width: '100%',
							aspectRatio: '16 / 10', // Use aspect ratio instead of fixed height
							padding: '8px',
							background: 'rgb(250, 250, 250)',
							borderRadius: '12px 12px 0 0',
							minHeight: '200px', // Minimum height for mobile
							maxHeight: '350px' // Maximum height for larger screens
						}}>
						{carouselItems.length > 0 ? (
							<div
								style={{
									borderRadius: '8px',
									overflow: 'hidden',
									border: '1px solid rgb(230, 230, 230)',
									boxShadow:
										'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
									height: '100%',
									width: '100%',
									position: 'relative'
								}}>
								<div
									data-carousel-control='true'
									onClick={handleCarouselClick}
									style={{
										height: '100%',
										width: '100%'
									}}>
									<Carousel
										items={carouselItems}
										aspectRatio='16 / 10'
										indicator={carouselItems.length > 1 ? 'line' : undefined}
										controls={carouselItems.length > 1}
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
										style={{
											borderRadius: '7px',
											height: '100%',
											width: '100%'
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
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#666',
									background: 'rgb(248, 248, 248)',
									fontSize: '14px',
									fontWeight: '500'
								}}>
								<div
									style={{
										textAlign: 'center',
										padding: '20px'
									}}>
									<div style={{ marginBottom: '8px', fontSize: '24px' }}>
										📷
									</div>
									<div>No preview available</div>
								</div>
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

					{/* Content Section - Improved responsive spacing */}
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
