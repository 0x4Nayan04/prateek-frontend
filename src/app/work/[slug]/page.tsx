import {
	AutoCarousel,
	PDFViewer,
	PortableText,
	ScrollToHash
} from '@/components';
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
	Text
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

	// Prepare carousel items from case study images
	const carouselItems =
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
			paddingY='32'>
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
				maxWidth='l'
				paddingX='24'
				gap='32'
				style={{ width: '100%' }}>
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
					<Column gap='20'>
						<Heading
							variant='display-strong-xl'
							style={{
								fontSize: 'clamp(32px, 4vw, 56px)',
								lineHeight: '1.1',
								fontFamily:
									'"Open Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
								fontWeight: '700'
							}}>
							{caseStudy.title}
						</Heading>
						<Text
							variant='body-default-xl'
							onBackground='neutral-medium'
							style={{
								fontSize: 'clamp(16px, 2vw, 20px)',
								lineHeight: '1.6',
								fontFamily:
									'"Open Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
								maxWidth: '100%', // Better right margin
								marginRight: 'auto'
							}}>
							{caseStudy.summary}
						</Text>
					</Column>
				</RevealFx>

				{/* Tech Stack and Industry Tags */}
				<RevealFx
					translateY={16}
					delay={0.4}>
					<Column gap='16'>
						{/* Tech Stack */}
						{caseStudy.techStack && caseStudy.techStack.length > 0 && (
							<div>
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
								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: '8px',
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
								</div>
							</div>
						)}

						{/* Industry */}
						{caseStudy.industry && caseStudy.industry.length > 0 && (
							<div>
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
								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: '8px',
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
								</div>
							</div>
						)}
					</Column>
				</RevealFx>
			</Column>

			{/* Auto Carousel - Skip thumbnail, directly show gallery */}
			{carouselItems.length > 0 && (
				<RevealFx
					translateY={16}
					delay={0.4}>
					<Column
						maxWidth='l'
						paddingX='24'
						gap='16'
						style={{ width: '100%' }}>
						<AutoCarousel
							items={carouselItems}
							aspectRatio='16/10'
							autoAdvanceInterval={4000}
							style={{
								marginTop: '32px', // Better starting margin
								position: 'relative'
							}}
						/>
					</Column>
				</RevealFx>
			)}

			{/* Content Sections */}
			<Column
				maxWidth='l'
				paddingX='24'
				gap='56'
				style={{ width: '100%' }}>
				{/* Client Overview */}
				{caseStudy.clientOverview && (
					<RevealFx
						translateY={16}
						delay={0.6}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								Client Overview
							</Heading>
							<PortableText
								value={caseStudy.clientOverview}
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif'
								}}
							/>
						</Column>
					</RevealFx>
				)}

				{/* Problem */}
				{caseStudy.problem && (
					<RevealFx
						translateY={16}
						delay={0.7}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								Problem
							</Heading>
							<PortableText
								value={caseStudy.problem}
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif'
								}}
							/>
						</Column>
					</RevealFx>
				)}

				{/* Approach */}
				{caseStudy.approach && (
					<RevealFx
						translateY={16}
						delay={0.8}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								Approach
							</Heading>
							<PortableText
								value={caseStudy.approach}
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif'
								}}
							/>
						</Column>
					</RevealFx>
				)}

				{/* Solution */}
				{caseStudy.solution && (
					<RevealFx
						translateY={16}
						delay={0.9}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								Solution
							</Heading>
							<PortableText
								value={caseStudy.solution}
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif'
								}}
							/>
						</Column>
					</RevealFx>
				)}

				{/* Result & Impact */}
				{caseStudy.result && (
					<RevealFx
						translateY={16}
						delay={1.0}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								Result & Impact
							</Heading>
							<PortableText
								value={caseStudy.result}
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif'
								}}
							/>
						</Column>
					</RevealFx>
				)}

				{/* Iframe Preview */}
				{caseStudy.iframePreview && (
					<RevealFx
						translateY={16}
						delay={1.1}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								Live Dashboard
							</Heading>
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
								<Column gap='24'>
									<Heading
										variant='heading-strong-xl'
										style={{
											fontFamily: '"Open Sans", "Inter", sans-serif',
											fontWeight: '600',
											fontSize: 'clamp(24px, 3vw, 32px)'
										}}>
										Report Document
									</Heading>
									<PDFViewer fileUrl={pdfUrl} />
								</Column>
							</RevealFx>
						) : null;
					})()}

				{/* External Links */}
				{caseStudy.externalLinks && caseStudy.externalLinks.length > 0 && (
					<RevealFx
						translateY={16}
						delay={1.3}>
						<Column gap='24'>
							<Heading
								variant='heading-strong-xl'
								style={{
									fontFamily: '"Open Sans", "Inter", sans-serif',
									fontWeight: '600',
									fontSize: 'clamp(24px, 3vw, 32px)'
								}}>
								External Links
							</Heading>
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

				{/* Back to Work Button */}
				<RevealFx
					translateY={16}
					delay={1.4}>
					<Column
						horizontal='center'
						paddingY='40'>
						<Button
							href='/work'
							variant='primary'
							size='l'
							suffixIcon='arrowRight'
							style={{
								fontFamily: '"Open Sans", "Inter", sans-serif',
								fontWeight: '500'
							}}>
							View More Case Studies
						</Button>
					</Column>
				</RevealFx>
			</Column>

			<ScrollToHash />
		</Column>
	);
}
