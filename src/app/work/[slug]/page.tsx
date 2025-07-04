import { PortableText, ScrollToHash } from '@/components';
import { CaseStudyPagination } from '@/components/work/CaseStudyPagination';
import { CleanPagination } from '@/components/work/CleanPagination';
import { getFileUrl, urlFor } from '@/lib/sanity/client';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/utils/content';
import { baseURL, work } from '@/resources';
import {
	Button,
	Column,
	Grid,
	Heading,
	RevealFx,
	Text,
	Row,
	Line,
	Carousel
} from '@once-ui-system/core';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PdfViewer } from '@/components/PdfViewer';

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

	if (!caseStudy) {
		return {
			title: 'Case Study Not Found',
			description: 'The requested case study could not be found.'
		};
	}

	// Generate OG image URL - use first image if available, otherwise fallback to work OG
	const ogImageUrl =
		caseStudy.images && caseStudy.images.length > 0
			? urlFor(caseStudy.images[0])
					.width(1200)
					.height(630)
					.fit('crop')
					.auto('format')
					.url()
			: `${baseURL}/og-work.png`;

	return {
		title: caseStudy.title,
		description: caseStudy.summary,
		openGraph: {
			title: caseStudy.title,
			description: caseStudy.summary,
			url: `${baseURL}/work/${slug}`,
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: caseStudy.title,
					type: 'image/png'
				}
			],
			type: 'article',
			publishedTime: new Date().toISOString(),
			tags: [...(caseStudy.techStack || []), ...(caseStudy.industry || [])]
		},
		twitter: {
			card: 'summary_large_image',
			title: caseStudy.title,
			description: caseStudy.summary,
			images: [ogImageUrl]
		},
		keywords: [
			caseStudy.title,
			...(caseStudy.techStack || []),
			...(caseStudy.industry || []),
			'Business Intelligence',
			'Data Analytics',
			'Pratik Srivastava'
		]
	};
}

export default async function CaseStudyPage({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const caseStudy = await getCaseStudyBySlug(slug);
	// Fetch all case studies for pagination
	const allCaseStudies = await getAllCaseStudies();

	if (!caseStudy) {
		notFound();
	}

	// Prepare carousel items from case study images with adaptive sizing
	const carouselImages =
		caseStudy.images?.map((image, idx) => {
			const imageUrl = urlFor(image)
				.width(1200)
				.fit('max') // Preserve aspect ratio
				.auto('format')
				.url();

			return {
				slide: imageUrl,
				alt: image.alt || `${caseStudy.title} - Image ${idx + 1}`
			};
		}) || [];

	// Calculate dynamic aspect ratio from first image or use fallback
	const getDetailAspectRatio = () => {
		if (
			caseStudy.images &&
			caseStudy.images.length > 0 &&
			caseStudy.images[0]?.asset?.metadata?.dimensions
		) {
			const { width, height } = caseStudy.images[0].asset.metadata.dimensions;
			return `${width} / ${height}`;
		}
		return '16 / 10'; // Fallback aspect ratio
	};

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
			{/* Header Section */}
			<Column
				fillWidth
				gap='32'>
				<RevealFx
					translateY={8}
					delay={0.02}>
					<Row
						fillWidth
						horizontal='space-between'
						vertical='center'
						wrap>
						<Button
							data-border='rounded'
							href='/work'
							variant='primary'
							weight='default'
							size='s'
							prefixIcon='chevronLeft'>
							Back to Case Studies
						</Button>
					</Row>
				</RevealFx>

				{/* Title and Summary */}
				<RevealFx
					translateY={8}
					delay={0.04}>
					<Column gap='16'>
						<Heading
							variant='display-strong-xl'
							style={{
								fontSize: 'clamp(32px, 4vw, 48px)',
								lineHeight: '1.2',
								fontFamily:
									'"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
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
									'"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
								textAlign: 'left'
							}}>
							{caseStudy.summary}
						</Text>
					</Column>
				</RevealFx>

				{/* Tech Stack and Industry Tags - Using Row for same line layout */}
				<RevealFx
					translateY={8}
					delay={0.06}>
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
										fontFamily: '"Inter", sans-serif',
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
												fontFamily: '"Inter", sans-serif',
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
										fontFamily: '"Inter", sans-serif',
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
												fontFamily: '"Inter", sans-serif',
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
					translateY={8}
					delay={0.08}>
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
								aspectRatio={getDetailAspectRatio()}
								indicator={carouselImages.length > 1 ? 'line' : undefined}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px'
								style={{
									borderRadius: '12px',
									overflow: 'hidden',
									boxShadow: 'var(--shadow-l)'
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
						translateY={8}
						delay={0.1}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
										fontFamily: '"Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Problem */}
				{caseStudy.problem && (
					<RevealFx
						translateY={8}
						delay={0.12}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
										fontFamily: '"Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Approach */}
				{caseStudy.approach && (
					<RevealFx
						translateY={8}
						delay={0.14}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
										fontFamily: '"Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Solution */}
				{caseStudy.solution && (
					<RevealFx
						translateY={8}
						delay={0.16}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
										fontFamily: '"Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Result & Impact */}
				{caseStudy.result && (
					<RevealFx
						translateY={8}
						delay={0.18}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
										fontFamily: '"Inter", sans-serif'
									}}
								/>
							</div>
						</Column>
					</RevealFx>
				)}

				{/* Iframe Preview */}
				{caseStudy.iframePreview && (
					<RevealFx
						translateY={8}
						delay={0.12}>
						<Column gap='16'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
									boxShadow: 'var(--shadow-l)',
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
								translateY={8}
								delay={0.14}>
								<Column
									gap='16'
									fillWidth>
									<Heading
										variant='heading-strong-xl'
										style={{
											fontFamily: '"Inter", sans-serif',
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
									<PdfViewer
										url={pdfUrl}
										title={caseStudy.title}
									/>
								</Column>
							</RevealFx>
						) : null;
					})()}

				{/* External Links */}
				{caseStudy.externalLinks && caseStudy.externalLinks.length > 0 && (
					<RevealFx
						translateY={8}
						delay={0.16}>
						<Column
							gap='16'
							fillWidth>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Inter", sans-serif',
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
										variant='primary'
										size='m'
										suffixIcon='arrowUpRightFromSquare'
										style={{
											justifyContent: 'flex-start',
											fontFamily: '"Inter", sans-serif'
										}}>
										{link.title}
									</Button>
								))}
							</Grid>
						</Column>
					</RevealFx>
				)}
			</Column>

			{/* Case Study Pagination - Clean Implementation */}
			<CleanPagination
				currentSlug={slug}
				allCaseStudies={allCaseStudies}
			/>

			<ScrollToHash />
		</Column>
	);
}
