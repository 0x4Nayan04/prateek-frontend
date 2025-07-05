import { CaseStudy } from '@/lib/sanity/types';
import { CleanCaseStudyCard } from './CleanCaseStudyCard';
import { Column, Heading, Text, RevealFx } from '@once-ui-system/core';

interface CleanCaseStudyGridProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	maxItems?: number;
}

export function CleanCaseStudyGrid({
	caseStudies,
	title,
	description,
	maxItems
}: CleanCaseStudyGridProps) {
	const displayedCaseStudies = maxItems
		? caseStudies.slice(0, maxItems)
		: caseStudies;

	const hasResults = displayedCaseStudies.length > 0;

	return (
		<div className='layout-container'>
			<Column
				fillWidth
				gap='xl'>
				{/* Header */}
				{title && (
					<RevealFx
						translateY={6}
						delay={0.02}
						fillWidth
						horizontal='center'>
						<Column
							horizontal='center'
							gap='s'>
							<Heading
								variant='display-strong-l'
								align='center'
								style={{
									fontSize: 'clamp(2rem, 5vw, 3rem)',
									lineHeight: '1.2'
								}}>
								{title}
							</Heading>
						</Column>
					</RevealFx>
				)}

				{/* Description */}
				{description && (
					<RevealFx
						translateY={6}
						delay={0.04}
						fillWidth
						horizontal='center'>
						<Text
							variant='body-default-l'
							onBackground='neutral-medium'
							align='center'
							style={{
								maxWidth: '600px',
								lineHeight: '1.6',
								margin: '0 auto'
							}}>
							{description}
						</Text>
					</RevealFx>
				)}

				{/* Grid */}
				{hasResults ? (
					<RevealFx
						translateY={8}
						delay={0.08}>
						<div className='grid-responsive'>
							{displayedCaseStudies.map((caseStudy, index) => (
								<CleanCaseStudyCard
									key={caseStudy._id}
									caseStudy={caseStudy}
									index={index}
									priority={index < 4}
								/>
							))}
						</div>
					</RevealFx>
				) : (
					<RevealFx
						translateY={8}
						delay={0.08}>
						<Column
							center
							gap='l'
							style={{
								padding: 'var(--space-2xl)',
								background: 'var(--surface)',
								border: '1px solid var(--neutral-alpha-weak)',
								borderRadius: '12px',
								textAlign: 'center'
							}}>
							<Text
								variant='heading-strong-l'
								onBackground='neutral-strong'>
								No case studies found
							</Text>
							<Text
								variant='body-default-m'
								onBackground='neutral-weak'>
								Check back later for new case studies.
							</Text>
						</Column>
					</RevealFx>
				)}
			</Column>
		</div>
	);
}
