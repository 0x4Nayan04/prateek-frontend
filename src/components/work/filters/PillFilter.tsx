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
	return (
		<Button
			onClick={onClick}
			variant={isActive ? 'secondary' : 'tertiary'}
			size='s'
			style={{
				minWidth: 'fit-content',
				whiteSpace: 'nowrap',
				padding: '11px 18px',
				borderRadius: '26px',
				fontSize: '14px',
				fontWeight: '500',
				lineHeight: '1.2',
				cursor: 'pointer',
				transition:
					'all var(--animation-duration-short) var(--animation-easing-standard)',
				userSelect: 'none',
				boxShadow: isActive ? 'var(--shadow-m)' : 'var(--shadow-s)',
				transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
				// Tech Stack styling
				...(category === 'techStack' && {
					backgroundColor: isActive
						? 'var(--brand-alpha-medium)'
						: 'var(--brand-alpha-weak)',
					border: `1px solid ${
						isActive ? 'var(--brand-alpha-strong)' : 'var(--brand-alpha-medium)'
					}`,
					color: isActive
						? 'var(--brand-on-background-strong)'
						: 'var(--brand-on-background-medium)'
				}),
				// Industry styling
				...(category === 'industry' && {
					backgroundColor: isActive
						? 'var(--accent-alpha-medium)'
						: 'var(--accent-alpha-weak)',
					border: `1px solid ${
						isActive
							? 'var(--accent-alpha-strong)'
							: 'var(--accent-alpha-medium)'
					}`,
					color: isActive
						? 'var(--accent-on-background-strong)'
						: 'var(--accent-on-background-medium)'
				})
			}}
			onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
				if (!isActive) {
					e.currentTarget.style.transform = 'translateY(-2px)';
					e.currentTarget.style.boxShadow = 'var(--shadow-l)';
				}
			}}
			onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
				if (!isActive) {
					e.currentTarget.style.transform = 'translateY(0)';
					e.currentTarget.style.boxShadow = 'var(--shadow-s)';
				}
			}}>
			{label}
		</Button>
	);
}
