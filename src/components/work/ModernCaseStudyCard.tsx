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
							</Text>

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
						</Column>

						{/* Tags Row - Improved responsive layout */}
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
											fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
											fontWeight: '600',
											padding: '6px 10px',
											borderRadius: '12px',
											backgroundColor: 'var(--brand-alpha-weak)',
											border: '1px solid var(--brand-alpha-medium)',
											color: 'var(--brand-on-background-strong)',
											transition:
												'all var(--animation-duration-short) var(--animation-easing-standard)',
											whiteSpace: 'nowrap',
											maxWidth: '120px',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											display: 'inline-flex',
											alignItems: 'center',
											flexShrink: 0
										}}>
										{tech}
									</Tag>
								))}

							{/* Industry Tag with Accent Colors */}
							{caseStudy.industry && (
								<Tag
									size='s'
									variant='brand'
									style={{
										fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
										fontWeight: '600',
										padding: '6px 10px',
										borderRadius: '12px',
										backgroundColor: 'var(--accent-alpha-weak)',
										border: '1px solid var(--accent-alpha-medium)',
										color: 'var(--accent-on-background-strong)',
										transition:
											'all var(--animation-duration-short) var(--animation-easing-standard)',
										whiteSpace: 'nowrap',
										maxWidth: '130px',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										display: 'inline-flex',
										alignItems: 'center',
										flexShrink: 0
									}}>
									{caseStudy.industry}
								</Tag>
							)}

							{/* Overflow indicator if more tags exist */}
							{caseStudy.techStack && caseStudy.techStack.length > 3 && (
								<Tag
									size='s'
									variant='neutral'
									style={{
										fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
										fontWeight: '600',
										padding: '6px 10px',
										borderRadius: '12px',
										backgroundColor: 'var(--neutral-alpha-weak)',
										border: '1px solid var(--neutral-alpha-medium)',
										color: 'var(--neutral-on-background-medium)',
										transition:
											'all var(--animation-duration-short) var(--animation-easing-standard)',
										opacity: 0.7
									}}>
									+{caseStudy.techStack.length - 3}
								</Tag>
							)}
						</Row>
					</Column>
				</Card>
			</Link>
		</RevealFx>
	);
}
