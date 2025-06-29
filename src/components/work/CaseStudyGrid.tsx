'use client';

import {
	Column,
	Row,
	Grid,
	Text,
	Heading,
	RevealFx
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { CaseStudyCard } from './CaseStudyCard';

interface CaseStudyGridProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	maxItems?: number;
	columns?: {
		desktop: number;
		tablet: number;
		mobile: number;
	};
}

export function CaseStudyGrid({
	caseStudies,
	title,
	description,
	maxItems,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: CaseStudyGridProps) {
	const displayedCaseStudies = maxItems
		? caseStudies.slice(0, maxItems)
		: caseStudies;

	const hasResults = displayedCaseStudies.length > 0;
	const totalResults = caseStudies.length;

	return (
		<Column
			fillWidth
			gap='32'>
			{/* Title and Filters */}
			<Column
				fillWidth
				gap='24'>
				{/* Title */}
				{title && (
					<RevealFx
						translateY={6}
						delay={0.02}>
						<Heading
							variant='display-strong-l'
							align='center'
							onBackground='neutral-strong'>
							{title}
						</Heading>
					</RevealFx>
				)}
			</Column>

			{/* Results */}
			<Column
				fillWidth
				gap='32'>
				{/* Grid */}
				{displayedCaseStudies.length > 0 ? (
					<RevealFx
						translateY={8}
						delay={0.06}>
						<Grid
							columns='2'
							tabletColumns='2'
							mobileColumns='1'
							fillWidth
							gap='16'
							style={{
								display: 'grid',
								gridTemplateRows: 'repeat(auto-fit, minmax(480px, 1fr))',
								justifyItems: 'center',
								alignItems: 'stretch',
								gap: '16px',
								gridAutoFlow: 'row',
								alignContent: 'start',
								paddingLeft: 'clamp(16px, 3vw, 32px)',
								paddingRight: 'clamp(16px, 3vw, 32px)'
							}}>
							{displayedCaseStudies.map((caseStudy, index) => (
								<div
									key={caseStudy._id}
									style={{
										width: '100%',
										maxWidth: '500px',
										height: '480px',
										display: 'flex',
										flexDirection: 'column'
									}}>
									<CaseStudyCard
									caseStudy={caseStudy}
									index={index}
										priority={index < 4}
								/>
								</div>
							))}
						</Grid>
					</RevealFx>
				) : (
					<Text
						variant='body-default-m'
						onBackground='neutral-medium'
						align='center'>
						No case studies match the selected filters.
					</Text>
				)}
			</Column>
		</Column>
	);
}
