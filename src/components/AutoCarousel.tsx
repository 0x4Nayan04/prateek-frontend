'use client';

import { useState, useEffect, useRef } from 'react';
import { Carousel } from '@once-ui-system/core';

interface AutoCarouselProps {
	items: Array<{
		slide: string;
		alt: string;
	}>;
	aspectRatio?: string;
	autoAdvanceInterval?: number; // in milliseconds
	className?: string;
	style?: React.CSSProperties;
}

export function AutoCarousel({
	items,
	aspectRatio = '16/9',
	autoAdvanceInterval = 3000,
	className,
	style
}: AutoCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isInView, setIsInView] = useState(false);
	const [mounted, setMounted] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	// Intersection observer to detect when carousel is in viewport
	useEffect(() => {
		if (!mounted) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{
				threshold: 0.3, // Trigger when 30% of carousel is visible
				rootMargin: '50px'
			}
		);

		if (carouselRef.current) {
			observer.observe(carouselRef.current);
		}

		return () => observer.disconnect();
	}, [mounted]);

	// Auto-advance logic when carousel is in view
	useEffect(() => {
		if (!mounted) return;

		if (isInView && items.length > 1) {
			intervalRef.current = setInterval(() => {
				setCurrentIndex((prevIndex) =>
					prevIndex === items.length - 1 ? 0 : prevIndex + 1
				);
			}, autoAdvanceInterval);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [mounted, isInView, items.length, autoAdvanceInterval]);

	// Don't render auto-advance features until mounted
	if (!mounted) {
		return (
			<div
				ref={carouselRef}
				className={className}
				style={{
					position: 'relative',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					...style
				}}>
				<div style={{ width: '100%', maxWidth: '1200px' }}>
					<Carousel
						items={items}
						aspectRatio={aspectRatio}
						indicator={items.length > 1 ? 'line' : undefined}
						controls={items.length > 1}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
						style={{
							borderRadius: '16px',
							overflow: 'hidden',
							boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
							border: '1px solid var(--neutral-alpha-medium)',
							background: 'var(--surface)'
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={carouselRef}
			className={className}
			style={{
				position: 'relative',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				...style
			}}>
			{/* Centered Carousel Container */}
			<div
				style={{
					width: '100%',
					maxWidth: '1200px',
					margin: '0 auto'
				}}>
				<Carousel
					items={items}
					aspectRatio={aspectRatio}
					indicator={items.length > 1 ? 'line' : undefined}
					controls={items.length > 1}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
					style={{
						borderRadius: '16px',
						overflow: 'hidden',
						boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
						border: '1px solid var(--neutral-alpha-medium)',
						background: 'var(--surface)',
						transition: 'all 0.3s ease-in-out'
					}}
				/>
			</div>

			{/* Enhanced Auto-advance progress indicator */}
			{mounted && isInView && items.length > 1 && (
				<div
					style={{
						position: 'absolute',
						bottom: '20px',
						right: '20px',
						background: 'rgba(0, 0, 0, 0.8)',
						color: 'white',
						padding: '8px 16px',
						borderRadius: '20px',
						fontSize: '13px',
						fontWeight: '600',
						backdropFilter: 'blur(12px)',
						border: '1px solid rgba(255, 255, 255, 0.15)',
						boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
						zIndex: 10,
						fontFamily: '"Inter", sans-serif',
						transition: 'all 0.2s ease'
					}}>
					{currentIndex + 1} / {items.length}
				</div>
			)}

			{/* Progress Bar */}
			{mounted && isInView && items.length > 1 && (
				<div
					style={{
						position: 'absolute',
						bottom: '0',
						left: '0',
						right: '0',
						height: '4px',
						background: 'rgba(0, 0, 0, 0.1)',
						borderRadius: '0 0 16px 16px',
						overflow: 'hidden',
						zIndex: 5
					}}>
					<div
						style={{
							height: '100%',
							width: `${((currentIndex + 1) / items.length) * 100}%`,
							background:
								'linear-gradient(90deg, var(--brand-on-background-strong), var(--brand-alpha-strong))',
							transition: 'width 0.3s ease',
							borderRadius: '0 0 16px 0'
						}}
					/>
				</div>
			)}
		</div>
	);
}
