'use client';

import {
	Button,
	Column,
	Row,
	RevealFx,
	Line,
	Text
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import styles from './CleanPagination.module.scss';

interface CleanPaginationProps {
	currentSlug: string;
	allCaseStudies: CaseStudy[];
}

export function CleanPagination({
	currentSlug,
	allCaseStudies
}: CleanPaginationProps) {
	const currentIndex = allCaseStudies.findIndex(
		(study) => study.slug.current === currentSlug
	);

	const previousCaseStudy =
		currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null;
	const nextCaseStudy =
		currentIndex < allCaseStudies.length - 1
			? allCaseStudies[currentIndex + 1]
			: null;

	if (!previousCaseStudy && !nextCaseStudy) {
		return null;
	}

	return (
		<div className={styles.paginationContainer}>
			<RevealFx
				translateY={8}
				delay={0.05}>
				{/* Desktop Pagination */}
				<Column
					fillWidth
					gap='24'
					className={styles.desktopPagination}>
					<Line
						fillWidth
						background='neutral-alpha-medium'
					/>
					<Row
						fillWidth
						gap='24'
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
										gap='8'
										padding='12'
										vertical='center'
										horizontal='start'
										radius='m'
										style={{
											transition: 'all 0.2s ease-in-out',
											borderRadius: '8px',
											minHeight: '44px'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor =
												'var(--neutral-alpha-weak)';
											e.currentTarget.style.transform = 'translateX(-2px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = 'transparent';
											e.currentTarget.style.transform = 'translateX(0px)';
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
												width='14'
												height='14'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2'
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
												PREVIOUS
											</Text>
											<Text
												variant='body-default-s'
												onBackground='neutral-strong'
												style={{
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													fontSize: '14px',
													fontWeight: '600',
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
								padding: '12px 16px',
								backgroundColor: 'var(--neutral-alpha-weak)',
								borderRadius: '8px',
								border: '1px solid var(--neutral-alpha-medium)',
								minHeight: '40px'
							}}>
							<Text
								variant='body-default-s'
								onBackground='neutral-strong'
								style={{
									fontSize: '13px',
									fontWeight: '500'
								}}>
								{currentIndex + 1} of {allCaseStudies.length}
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
										gap='8'
										padding='12'
										vertical='center'
										horizontal='end'
										radius='m'
										style={{
											transition: 'all 0.2s ease-in-out',
											borderRadius: '8px',
											minHeight: '44px'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor =
												'var(--neutral-alpha-weak)';
											e.currentTarget.style.transform = 'translateX(2px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = 'transparent';
											e.currentTarget.style.transform = 'translateX(0px)';
										}}>
										{/* Text Content */}
										<Column
											gap='2'
											fillWidth
											horizontal='end'>
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
												NEXT
											</Text>
											<Text
												variant='body-default-s'
												onBackground='neutral-strong'
												align='right'
												style={{
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													fontSize: '14px',
													fontWeight: '600',
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
												width='14'
												height='14'
												viewBox='0 0 24 24'
												fill='none'
												stroke='currentColor'
												strokeWidth='2'
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
				{/* Mobile Pagination */}
				<div className={styles.mobilePagination}>
					<Row
						gap='12'
						className={styles.alignBaseline}>
						{/* Previous Button */}
						<a
							href={
								previousCaseStudy
									? `/work/${previousCaseStudy.slug.current}`
									: undefined
							}
							className={`${styles.mobileNavBtn} ${!previousCaseStudy ? styles.disabled : ''}`}>
							<Row
								align='center'
								gap='8'>
								<div className={styles.mobileNavIcon}>
									<svg
										width='14'
										height='14'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'>
										<path d='m15 18-6-6 6-6' />
									</svg>
								</div>
								<span className={styles.mobileNavText}>Previous</span>
							</Row>
						</a>

						{/* Page Counter */}
						<div className={styles.mobileCounter}>
							{currentIndex + 1} of {allCaseStudies.length}
						</div>

						{/* Next Button */}
						<a
							href={
								nextCaseStudy
									? `/work/${nextCaseStudy.slug.current}`
									: undefined
							}
							className={`${styles.mobileNavBtn} ${!nextCaseStudy ? styles.disabled : ''}`}>
							<Row
								align='center'
								gap='8'>
								<span className={styles.mobileNavText}>Next</span>
								<div className={styles.mobileNavIcon}>
									<svg
										width='14'
										height='14'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'>
										<path d='m9 18 6-6-6-6' />
									</svg>
								</div>
							</Row>
						</a>
					</Row>
				</div>
			</RevealFx>
		</div>
	);
}
