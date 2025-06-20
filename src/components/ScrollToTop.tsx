'use client';

import {
	ScrollToTop as OnceUIScrollToTop,
	IconButton,
	SpacingToken
} from '@once-ui-system/core';

/**
 * ScrollToTop Component
 *
 * A beautiful, responsive scroll-to-top button that appears after scrolling past a specified offset.
 * Uses Once UI's ScrollToTop utility component with enhanced styling and smooth animations.
 *
 * Features:
 * - Single, unified design that works on all devices
 * - Beautiful glass morphism effect with backdrop blur
 * - Smooth hover animations and micro-interactions
 * - Accessibility features with proper ARIA labels
 * - Hardware-accelerated animations for performance
 *
 * Available Navigation Icons in Once UI:
 * - chevronUp: ↑ (used for scroll to top)
 * - chevronDown: ↓
 * - chevronLeft: ←
 * - chevronRight: →
 * - arrowUpRight: ↗ (diagonal)
 * - plus: +
 * - minus: -
 * - close: ✕
 * - check: ✓
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ScrollToTop />
 *
 * // Customized appearance
 * <ScrollToTop
 *   offset={500}
 *   variant="secondary"
 *   size="l"
 * />
 *
 * // Custom positioning
 * <ScrollToTop
 *   position={{ bottom: "32", right: "32" }}
 *   variant="tertiary"
 * />
 * ```
 */

interface ScrollToTopProps {
	/** Scroll offset in pixels before button becomes visible (default: 300) */
	offset?: number;
	/** Button variant style (default: 'tertiary') */
	variant?: 'primary' | 'secondary' | 'tertiary';
	/** Button size (default: 'm') */
	size?: 's' | 'm' | 'l';
	/** Position from bottom and right edges in spacing tokens */
	position?: {
		bottom?: SpacingToken;
		right?: SpacingToken;
	};
}

export function ScrollToTop({
	offset = 300,
	variant = 'tertiary',
	size = 'm',
	position = { bottom: '32' as SpacingToken, right: '32' as SpacingToken }
}: ScrollToTopProps = {}) {
	return (
		<OnceUIScrollToTop
			offset={offset}
			position='fixed'
			bottom={position.bottom}
			right={position.right}
			zIndex={10}
			className='scroll-to-top'>
			<IconButton
				icon='chevronUp'
				size={size}
				variant={variant}
				tooltip='Back to top'
				tooltipPosition='left'
				style={{
					minWidth: '40px',
					minHeight: '40px',
					borderRadius: '50%',
					background: 'var(--surface)',
					backdropFilter: 'blur(8px)',
					border: '1px solid var(--neutral-alpha-weak)',
					boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
					transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
					transform: 'translateZ(0)', // Hardware acceleration
					opacity: '0.9'
				}}
				onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
					const target = e.currentTarget;
					target.style.transform = 'translateY(-2px) translateZ(0)';
					target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
					target.style.opacity = '1';
					target.style.background = 'var(--surface)';
				}}
				onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
					const target = e.currentTarget;
					target.style.transform = 'translateY(0) translateZ(0)';
					target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
					target.style.opacity = '0.9';
					target.style.background = 'var(--surface)';
				}}
				onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
					const target = e.currentTarget;
					target.style.transform = 'translateY(0) scale(0.95) translateZ(0)';
					target.style.transition = 'all 0.1s ease';
				}}
				onMouseUp={(e: React.MouseEvent<HTMLButtonElement>) => {
					const target = e.currentTarget;
					target.style.transform = 'translateY(-2px) translateZ(0)';
					target.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
				}}
				aria-label='Scroll to top of page'
			/>
		</OnceUIScrollToTop>
	);
}
