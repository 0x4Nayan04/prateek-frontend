'use client';

import { useState } from 'react';
import {
	Column,
	Row,
	Text,
	Button,
	Icon,
	Line,
	Tag,
	DropdownWrapper
} from '@once-ui-system/core';
import { FilterState, AvailableFilters } from '@/lib/sanity/types';

interface FilterDropdownProps {
	filters: FilterState;
	availableFilters: AvailableFilters;
	onFiltersChange: (filters: FilterState) => void;
	className?: string;
}

export function FilterDropdown({
	filters,
	availableFilters,
	onFiltersChange,
	className
}: FilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);

	const clearAllFilters = () => {
		onFiltersChange({ techStack: [], industry: [] });
		setIsOpen(false);
	};

	const handleTechStackToggle = (tech: string) => {
		const newTechStack = filters.techStack.includes(tech)
			? filters.techStack.filter((t) => t !== tech)
			: [...filters.techStack, tech];

		onFiltersChange({ ...filters, techStack: newTechStack });
	};

	const handleIndustryToggle = (industry: string) => {
		const newIndustry = filters.industry.includes(industry)
			? filters.industry.filter((i) => i !== industry)
			: [...filters.industry, industry];

		onFiltersChange({ ...filters, industry: newIndustry });
	};

	const totalActiveFilters = filters.techStack.length + filters.industry.length;
	const hasActiveFilters = totalActiveFilters > 0;

	return (
		<DropdownWrapper
			isOpen={isOpen}
			onOpenChange={setIsOpen}
			minHeight={400}
			className={className}
			trigger={
				<Button
					variant='secondary'
					size='m'
					suffixIcon='chevronDown'
					onClick={() => setIsOpen(!isOpen)}>
					<Row
						gap='8'
						vertical='center'>
						<Icon
							name='filter'
							size='s'
						/>
						<Text variant='body-default-s'>Filters</Text>
						{hasActiveFilters && (
							<Tag
								size='s'
								variant='brand'>
								{totalActiveFilters}
							</Tag>
						)}
					</Row>
				</Button>
			}
			dropdown={
				<Column
					fillWidth
					minWidth={16}
					maxWidth={20}>
					{/* Header */}
					<Column
						padding='16'
						fillWidth
						position='sticky'
						top='0'
						background='surface'
						zIndex={1}>
						<Row
							horizontal='space-between'
							vertical='center'>
							<Text variant='label-strong-m'>Filter Case Studies</Text>
							{hasActiveFilters && (
								<Button
									variant='tertiary'
									size='s'
									onClick={clearAllFilters}>
									Clear All
								</Button>
							)}
						</Row>
					</Column>

					<Column
						fillWidth
						gap='16'
						padding='16'>
						{/* Tech Stack Section */}
						<Column gap='12'>
							<Row
								gap='8'
								vertical='center'>
								<Icon
									name='code'
									size='s'
								/>
								<Text
									variant='label-strong-s'
									onBackground='neutral-strong'>
									Tech Stack
								</Text>
								{filters.techStack.length > 0 && (
									<Tag
										size='s'
										variant='neutral'>
										{filters.techStack.length}
									</Tag>
								)}
							</Row>

							<Column
								gap='8'
								paddingLeft='8'>
								{availableFilters.techStack.length > 0 ? (
									availableFilters.techStack.map((tech) => (
										<Button
											key={tech}
											variant='tertiary'
											size='s'
											onClick={() => handleTechStackToggle(tech)}
											style={{
												justifyContent: 'flex-start',
												opacity: filters.techStack.includes(tech) ? 1 : 0.7,
												background: filters.techStack.includes(tech)
													? 'var(--neutral-alpha-weak)'
													: 'transparent'
											}}>
											<Row
												gap='8'
												vertical='center'>
												<Icon
													name={
														filters.techStack.includes(tech) ? 'check' : 'plus'
													}
													size='xs'
												/>
												<Text variant='body-default-s'>{tech}</Text>
											</Row>
										</Button>
									))
								) : (
									<Text
										variant='body-default-s'
										onBackground='neutral-weak'>
										No tech stack options available
									</Text>
								)}
							</Column>
						</Column>

						<Line background='neutral-alpha-medium' />

						{/* Industry Section */}
						<Column gap='12'>
							<Row
								gap='8'
								vertical='center'>
								<Icon
									name='briefcase'
									size='s'
								/>
								<Text
									variant='label-strong-s'
									onBackground='neutral-strong'>
									Industry
								</Text>
								{filters.industry.length > 0 && (
									<Tag
										size='s'
										variant='brand'>
										{filters.industry.length}
									</Tag>
								)}
							</Row>

							<Column
								gap='8'
								paddingLeft='8'>
								{availableFilters.industry.length > 0 ? (
									availableFilters.industry.map((industry) => (
										<Button
											key={industry}
											variant='tertiary'
											size='s'
											onClick={() => handleIndustryToggle(industry)}
											style={{
												justifyContent: 'flex-start',
												opacity: filters.industry.includes(industry) ? 1 : 0.7,
												background: filters.industry.includes(industry)
													? 'var(--brand-alpha-weak)'
													: 'transparent'
											}}>
											<Row
												gap='8'
												vertical='center'>
												<Icon
													name={
														filters.industry.includes(industry)
															? 'check'
															: 'plus'
													}
													size='xs'
												/>
												<Text variant='body-default-s'>{industry}</Text>
											</Row>
										</Button>
									))
								) : (
									<Text
										variant='body-default-s'
										onBackground='neutral-weak'>
										No industry options available
									</Text>
								)}
							</Column>
						</Column>

						{/* Apply Button */}
						<Button
							variant='primary'
							size='m'
							onClick={() => setIsOpen(false)}
							fillWidth>
							Apply Filters
						</Button>
					</Column>
				</Column>
			}
		/>
	);
}
