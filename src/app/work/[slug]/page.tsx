import { PortableText, ScrollToHash } from '@/components';
import { getFileUrl, urlFor } from '@/lib/sanity/client';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/utils/content';
import { about, baseURL, person, work } from '@/resources';
import {
	Button,
	Column,
	Grid,
	Heading,
	Meta,
	RevealFx,
	Schema,
	Text,
	Row,
	Line,
	Carousel
} from '@once-ui-system/core';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const caseStudies = await getAllCaseStudies();
	return caseStudies.map((caseStudy) => ({
		slug: caseStudy.slug.current
	}));
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const caseStudy = await getCaseStudyBySlug(slug);

	if (!caseStudy) return {};

	return Meta.generate({
		title: caseStudy.title,
		description: caseStudy.summary,
		baseURL: baseURL,
		image: caseStudy.thumbnail
			? urlFor(caseStudy.thumbnail).width(1200).height(630).url()
			: `/api/og/generate?title=${encodeURIComponent(caseStudy.title)}`,
		path: `${work.path}/${caseStudy.slug.current}`
	});
}

export default async function CaseStudyPage({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const caseStudy = await getCaseStudyBySlug(slug);

	if (!caseStudy) {
		notFound();
	}

	// Get all case studies for pagination
	const allCaseStudies = await getAllCaseStudies();
	const currentIndex = allCaseStudies.findIndex(
		(cs) => cs.slug.current === slug
	);
	const previousCaseStudy =
		currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null;
	const nextCaseStudy =
		currentIndex < allCaseStudies.length - 1
			? allCaseStudies[currentIndex + 1]
			: null;

	// Prepare carousel items from case study images
	const carouselImages =
		caseStudy.images?.map((image, idx) => {
			const imageUrl = urlFor(image)
				.width(1200)
				.height(800)
				.quality(95)
				.format('webp')
				.url();

			return {
				slide: imageUrl,
				alt: image.alt || `${caseStudy.title} - Image ${idx + 1}`
			};
		}) || [];

	return (
		<Column
			as='section'
			fillWidth
			horizontal='center'
			gap='xl'
			paddingY='32'
			style={{
				maxWidth: '800px',
				margin: '0 auto',
				paddingLeft: 'clamp(16px, 4vw, 24px)',
				paddingRight: 'clamp(16px, 4vw, 24px)'
			}}>
			<Schema
				as='article'
				baseURL={baseURL}
				path={`${work.path}/${caseStudy.slug.current}`}
				title={caseStudy.title}
				description={caseStudy.summary}
				image={
					caseStudy.thumbnail
						? urlFor(caseStudy.thumbnail).width(1200).height(630).url()
						: `/api/og/generate?title=${encodeURIComponent(caseStudy.title)}`
				}
				author={{
					name: person.name,
					url: `${baseURL}${about.path}`,
					image: `${baseURL}${person.avatar}`
				}}
			/>

			{/* Header Section */}
			<Column
				fillWidth
				gap='32'>
				<RevealFx
					translateY={16}
					delay={0.1}>
					<Button
						data-border='rounded'
						href='/work'
						variant='primary'
						weight='default'
						size='s'
						prefixIcon='chevronLeft'>
						Back to Case Studies
					</Button>
				</RevealFx>

				{/* Title and Summary */}
				<RevealFx
					translateY={16}
					delay={0.2}>
					<Column gap='16'>
						<Heading
							variant='display-strong-xl'
							style={{
								fontSize: 'clamp(32px, 4vw, 48px)',
								lineHeight: '1.2',
								fontFamily:
									'"Open Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
								fontWeight: '700',
								textAlign: 'left'
							}}>
							{caseStudy.title}
						</Heading>
						<Line
							fillWidth
							background='neutral-alpha-medium'
						/>
						<Text
							variant='body-default-xl'
							onBackground='neutral-medium'
							style={{
								fontSize: 'clamp(16px, 2vw, 18px)',
								lineHeight: '1.6',
								fontFamily:
									'"Open Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
								textAlign: 'left'
							}}>
							{caseStudy.summary}
						</Text>
					</Column>
				</RevealFx>

				{/* Tech Stack and Industry Tags - Using Row for same line layout */}
				<RevealFx
					translateY={16}
					delay={0.4}>
					<Row
						gap='32'
						wrap
						mobileDirection='column'
						style={{
							alignItems: 'flex-start'
						}}>
						{/* Tech Stack */}
						{caseStudy.techStack && caseStudy.techStack.length > 0 && (
							<Column
								gap='12'
								style={{ minWidth: '200px' }}>
								<Text
									variant='body-default-s'
									onBackground='neutral-medium'
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif',
										fontWeight: '500',
										marginBottom: '8px',
										display: 'block'
									}}>
									Tech Stack
								</Text>
								<Row
									gap='8'
									wrap
									style={{
										alignItems: 'flex-start'
									}}>
									{caseStudy.techStack.map((tech, index) => (
										<span
											key={index}
											style={{
												display: 'inline-flex',
												alignItems: 'center',
												padding: '6px 12px',
												backgroundColor: 'var(--neutral-alpha-weak)',
												color: 'var(--neutral-on-background-strong)',
												fontSize: '14px',
												fontWeight: '500',
												fontFamily: '"Open Sans", "Inter", sans-serif',
												borderRadius: '6px',
												border: '1px solid var(--neutral-alpha-medium)',
												transition: 'all 0.2s ease',
												lineHeight: '1'
											}}>
											{tech}
										</span>
									))}
								</Row>
							</Column>
						)}

						{/* Industry */}
						{caseStudy.industry && caseStudy.industry.length > 0 && (
							<Column
								gap='12'
								style={{ minWidth: '200px' }}>
								<Text
									variant='body-default-s'
									onBackground='neutral-medium'
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif',
										fontWeight: '500',
										marginBottom: '8px',
										display: 'block'
									}}>
									Industry
								</Text>
								<Row
									gap='8'
									wrap
									style={{
										alignItems: 'flex-start'
									}}>
									{caseStudy.industry.map((ind, index) => (
										<span
											key={index}
											style={{
												display: 'inline-flex',
												alignItems: 'center',
												padding: '6px 12px',
												backgroundColor: 'var(--brand-alpha-weak)',
												color: 'var(--brand-on-background-strong)',
												fontSize: '14px',
												fontWeight: '500',
												fontFamily: '"Open Sans", "Inter", sans-serif',
												borderRadius: '6px',
												border: '1px solid var(--brand-alpha-medium)',
												transition: 'all 0.2s ease',
												lineHeight: '1'
											}}>
											{ind}
										</span>
									))}
								</Row>
							</Column>
						)}
					</Row>
				</RevealFx>
			</Column>

			{/* Image Gallery Carousel */}
			{carouselImages.length > 0 && (
				<RevealFx
					translateY={16}
					delay={0.4}>
					<Column
						fillWidth
						style={{
							marginLeft: 'calc(-1 * clamp(16px, 4vw, 24px))',
							marginRight: 'calc(-1 * clamp(16px, 4vw, 24px))',
							width: 'calc(100% + 2 * clamp(16px, 4vw, 24px))'
						}}>
						<div
							style={{
								width: '100%',
								maxWidth: '1000px',
								margin: '0 auto',
								padding: '0 clamp(16px, 4vw, 24px)'
							}}>
							<Carousel
								items={carouselImages}
								aspectRatio='16/10'
								indicator={carouselImages.length > 1 ? 'line' : undefined}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px'
								style={{
									borderRadius: '12px',
									overflow: 'hidden',
									boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
									border: '1px solid var(--neutral-alpha-medium)',
									background: 'var(--surface)',
									width: '100%'
								}}
							/>
						</div>
					</Column>
				</RevealFx>
			)}

			{/* Content Sections */}
			<Column
				fillWidth
				gap='56'>
				{/* Client Overview */}
				{caseStudy.clientOverview && (
					<RevealFx
						translateY={16}
						delay={0.6}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								Client Overview
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<div style={{ textAlign: 'left' }}>
								<PortableText
									value={caseStudy.clientOverview}
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Problem */}
				{caseStudy.problem && (
					<RevealFx
						translateY={16}
						delay={0.7}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								Problem
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<div style={{ textAlign: 'left' }}>
								<PortableText
									value={caseStudy.problem}
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Approach */}
				{caseStudy.approach && (
					<RevealFx
						translateY={16}
						delay={0.8}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								Approach
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<div style={{ textAlign: 'left' }}>
								<PortableText
									value={caseStudy.approach}
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Solution */}
				{caseStudy.solution && (
					<RevealFx
						translateY={16}
						delay={0.9}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								Solution
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<div style={{ textAlign: 'left' }}>
								<PortableText
									value={caseStudy.solution}
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Result & Impact */}
				{caseStudy.result && (
					<RevealFx
						translateY={16}
						delay={1.0}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								Result & Impact
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<div style={{ textAlign: 'left' }}>
								<PortableText
									value={caseStudy.result}
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Iframe Preview */}
				{caseStudy.iframePreview && (
					<RevealFx
						translateY={16}
						delay={1.1}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								Live Dashboard
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<div
								style={{
									border: '1px solid var(--neutral-alpha-medium)',
									borderRadius: '12px',
									overflow: 'hidden',
									boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
									background: 'var(--surface)'
								}}>
								<iframe
									src={caseStudy.iframePreview}
									width='100%'
									height='600'
									style={{
										border: 'none',
										display: 'block'
									}}
									title='Dashboard Preview'
									loading='lazy'
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* PDF Display */}
				{caseStudy.pdfFile &&
					(() => {
						const pdfUrl = getFileUrl(caseStudy.pdfFile.asset);
						return pdfUrl ? (
							<RevealFx
								translateY={16}
								delay={1.2}>
								<Column
									gap='16'
									fillWidth>
									<Heading
										variant='heading-strong-xl'
										style={{
											fontFamily: '"Open Sans", "Inter", sans-serif',
											fontWeight: '600',
											fontSize: 'clamp(24px, 3vw, 28px)',
											textAlign: 'left'
										}}>
										Report Document
									</Heading>
									<Line
										fillWidth
										background='neutral-alpha-medium'
									/>
									<Column
										gap='16'
										fillWidth>
										<iframe
											src={pdfUrl}
											style={{
												width: '100%',
												height: '700px',
												border: '1px solid var(--neutral-alpha-medium)',
												borderRadius: '16px',
												backgroundColor: 'var(--neutral-solid-weak)'
											}}
											title={`${caseStudy.title} PDF Document`}
										/>
										<Button
											href={pdfUrl}
											target='_blank'
											variant='primary'
											size='m'
											suffixIcon='arrowUpRightFromSquare'
											style={{
												alignSelf: 'center',
												fontFamily: '"Open Sans", "Inter", sans-serif'
											}}>
											Open in New Tab
										</Button>
									</Column>
								</Column>
							</RevealFx>
						) : null;
					})()}

				{/* External Links */}
				{caseStudy.externalLinks && caseStudy.externalLinks.length > 0 && (
					<RevealFx
						translateY={16}
						delay={1.3}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 28px)',
									textAlign: 'left'
								}}>
								External Links
							</Heading>
							<Line
								fillWidth
								background='neutral-alpha-medium'
							/>
							<Grid
								columns='2'
								tabletColumns='1'
								mobileColumns='1'
								gap='16'>
								{caseStudy.externalLinks.map((link, index) => (
									<Button
										key={index}
										href={link.url}
										variant='secondary'
										size='m'
										suffixIcon='arrowUpRightFromSquare'
										fillWidth
										style={{
											justifyContent: 'flex-start',
											fontFamily: '"Open Sans", "Inter", sans-serif'
										}}>
										{link.title}
									</Button>
								))}
							</Grid>
						</Column>
					</RevealFx>
				)}
			</Column>

			{/* Pagination Section */}
			{(previousCaseStudy || nextCaseStudy) && (
				<RevealFx
					translateY={16}
					delay={1.4}>
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
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											padding: '12px 16px',
											backgroundColor: 'transparent',
											border: 'none',
											borderRadius: '8px',
											cursor: 'pointer',
											fontFamily: '"Open Sans", "Inter", sans-serif',
											textAlign: 'left',
											maxWidth: '280px',
											transition: 'none',
											textDecoration: 'none'
										}}>
										<svg
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											style={{
												flexShrink: 0,
												color: 'var(--neutral-on-background-medium)'
											}}>
											<path d='m15 18-6-6 6-6' />
										</svg>
										<Column
											gap='4'
											fillWidth>
											<Text
												variant='label-default-xs'
												onBackground='neutral-medium'
												style={{
													fontSize: '11px',
													textTransform: 'uppercase',
													letterSpacing: '0.8px',
													fontWeight: '500'
												}}>
												Previous
											</Text>
											<Text
												variant='body-default-s'
												onBackground='neutral-strong'
												style={{
													textAlign: 'left',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													fontWeight: '600',
													fontSize: '14px',
													lineHeight: '1.4'
												}}>
												{previousCaseStudy.title}
											</Text>
										</Column>
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
										fontFamily: '"Open Sans", "Inter", sans-serif',
										fontSize: '14px',
										fontWeight: '600'
									}}>
									{currentIndex + 1} of {allCaseStudies.length}
								</Text>
							</Column>

							{/* Next Case Study */}
							<Column
								style={{
									flex: '1'
								}}>
								{nextCaseStudy ? (
									<a
										href={`/work/${nextCaseStudy.slug.current}`}
										style={{
											all: 'unset',
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											padding: '12px 16px',
											backgroundColor: 'transparent',
											border: 'none',
											borderRadius: '8px',
											cursor: 'pointer',
											fontFamily: '"Open Sans", "Inter", sans-serif',
											textAlign: 'right',
											maxWidth: '280px',
											justifyContent: 'flex-end',
											marginLeft: 'auto',
											transition: 'none',
											textDecoration: 'none'
										}}>
										<Column
											gap='4'
											fillWidth
											horizontal='end'>
											<Text
												variant='label-default-xs'
												onBackground='neutral-medium'
												style={{
													fontSize: '11px',
													textTransform: 'uppercase',
													letterSpacing: '0.8px',
													fontWeight: '500'
												}}>
												Next
											</Text>
											<Text
												variant='body-default-s'
												onBackground='neutral-strong'
												style={{
													textAlign: 'right',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
													fontWeight: '600',
													fontSize: '14px',
													lineHeight: '1.4'
												}}>
												{nextCaseStudy.title}
											</Text>
										</Column>
										<svg
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											style={{
												flexShrink: 0,
												color: 'var(--neutral-on-background-medium)'
											}}>
											<path d='m9 18 6-6-6-6' />
										</svg>
									</a>
								) : (
									<div />
								)}
							</Column>
						</Row>
					</Column>
				</RevealFx>
			)}

			<ScrollToHash />
		</Column>
	);
}
