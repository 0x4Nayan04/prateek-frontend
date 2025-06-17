'use client';

import { useState } from 'react';
import {
	Column,
	Row,
	Heading,
	Text,
	Button,
	Icon,
	Line,
	Tag
} from '@once-ui-system/core';
import { FilterState, AvailableFilters } from '@/lib/sanity/types';

interface FilterSidebarProps {
	filters: FilterState;
	availableFilters: AvailableFilters;
	onFiltersChange: (filters: FilterState) => void;
	isCollapsed?: boolean;
	onToggleCollapse?: () => void;
	className?: string;
}

export function FilterSidebar({
	filters,
	availableFilters,
	onFiltersChange,
	isCollapsed = false,
	onToggleCollapse,
	className
}: FilterSidebarProps) {
	const [techStackExpanded, setTechStackExpanded] = useState(true);
	const [industryExpanded, setIndustryExpanded] = useState(true);

	const clearAllFilters = () => {
		onFiltersChange({ techStack: [], industry: [] });
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

	const hasActiveFilters =
		filters.techStack.length > 0 || filters.industry.length > 0;
	const totalActiveFilters = filters.techStack.length + filters.industry.length;

	return (
		<Column
			gap='20'
			padding='20'
			background='surface'
			border='neutral-alpha-weak'
			radius='l'
			className={className}
			style={{
				height: 'fit-content',
				position: 'sticky',
				top: '100px',
				minWidth: '280px'
			}}>
			{/* Header */}
			<Row horizontal='space-between' vertical='center'>
				<Row gap='8' vertical='center'>
					<Heading variant='heading-strong-s'>Filters</Heading>
					{totalActiveFilters > 0 && (
						<Tag
							size='s'
							variant='brand'>
							{totalActiveFilters}
						</Tag>
					)}
				</Row>
				{onToggleCollapse && (
					<Button
						variant='tertiary'
						size='s'
						onClick={onToggleCollapse}
						prefixIcon={isCollapsed ? 'chevronDown' : 'chevronUp'}
					/>
				)}
			</Row>

			{!isCollapsed && (
				<>
					{/* Clear All Filters */}
					{hasActiveFilters && (
						<>
							<Button
								variant='secondary'
								size='s'
								onClick={clearAllFilters}
								fillWidth>
								Clear All Filters
							</Button>
							<Line background='neutral-alpha-medium' />
						</>
					)}

					{/* Tech Stack Section */}
					<Column gap='12'>
						<Button
							variant='tertiary'
							size='s'
							onClick={() => setTechStackExpanded(!techStackExpanded)}
							style={{ justifyContent: 'space-between' }}>
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
							<Icon
								name={techStackExpanded ? 'chevronUp' : 'chevronDown'}
								size='s'
							/>
						</Button>

						{techStackExpanded && (
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
						)}
					</Column>

					<Line background='neutral-alpha-medium' />

					{/* Industry Section */}
					<Column gap='12'>
						<Button
							variant='tertiary'
							size='s'
							onClick={() => setIndustryExpanded(!industryExpanded)}
							style={{ justifyContent: 'space-between' }}>
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
							<Icon
								name={industryExpanded ? 'chevronUp' : 'chevronDown'}
								size='s'
							/>
						</Button>

						{industryExpanded && (
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
						)}
					</Column>
				</>
			)}
		</Column>
	);
}
