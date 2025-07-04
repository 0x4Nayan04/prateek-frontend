'use client';

import { Button } from '@once-ui-system/core';

interface PillFilterProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	category: 'techStack' | 'industry';
}

export function PillFilter({
	label,
	isActive,
	onClick,
	category
}: PillFilterProps) {
	// Use Once UI's proper theming approach with better color harmony
	const getVariant = () => {
		if (isActive) {
			return category === 'techStack' ? 'secondary' : 'secondary';
		}
		return 'tertiary';
	};

	const getCustomStyles = () => {
		const baseStyles = {
			minWidth: 'fit-content',
			whiteSpace: 'nowrap' as const,
			borderRadius: '24px',
			fontSize: '14px',
			fontWeight: '500',
			lineHeight: '1.2',
			cursor: 'pointer',
			transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
			userSelect: 'none' as const,
			border: '1px solid transparent',
			backdropFilter: 'blur(8px)'
		};

		if (category === 'techStack') {
			return {
				...baseStyles,
				backgroundColor: isActive
					? 'var(--brand-alpha-medium)'
					: 'var(--neutral-alpha-weak)',
				borderColor: isActive
					? 'var(--brand-alpha-strong)'
					: 'var(--neutral-alpha-medium)',
				color: isActive
					? 'var(--brand-on-background-strong)'
					: 'var(--neutral-on-background-medium)',
				boxShadow: isActive
					? '0 2px 12px -2px var(--brand-alpha-medium), 0 1px 4px -1px rgba(0, 0, 0, 0.1)'
					: '0 1px 3px -1px rgba(0, 0, 0, 0.1)'
			};
		} else {
			return {
				...baseStyles,
				backgroundColor: isActive
					? 'var(--accent-alpha-medium)'
					: 'var(--neutral-alpha-weak)',
				borderColor: isActive
					? 'var(--accent-alpha-strong)'
					: 'var(--neutral-alpha-medium)',
				color: isActive
					? 'var(--accent-on-background-strong)'
					: 'var(--neutral-on-background-medium)',
				boxShadow: isActive
					? '0 2px 12px -2px var(--accent-alpha-medium), 0 1px 4px -1px rgba(0, 0, 0, 0.1)'
					: '0 1px 3px -1px rgba(0, 0, 0, 0.1)'
			};
		}
	};

	return (
		<Button
			onClick={onClick}
			variant={getVariant()}
			size='s'
			style={getCustomStyles()}
			onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
				if (!isActive) {
					e.currentTarget.style.transform = 'translateY(-1px)';

					if (category === 'techStack') {
						// Smooth transition to brand colors for tech stack
						e.currentTarget.style.backgroundColor = 'var(--brand-alpha-weak)';
						e.currentTarget.style.borderColor = 'var(--brand-alpha-medium)';
						e.currentTarget.style.color = 'var(--brand-on-background-medium)';
						e.currentTarget.style.boxShadow =
							'0 4px 16px -4px var(--brand-alpha-weak), 0 2px 8px -2px rgba(0, 0, 0, 0.1)';
					} else {
						// Smooth transition to accent colors for industry
						e.currentTarget.style.backgroundColor = 'var(--accent-alpha-weak)';
						e.currentTarget.style.borderColor = 'var(--accent-alpha-medium)';
						e.currentTarget.style.color = 'var(--accent-on-background-medium)';
						e.currentTarget.style.boxShadow =
							'0 4px 16px -4px var(--accent-alpha-weak), 0 2px 8px -2px rgba(0, 0, 0, 0.1)';
					}
				}
			}}
			onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
				if (!isActive) {
					e.currentTarget.style.transform = 'translateY(0)';
					// Reset to neutral inactive state
					e.currentTarget.style.backgroundColor = 'var(--neutral-alpha-weak)';
					e.currentTarget.style.borderColor = 'var(--neutral-alpha-medium)';
					e.currentTarget.style.color = 'var(--neutral-on-background-medium)';
					e.currentTarget.style.boxShadow = '0 1px 3px -1px rgba(0, 0, 0, 0.1)';
				}
			}}>
			{label}
		</Button>
	);
}
