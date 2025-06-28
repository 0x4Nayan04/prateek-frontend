'use client';

import { useState } from 'react';
import { Column, RevealFx } from '@once-ui-system/core';
import { FilterButton } from './FilterButton';
import { FilterModal } from './FilterModal';
import { FilterChips } from './FilterChips';
import { useFilters } from '@/contexts/FilterContext';

interface FilterSystemProps {
	availableFilters: {
		techStack: string[];
		industry: string[];
	};
}

export function FilterSystem({ availableFilters }: FilterSystemProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { filters, setFilters, removeFilter, activeFilterCount } = useFilters();

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleFiltersChange = (newFilters: {
		techStack: string[];
		industry: string[];
	}) => {
		setFilters(newFilters);
	};

	return (
		<Column
			gap='12'
			horizontal='center'>
			<RevealFx
				translateY={4}
				delay={0.02}>
				<FilterButton
					onClick={handleOpenModal}
					activeFilterCount={activeFilterCount}
				/>
			</RevealFx>

			<FilterChips
				selectedFilters={filters}
				onRemoveFilter={removeFilter}
			/>

			<FilterModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				availableFilters={availableFilters}
				selectedFilters={filters}
				onFiltersChange={handleFiltersChange}
			/>
		</Column>
	);
}
