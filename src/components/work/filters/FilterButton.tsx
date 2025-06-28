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
				borderRadius: '999px',
				padding: '12px 20px',
				background: hasActiveFilters
					? 'var(--neutral-alpha-medium)'
					: 'var(--neutral-alpha-weak)',
				border: hasActiveFilters
					? '1px solid var(--neutral-alpha-strong)'
					: '1px solid var(--neutral-alpha-medium)',
				color: hasActiveFilters
					? 'var(--neutral-on-background-strong)'
					: 'var(--neutral-on-background-medium)',
				transition: 'all 0.2s ease',
				fontWeight: '500'
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
