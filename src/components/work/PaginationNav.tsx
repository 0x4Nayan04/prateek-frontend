'use client';

import { Row, Column, Text, Line, RevealFx } from '@once-ui-system/core';

interface CaseStudy {
	slug: { current: string };
	title: string;
}

interface PaginationNavProps {
	previousCaseStudy: CaseStudy | null;
	nextCaseStudy: CaseStudy | null;
	currentIndex: number;
	totalCaseStudies: number;
}

export default function PaginationNav({
	previousCaseStudy,
	nextCaseStudy,
	currentIndex,
	totalCaseStudies
}: PaginationNavProps) {
	if (!previousCaseStudy && !nextCaseStudy) return null;

	return (
		<RevealFx
			translateY={8}
			delay={0.05}>
			<Column
				fillWidth
				gap='24'>
				<Line
					fillWidth
					background='neutral-alpha-medium'
				/>
				<Row
					fillWidth
					gap='24'
					paddingY='24'
					mobileDirection='column'
					horizontal='space-between'
					vertical='center'>
					{/* Previous Case Study */}
					<Column
						style={{
							flex: '1'
						}}>
						{previousCaseStudy ? (
							<a
								href={`/work/${previousCaseStudy.slug.current}`}
								style={{
									all: 'unset',
									textDecoration: 'none',
									cursor: 'pointer',
									maxWidth: '300px'
								}}>
								<Row
									gap='12'
									padding='16'
									vertical='center'
									horizontal='start'
									radius='m'
									style={{
										transition: 'all 0.2s ease-in-out',
										backgroundColor: 'transparent'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											'var(--neutral-alpha-weak)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = 'transparent';
									}}>
									{/* Arrow Icon */}
									<Row
										vertical='center'
										horizontal='center'
										style={{
											flexShrink: 0,
											width: '20px',
											height: '20px'
										}}>
										<svg
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											style={{
												color: 'var(--neutral-on-background-medium)'
											}}>
											<path d='m15 18-6-6 6-6' />
										</svg>
									</Row>

									{/* Text Content */}
									<Column
										gap='2'
										fillWidth>
										<Text
											variant='label-default-xs'
											onBackground='neutral-medium'
											style={{
												fontSize: '11px',
												textTransform: 'uppercase',
												letterSpacing: '0.8px',
												fontWeight: '500',
												lineHeight: '1'
											}}>
											Previous
										</Text>
										<Text
											variant='body-default-s'
											onBackground='neutral-strong'
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												fontWeight: '600',
												fontSize: '14px',
												lineHeight: '1.3'
											}}>
											{previousCaseStudy.title}
										</Text>
									</Column>
								</Row>
							</a>
						) : (
							<div />
						)}
					</Column>

					{/* Navigation Indicator */}
					<Column
						horizontal='center'
						vertical='center'
						style={{
							flexShrink: 0,
							padding: '10px 16px',
							backgroundColor: 'var(--neutral-alpha-weak)',
							borderRadius: '8px',
							border: '1px solid var(--neutral-alpha-medium)'
						}}>
						<Text
							variant='body-default-s'
							onBackground='neutral-strong'
							style={{
								fontFamily: '"Inter", sans-serif',
								fontSize: '14px',
								fontWeight: '600'
							}}>
							{currentIndex + 1} of {totalCaseStudies}
						</Text>
					</Column>

					{/* Next Case Study */}
					<Column
						style={{
							flex: '1'
						}}
						horizontal='end'>
						{nextCaseStudy ? (
							<a
								href={`/work/${nextCaseStudy.slug.current}`}
								style={{
									all: 'unset',
									textDecoration: 'none',
									cursor: 'pointer',
									maxWidth: '300px'
								}}>
								<Row
									gap='12'
									padding='16'
									vertical='center'
									horizontal='end'
									radius='m'
									style={{
										transition: 'all 0.2s ease-in-out',
										backgroundColor: 'transparent'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											'var(--neutral-alpha-weak)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = 'transparent';
									}}>
									{/* Text Content */}
									<Column
										gap='2'
										fillWidth
										horizontal='end'>
										<Text
											variant='label-default-xs'
											onBackground='neutral-medium'
											align='right'
											style={{
												fontSize: '11px',
												textTransform: 'uppercase',
												letterSpacing: '0.8px',
												fontWeight: '500',
												lineHeight: '1'
											}}>
											Next
										</Text>
										<Text
											variant='body-default-s'
											onBackground='neutral-strong'
											align='right'
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												fontWeight: '600',
												fontSize: '14px',
												lineHeight: '1.3'
											}}>
											{nextCaseStudy.title}
										</Text>
									</Column>

									{/* Arrow Icon */}
									<Row
										vertical='center'
										horizontal='center'
										style={{
											flexShrink: 0,
											width: '20px',
											height: '20px'
										}}>
										<svg
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2.5'
											style={{
												color: 'var(--neutral-on-background-medium)'
											}}>
											<path d='m9 18 6-6-6-6' />
										</svg>
									</Row>
								</Row>
							</a>
						) : (
							<div />
						)}
					</Column>
				</Row>
			</Column>
		</RevealFx>
	);
}
