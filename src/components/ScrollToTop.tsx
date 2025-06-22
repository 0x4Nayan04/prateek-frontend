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
 * - A clean, solid white design that fits with the portfolio's UI
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
	/** Button variant style (default: 'secondary') */
	variant?: 'primary' | 'secondary' | 'tertiary';
	/** Button size (default: 'l') */
	size?: 's' | 'm' | 'l';
	/** Position from bottom and right edges in spacing tokens */
	position?: {
		bottom?: SpacingToken;
		right?: SpacingToken;
	};
}

export function ScrollToTop({
	offset = 300,
	variant = 'primary',
	size = 'l',
	position = { bottom: '24' as SpacingToken, right: '24' as SpacingToken }
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
				aria-label='Scroll to top of page'
			/>
		</OnceUIScrollToTop>
	);
}
