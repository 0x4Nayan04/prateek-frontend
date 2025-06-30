'use client';

import { Button, Icon, Row, Text } from '@once-ui-system/core';

interface FilterButtonProps {
	onClick: () => void;
	activeFilterCount: number;
}

export function FilterButton({
	onClick,
	activeFilterCount
}: FilterButtonProps) {
	const hasActiveFilters = activeFilterCount > 0;

	return (
		<Button
			onClick={onClick}
			variant={hasActiveFilters ? 'secondary' : 'tertiary'}
			size='m'
			style={{
				minWidth: 'fit-content',
				whiteSpace: 'nowrap',
				padding: '8px 16px',
				borderRadius: '12px',
				border: `1px solid ${
					hasActiveFilters
						? 'var(--brand-alpha-strong)'
						: 'var(--neutral-alpha-medium)'
				}`,
				backgroundColor: hasActiveFilters
					? 'var(--brand-alpha-weak)'
					: 'var(--neutral-alpha-weak)',
				color: hasActiveFilters
					? 'var(--brand-on-background-strong)'
					: 'var(--neutral-on-background-medium)',
				cursor: 'pointer',
				transition:
					'all var(--animation-duration-short) var(--animation-easing-standard)',
				fontSize: '0.875rem',
				fontWeight: '500',
				userSelect: 'none'
			}}>
			<Row
				gap='8'
				vertical='center'>
				<Icon
					name='filter'
					size='xs'
				/>
				<Text
					variant='body-default-s'
					style={{
						fontSize: '14px',
						fontWeight: '500'
					}}>
					{hasActiveFilters ? `Filters (${activeFilterCount})` : 'Filters'}
				</Text>
			</Row>
		</Button>
	);
}
