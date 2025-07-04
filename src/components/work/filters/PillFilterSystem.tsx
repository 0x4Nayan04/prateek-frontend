'use client';

import { Button, Column, RevealFx } from '@once-ui-system/core';
import { PillFilter } from './PillFilter';
import { useFilters } from '@/contexts/FilterContext';
import styles from './PillFilterSystem.module.css';

interface PillFilterSystemProps {
	availableFilters: {
		techStack: string[];
		industry: string[];
	};
}

export function PillFilterSystem({ availableFilters }: PillFilterSystemProps) {
	const { filters, setFilters, clearFilters, activeFilterCount } = useFilters();

	const handleTechStackToggle = (tech: string) => {
		const newTechStack = filters.techStack.includes(tech)
			? filters.techStack.filter((t) => t !== tech)
			: [...filters.techStack, tech];

		setFilters({
			...filters,
			techStack: newTechStack
		});
	};

	const handleIndustryToggle = (industry: string) => {
		const newIndustry = filters.industry.includes(industry)
			? filters.industry.filter((i) => i !== industry)
			: [...filters.industry, industry];

		setFilters({
			...filters,
			industry: newIndustry
		});
	};

	const handleClearAll = () => {
		clearFilters();
	};

	// Combine all pills with their categories
	const techStackPills = availableFilters.techStack.map((tech) => ({
		label: tech,
		isActive: filters.techStack.includes(tech),
		category: 'techStack' as const,
		onClick: () => handleTechStackToggle(tech)
	}));

	const industryPills = availableFilters.industry.map((industry) => ({
		label: industry,
		isActive: filters.industry.includes(industry),
		category: 'industry' as const,
		onClick: () => handleIndustryToggle(industry)
	}));

	const allPills = [...techStackPills, ...industryPills];

	return (
		<Column
			fillWidth
			gap='20'
			horizontal='center'>
			<RevealFx
				translateY={4}
				delay={0.02}
				fillWidth
				horizontal='center'>
				{/* Pills Container */}
				<div className={styles.pillFilterContainer}>
					{/* Tech Stack Pills */}
					<div className={`${styles.pillGroup} ${styles.pillGroupTech}`}>
						{techStackPills.map((pill) => (
							<PillFilter
								key={`tech-${pill.label}`}
								label={pill.label}
								isActive={pill.isActive}
								onClick={pill.onClick}
								category={pill.category}
							/>
						))}
					</div>

					{/* Vertical Divider */}
					<div className={styles.pillDivider} />

					{/* Industry Pills */}
					<div className={`${styles.pillGroup} ${styles.pillGroupIndustry}`}>
						{industryPills.map((pill) => (
							<PillFilter
								key={`industry-${pill.label}`}
								label={pill.label}
								isActive={pill.isActive}
								onClick={pill.onClick}
								category={pill.category}
							/>
						))}
					</div>

					{/* Clear All Button */}
					{activeFilterCount > 0 && (
						<Button
							onClick={handleClearAll}
							variant='tertiary'
							size='s'>
							Clear All
						</Button>
					)}
				</div>
			</RevealFx>
		</Column>
	);
}
