'use client';

import {
	Column,
	Row,
	Grid,
	Text,
	Heading,
	RevealFx,
	Button
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { ModernCaseStudyCard } from './ModernCaseStudyCard';

interface ModernCaseStudyGridProps {
	caseStudies: CaseStudy[];
	title?: string;
	description?: string;
	maxItems?: number;
	showViewAllButton?: boolean;
	columns?: {
		desktop: number;
		tablet: number;
		mobile: number;
	};
}

export function ModernCaseStudyGrid({
	caseStudies,
	title,
	description,
	maxItems,
	showViewAllButton = false,
	columns = { desktop: 2, tablet: 2, mobile: 1 }
}: ModernCaseStudyGridProps) {
	const displayedCaseStudies = maxItems
		? caseStudies.slice(0, maxItems)
		: caseStudies;

	const hasResults = displayedCaseStudies.length > 0;
	const totalResults = caseStudies.length;
	const hasMoreResults = maxItems && totalResults > maxItems;

	return (
		<Column
			fillWidth
			gap='16'>
			{/* Header */}
			{title && (
				<RevealFx
					translateY={6}
					delay={0.02}
					fillWidth
					horizontal='center'
					paddingBottom='8'>
					<Column
						horizontal='center'
						gap='8'>
						<Heading
							wrap='balance'
							variant='display-strong-l'
							align='center'
							style={{
								fontSize: 'clamp(2rem, 8vw, 3rem)',
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
							lineHeight: '1.6'
						}}>
						{description}
					</Text>
				</RevealFx>
			)}

			{/* Main Content */}
			<Row
				fillWidth
				horizontal='center'>
				<Column
					fillWidth
					paddingX='l'>
					{/* Grid Container with consistent spacing */}
					<Column
						fillWidth
						paddingX='l'
						style={{
							paddingLeft: 'clamp(8px, 2vw, 48px)',
							paddingRight: 'clamp(8px, 2vw, 48px)'
						}}
						gap='s'>
						{hasResults ? (
							<>
								<Grid
									columns={columns.desktop as any}
									tabletColumns={columns.tablet as any}
									mobileColumns={columns.mobile as any}
									gap='64'
									fillWidth
									style={{
										alignItems: 'stretch'
									}}>
									{displayedCaseStudies.map((caseStudy, index) => (
										<ModernCaseStudyCard
											key={caseStudy._id}
											caseStudy={caseStudy}
											index={index}
											priority={index < 4}
										/>
									))}
								</Grid>

								{/* View All Button */}
								{(showViewAllButton || hasMoreResults) && (
									<RevealFx
										translateY={8}
										horizontal='center'
										delay={0.08}>
										<Column
											center
											paddingTop='32'>
											<Button
												id='view-all-case-studies'
												href='/work'
												variant='primary'
												size='l'
												arrowIcon>
												Show more case studies
												{hasMoreResults &&
													` (${totalResults - displayedCaseStudies.length} more)`}
											</Button>
										</Column>
									</RevealFx>
								)}
							</>
						) : (
							<RevealFx
								translateY={8}
								delay={0.06}>
								<Column
									fillWidth
									center
									padding='xl'
									gap='20'
									background='surface'
									border='neutral-alpha-weak'
									radius='xl'
									style={{
										minHeight: '200px'
									}}>
									<Text
										variant='heading-strong-l'
										onBackground='neutral-strong'
										align='center'>
										No case studies found
									</Text>
									<Text
										variant='body-default-m'
										onBackground='neutral-weak'
										align='center'>
										Check back later for new case studies.
									</Text>
								</Column>
							</RevealFx>
						)}
					</Column>
				</Column>
			</Row>
		</Column>
	);
}
