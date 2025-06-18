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
				style={{ position: 'relative', ...style }}>
				<Carousel
					items={items}
					aspectRatio={aspectRatio}
					indicator={items.length > 1 ? 'line' : undefined}
					controls={items.length > 1}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
					style={{
						borderRadius: '12px',
						overflow: 'hidden',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
						border: '1px solid var(--neutral-alpha-medium)'
					}}
				/>
			</div>
		);
	}

	return (
		<div
			ref={carouselRef}
			className={className}
			style={{ position: 'relative', ...style }}>
			<Carousel
				items={items}
				aspectRatio={aspectRatio}
				indicator={items.length > 1 ? 'line' : undefined}
				controls={items.length > 1}
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
				style={{
					borderRadius: '12px',
					overflow: 'hidden',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
					border: '1px solid var(--neutral-alpha-medium)'
				}}
			/>

			{/* Auto-advance progress indicator - only show when mounted */}
			{mounted && isInView && items.length > 1 && (
				<div
					style={{
						position: 'absolute',
						bottom: '16px',
						right: '16px',
						background: 'rgba(0, 0, 0, 0.7)',
						color: 'white',
						padding: '6px 12px',
						borderRadius: '16px',
						fontSize: '12px',
						fontWeight: '600',
						backdropFilter: 'blur(8px)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						zIndex: 10
					}}>
					{currentIndex + 1} / {items.length}
				</div>
			)}
		</div>
	);
}
