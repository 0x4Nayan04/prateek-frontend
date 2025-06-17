'use client';

import { urlFor } from '@/lib/sanity/client';
import { CaseStudy } from '@/lib/sanity/types';
import {
	Button,
	Card,
	Column,
	Icon,
	Media,
	RevealFx,
	Row,
	Tag,
	Text
} from '@once-ui-system/core';
import { useState } from 'react';
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
				maxWidth={30}
				radius='l'
				direction='column'
				border='neutral-alpha-strong'
				background='brand-alpha-weak'
				minHeight='48'
				style={{
					overflow: 'hidden',
					transition: 'all 0.2s ease-in-out',
					cursor: 'pointer'
				}}
				className={styles.caseStudyCard}>
				{/* Image Container with Sophisticated Surface Colors - Inspired by PrimeVue */}
				{currentImage && (
					<div
						style={{
							padding: '10px', // Refined breathing space
							background: 'rgb(250, 250, 250)', // Light: surface-50 equivalent
							borderRadius: '12px 12px 0 0' // Clean top corners only
						}}>
						<div
							style={{
								position: 'relative',
								width: '100%',
								aspectRatio: '16/10',
								overflow: 'hidden',
								minHeight: '300px',
								borderRadius: '8px', // Elegant nested radius
								border: '1px solid rgb(230, 230, 230)', // surface-200 equivalent
								boxShadow:
									'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Tailwind shadow-sm equivalent
								background: '#ffffff' // Pure white surface for image
							}}>
							{/* Image Layer */}
							<Media
								src={urlFor(currentImage)
									.width(1400)
									.height(1000)
									.quality(100)
									.format('webp')
									.url()}
								alt={currentImage.alt || caseStudy.title}
								fill
								sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw'
								style={{
									objectFit: 'cover',
									transition: 'opacity 0.3s ease-in-out',
									borderRadius: '5px' // Perfect nesting
								}}
							/>

							{/* Navigation Controls */}
							{displayImages.length > 1 && (
								<>
									{/* Previous Button */}
									<Button
										variant='secondary'
										size='s'
										onClick={prevImage}
										style={{
											position: 'absolute',
											left: '10px',
											top: '50%',
											transform: 'translateY(-50%)',
											background: 'rgba(0, 0, 0, 0.8)',
											backdropFilter: 'blur(12px)',
											border: '1px solid rgba(255, 255, 255, 0.2)',
											borderRadius: '50%',
											width: '36px',
											height: '36px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											zIndex: 10,
											opacity: 0.9,
											transition: 'all 0.2s ease-in-out'
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
											right: '10px',
											top: '50%',
											transform: 'translateY(-50%)',
											background: 'rgba(0, 0, 0, 0.8)',
											backdropFilter: 'blur(12px)',
											border: '1px solid rgba(255, 255, 255, 0.2)',
											borderRadius: '50%',
											width: '36px',
											height: '36px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											zIndex: 10,
											opacity: 0.9,
											transition: 'all 0.2s ease-in-out'
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
											bottom: '14px',
											left: '50%',
											transform: 'translateX(-50%)',
											background: 'rgba(0, 0, 0, 0.8)',
											backdropFilter: 'blur(12px)',
											padding: '6px 14px',
											borderRadius: '18px',
											border: '1px solid rgba(255, 255, 255, 0.2)',
											zIndex: 10
										}}>
										{displayImages.map((_, idx) => (
											<button
												key={idx}
												onClick={() => goToImage(idx)}
												style={{
													width: '7px',
													height: '7px',
													borderRadius: '50%',
													border: 'none',
													background:
														idx === currentImageIndex
															? 'rgba(255, 255, 255, 0.9)'
															: 'rgba(255, 255, 255, 0.4)',
													cursor: 'pointer',
													transition: 'all 0.2s ease-in-out',
													transform:
														idx === currentImageIndex
															? 'scale(1.2)'
															: 'scale(1)'
												}}
											/>
										))}
									</Row>
								</>
							)}
						</div>
					</div>
				)}

				{/* Sophisticated Visual Separator - PrimeVue Style */}
				<div
					style={{
						width: '100%',
						height: '1px',
						background:
							'linear-gradient(90deg, transparent 0%, rgb(210, 210, 210) 20%, rgb(180, 180, 180) 50%, rgb(210, 210, 210) 80%, transparent 100%)',
						margin: '0',
						position: 'relative'
					}}>
					{/* Elegant accent point */}
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
							width: '3px',
							height: '3px',
							borderRadius: '50%',
							background: 'rgb(99, 102, 241)', // Elegant indigo accent
							opacity: 0.7
						}}
					/>
				</div>

				{/* Content Section */}
				<Column
					fillWidth
					padding='20'
					gap='12'
					horizontal='start'>
					{/* Title */}
					<Text
						variant='heading-strong-l'
						onBackground='neutral-strong'
						style={{
							lineHeight: '1.3',
							fontSize: '1.25rem',
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
							fontSize: '0.875rem',
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}}>
						{caseStudy.summary}
					</Text>

					{/* Tags Row */}
					<Row
						gap='8'
						wrap
						style={{ marginTop: '6px' }}>
						{/* Tech Stack Tags */}
						{caseStudy.techStack?.slice(0, 3).map((tech) => (
							<Tag
								key={tech}
								size='s'
								variant='neutral'
								style={{
									fontSize: '0.7rem',
									fontWeight: '500',
									padding: '5px 10px',
									borderRadius: '10px',
									backgroundColor: 'var(--neutral-alpha-weak)',
									border: '1px solid var(--neutral-alpha-medium)',
									color: 'var(--neutral-on-background-strong)',
									transition: 'all 0.2s ease-in-out'
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
									fontWeight: '500',
									padding: '5px 10px',
									borderRadius: '10px',
									backgroundColor: 'var(--accent-alpha-weak)',
									border: '1px solid var(--accent-alpha-medium)',
									color: 'var(--accent-on-background-strong)',
									transition: 'all 0.2s ease-in-out'
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
									padding: '5px 10px',
									borderRadius: '10px',
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
