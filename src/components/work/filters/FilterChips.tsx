'use client';

import { Icon } from '@once-ui-system/core';

interface FilterChipsProps {
	selectedFilters: {
		techStack: string[];
		industry: string[];
	};
	onRemoveFilter: (type: 'techStack' | 'industry', value: string) => void;
}

export function FilterChips({
	selectedFilters,
	onRemoveFilter
}: FilterChipsProps) {
	const allActiveFilters = [
		...selectedFilters.techStack.map((tech) => ({
			type: 'techStack' as const,
			value: tech,
			label: tech
		})),
		...selectedFilters.industry.map((industry) => ({
			type: 'industry' as const,
			value: industry,
			label: industry
		}))
	];

	if (allActiveFilters.length === 0) return null;

	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '8px',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				margin: '0',
				padding: '0'
			}}>
			{allActiveFilters.map((filter) => (
				<button
					key={`${filter.type}-${filter.value}`}
					style={{
						all: 'unset',
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '6px',
						padding: '8px 12px',
						backgroundColor: 'var(--neutral-alpha-weak)',
						border: '1px solid var(--neutral-alpha-medium)',
						borderRadius: '999px',
						fontSize: '13px',
						fontWeight: '500',
						color: 'var(--neutral-on-background-strong)',
						cursor: 'pointer',
						transition: 'opacity 0.2s ease',
						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
						lineHeight: '1.2',
						whiteSpace: 'nowrap',
						boxSizing: 'border-box',
						position: 'relative',
						overflow: 'visible',
						outline: 'none',
						textDecoration: 'none',
						userSelect: 'none',
						WebkitUserSelect: 'none',
						MozUserSelect: 'none',
						msUserSelect: 'none'
					}}
					onClick={() => onRemoveFilter(filter.type, filter.value)}
					onMouseEnter={(e) => {
						e.currentTarget.style.opacity = '0.8';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.opacity = '1';
					}}>
					<span
						style={{
							fontSize: '13px',
							fontWeight: '500',
							lineHeight: '1.2',
							whiteSpace: 'nowrap',
							margin: '0',
							padding: '0'
						}}>
						{filter.label}
					</span>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							opacity: 0.8,
							flexShrink: 0
						}}>
						<Icon
							name='close'
							size='xs'
						/>
					</div>
				</button>
			))}
		</div>
	);
}
