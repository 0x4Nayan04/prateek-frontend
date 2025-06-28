'use client';

import { useEffect, useState } from 'react';
import {
	Button,
	Checkbox,
	Column,
	Dialog,
	Row,
	Text
} from '@once-ui-system/core';

interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	availableFilters: {
		techStack: string[];
		industry: string[];
	};
	selectedFilters: {
		techStack: string[];
		industry: string[];
	};
	onFiltersChange: (filters: {
		techStack: string[];
		industry: string[];
	}) => void;
}

export function FilterModal({
	isOpen,
	onClose,
	availableFilters,
	selectedFilters,
	onFiltersChange
}: FilterModalProps) {
	const [localFilters, setLocalFilters] = useState(selectedFilters);

	// Update local state when props change
	useEffect(() => {
		setLocalFilters(selectedFilters);
	}, [selectedFilters]);

	const handleTechStackToggle = (tech: string) => {
		const newTechStack = localFilters.techStack.includes(tech)
			? localFilters.techStack.filter((t) => t !== tech)
			: [...localFilters.techStack, tech];

		const newFilters = {
			...localFilters,
			techStack: newTechStack
		};

		setLocalFilters(newFilters);
		onFiltersChange(newFilters); // Auto-apply
	};

	const handleIndustryToggle = (industry: string) => {
		const newIndustry = localFilters.industry.includes(industry)
			? localFilters.industry.filter((i) => i !== industry)
			: [...localFilters.industry, industry];

		const newFilters = {
			...localFilters,
			industry: newIndustry
		};

		setLocalFilters(newFilters);
		onFiltersChange(newFilters); // Auto-apply
	};

	const handleClearAll = () => {
		const clearedFilters = {
			techStack: [],
			industry: []
		};
		setLocalFilters(clearedFilters);
		onFiltersChange(clearedFilters);
	};

	const hasActiveFilters =
		localFilters.techStack.length > 0 || localFilters.industry.length > 0;

	return (
		<div
			style={{
				position: 'fixed',
				top: '80px',
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 9999,
				pointerEvents: isOpen ? 'auto' : 'none',
				paddingTop: '24px'
			}}>
			<Dialog
				isOpen={isOpen}
				onClose={onClose}
				title='Filter Case Studies'
				maxWidth={48}
				style={{
					marginTop: '0'
				}}
				footer={
					<Row
						fillWidth
						horizontal='space-between'
						vertical='center'>
						<Button
							variant='tertiary'
							size='s'
							onClick={handleClearAll}
							disabled={!hasActiveFilters}>
							Clear All
						</Button>
						<Button
							variant='primary'
							size='s'
							onClick={onClose}>
							Done
						</Button>
					</Row>
				}>
				<Column
					gap='24'
					fillWidth
					style={{
						maxHeight: '60vh',
						overflowY: 'auto'
					}}>
					{/* Tech Stack Section */}
					<Column gap='16'>
						<Text
							variant='heading-strong-s'
							onBackground='neutral-strong'
							style={{
								letterSpacing: '0.02em',
								fontWeight: '600',
								textTransform: 'none'
							}}>
							Tech stack
						</Text>
						<Column gap='12'>
							{availableFilters.techStack.map((tech) => (
								<div
									key={tech}
									className='checkbox-wrapper'
									style={{
										display: 'flex',
										alignItems: 'center',
										width: '100%'
									}}>
									<Checkbox
										label={tech}
										isChecked={localFilters.techStack.includes(tech)}
										onToggle={() => handleTechStackToggle(tech)}
										style={{
											width: '100%'
										}}
										data-border='rounded'
									/>
								</div>
							))}
						</Column>
					</Column>

					{/* Industry Section */}
					<Column gap='16'>
						<Text
							variant='heading-strong-s'
							onBackground='neutral-strong'
							style={{
								letterSpacing: '0.02em',
								fontWeight: '600',
								textTransform: 'none'
							}}>
							Industry
						</Text>
						<Column gap='12'>
							{availableFilters.industry.map((industry) => (
								<div
									key={industry}
									className='checkbox-wrapper'
									style={{
										display: 'flex',
										alignItems: 'center',
										width: '100%'
									}}>
									<Checkbox
										label={industry}
										isChecked={localFilters.industry.includes(industry)}
										onToggle={() => handleIndustryToggle(industry)}
										style={{
											width: '100%'
										}}
										data-border='rounded'
									/>
								</div>
							))}
						</Column>
					</Column>
				</Column>
			</Dialog>
		</div>
	);
}
