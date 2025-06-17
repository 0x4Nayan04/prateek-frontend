import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
	Meta,
	Schema,
	Button,
	Column,
	Flex,
	Heading,
	Text,
	Tag,
	Row,
	Grid,
	RevealFx,
	Line
} from '@once-ui-system/core';
import { baseURL, about, person, work } from '@/resources';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/utils/content';
import { urlFor } from '@/lib/sanity/client';
import { CaseStudy } from '@/lib/sanity/types';
import { ScrollToHash } from '@/components';

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
				maxWidth='m'
				paddingX='24'
				gap='24'>
				<RevealFx
					translateY={16}
					delay={0.1}>
					<Button
						data-border='rounded'
						href='/work'
						variant='tertiary'
						weight='default'
						size='s'
						prefixIcon='chevronLeft'>
						Back to Case Studies
					</Button>
				</RevealFx>

				<RevealFx
					translateY={16}
					delay={0.2}>
					<Column gap='16'>
						<Heading
							variant='display-strong-l'
							style={{ fontSize: '48px', lineHeight: '1.1' }}>
							{caseStudy.title}
						</Heading>
						<Text
							variant='body-default-l'
							onBackground='neutral-medium'
							style={{ fontSize: '18px', lineHeight: '1.6' }}>
							{caseStudy.summary}
						</Text>
					</Column>
				</RevealFx>

				{/* Tags */}
				<RevealFx
					translateY={16}
					delay={0.3}>
					<Column gap='12'>
						<Row
							gap='8'
							wrap>
							<Text
								variant='label-default-s'
								onBackground='neutral-medium'>
								Tech Stack:
							</Text>
							{caseStudy.techStack?.map((tech) => (
								<Tag
									key={tech}
									size='s'
									variant='neutral'>
									{tech}
								</Tag>
							))}
						</Row>
						<Row
							gap='8'
							wrap>
							<Text
								variant='label-default-s'
								onBackground='neutral-medium'>
								Industry:
							</Text>
							{caseStudy.industry?.map((industry) => (
								<Tag
									key={industry}
									size='s'
									variant='brand'>
									{industry}
								</Tag>
							))}
						</Row>
					</Column>
				</RevealFx>
			</Column>

			{/* Hero Image */}
			{caseStudy.thumbnail && (
				<RevealFx
					translateY={16}
					delay={0.4}>
					<Column
						maxWidth='l'
						paddingX='24'>
						<img
							src={urlFor(caseStudy.thumbnail).width(1200).height(700).url()}
							alt={caseStudy.thumbnail.alt}
							style={{
								width: '100%',
								height: 'auto',
								borderRadius: '16px',
								objectFit: 'cover',
								boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
							}}
						/>
					</Column>
				</RevealFx>
			)}

			{/* Gallery Images */}
			{caseStudy.images && caseStudy.images.length > 0 && (
				<RevealFx
					translateY={16}
					delay={0.5}>
					<Column
						maxWidth='l'
						paddingX='24'
						gap='16'>
						<Heading variant='heading-strong-m'>Project Gallery</Heading>
						<Grid
							columns='2'
							tabletColumns='2'
							mobileColumns='1'
							gap='16'>
							{caseStudy.images.map((image, index) => (
								<img
									key={index}
									src={urlFor(image).width(600).height(400).url()}
									alt={image.alt}
									style={{
										width: '100%',
										height: '300px',
										borderRadius: '12px',
										objectFit: 'cover'
									}}
								/>
							))}
						</Grid>
					</Column>
				</RevealFx>
			)}

			{/* Content Sections */}
			<Column
				maxWidth='m'
				paddingX='24'
				gap='48'>
				{/* Client Overview */}
				{caseStudy.clientOverview && (
					<RevealFx
						translateY={16}
						delay={0.6}>
						<Column
							gap='16'
							id='client-overview'
							paddingY='24'
							paddingX='32'
							background='surface'
							border='neutral-alpha-weak'
							radius='l'>
							<Heading variant='heading-strong-l'>Client Overview</Heading>
							<Line />
							<Text
								variant='body-default-l'
								style={{ lineHeight: '1.7' }}>
								{/* TODO: Render block content properly */}
								[Client Overview content will be rendered here with block
								content renderer]
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* Problem */}
				{caseStudy.problem && (
					<RevealFx
						translateY={16}
						delay={0.7}>
						<Column
							gap='16'
							id='problem'
							paddingY='24'
							paddingX='32'
							background='surface'
							border='neutral-alpha-weak'
							radius='l'>
							<Heading variant='heading-strong-l'>Problem</Heading>
							<Line />
							<Text
								variant='body-default-l'
								style={{ lineHeight: '1.7' }}>
								{/* TODO: Render block content properly */}
								[Problem content will be rendered here with block content
								renderer]
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* Approach */}
				{caseStudy.approach && (
					<RevealFx
						translateY={16}
						delay={0.8}>
						<Column
							gap='16'
							id='approach'
							paddingY='24'
							paddingX='32'
							background='surface'
							border='neutral-alpha-weak'
							radius='l'>
							<Heading variant='heading-strong-l'>Approach</Heading>
							<Line />
							<Text
								variant='body-default-l'
								style={{ lineHeight: '1.7' }}>
								{/* TODO: Render block content properly */}
								[Approach content will be rendered here with block content
								renderer]
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* Solution */}
				{caseStudy.solution && (
					<RevealFx
						translateY={16}
						delay={0.9}>
						<Column
							gap='16'
							id='solution'
							paddingY='24'
							paddingX='32'
							background='surface'
							border='neutral-alpha-weak'
							radius='l'>
							<Heading variant='heading-strong-l'>Solution</Heading>
							<Line />
							<Text
								variant='body-default-l'
								style={{ lineHeight: '1.7' }}>
								{/* TODO: Render block content properly */}
								[Solution content will be rendered here with block content
								renderer]
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* Result & Impact */}
				{caseStudy.result && (
					<RevealFx
						translateY={16}
						delay={1.0}>
						<Column
							gap='16'
							id='result'
							paddingY='24'
							paddingX='32'
							background='surface'
							border='neutral-alpha-weak'
							radius='l'>
							<Heading variant='heading-strong-l'>Result & Impact</Heading>
							<Line />
							<Text
								variant='body-default-l'
								style={{ lineHeight: '1.7' }}>
								{/* TODO: Render block content properly */}
								[Result content will be rendered here with block content
								renderer]
							</Text>
						</Column>
					</RevealFx>
				)}

				{/* Dashboard Embed */}
				{caseStudy.iframePreview && (
					<RevealFx
						translateY={16}
						delay={1.1}>
						<Column gap='16'>
							<Heading variant='heading-strong-l'>Live Dashboard</Heading>
							<iframe
								src={caseStudy.iframePreview}
								width='100%'
								height='600'
								style={{
									border: 'none',
									borderRadius: '12px',
									boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
								}}
								title='Dashboard Preview'
							/>
						</Column>
					</RevealFx>
				)}

				{/* PDF Download */}
				{caseStudy.pdfFile && (
					<RevealFx
						translateY={16}
						delay={1.2}>
						<Column gap='16'>
							<Heading variant='heading-strong-l'>Downloadable Report</Heading>
							<Button
								href={caseStudy.pdfFile.asset.url}
								variant='primary'
								size='l'
								arrowIcon>
								Download PDF Report
							</Button>
						</Column>
					</RevealFx>
				)}

				{/* External Links */}
				{caseStudy.externalLinks && caseStudy.externalLinks.length > 0 && (
					<RevealFx
						translateY={16}
						delay={1.3}>
						<Column gap='16'>
							<Heading variant='heading-strong-l'>External Links</Heading>
							<Grid
								columns='2'
								tabletColumns='1'
								mobileColumns='1'
								gap='12'>
								{caseStudy.externalLinks.map((link, index) => (
									<Button
										key={index}
										href={link.url}
										variant='secondary'
										size='m'
										arrowIcon
										fillWidth>
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
						center
						paddingY='32'>
						<Button
							href='/work'
							variant='primary'
							size='l'
							arrowIcon>
							View More Case Studies
						</Button>
					</Column>
				</RevealFx>
			</Column>

			<ScrollToHash />
		</Column>
	);
}
