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
	Row
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
			maxWidth='m'
			horizontal='center'
			gap='l'>
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

			{/* Header */}
			<Column
				maxWidth='xs'
				gap='16'>
				<Button
					data-border='rounded'
					href='/work'
					variant='tertiary'
					weight='default'
					size='s'
					prefixIcon='chevronLeft'>
					Case Studies
				</Button>
				<Heading variant='display-strong-s'>{caseStudy.title}</Heading>
				<Text
					variant='body-default-m'
					onBackground='neutral-medium'>
					{caseStudy.summary}
				</Text>

				{/* Tags */}
				<Row
					gap='8'
					wrap>
					{caseStudy.techStack.map((tech) => (
						<Tag
							key={tech}
							size='s'
							variant='neutral'>
							{tech}
						</Tag>
					))}
					{caseStudy.industry.map((industry) => (
						<Tag
							key={industry}
							size='s'
							variant='brand'>
							{industry}
						</Tag>
					))}
				</Row>
			</Column>

			{/* Thumbnail Image */}
			{caseStudy.thumbnail && (
				<img
					src={urlFor(caseStudy.thumbnail).width(800).height(500).url()}
					alt={caseStudy.thumbnail.alt}
					style={{
						width: '100%',
						maxWidth: '800px',
						height: 'auto',
						borderRadius: '12px',
						objectFit: 'cover'
					}}
				/>
			)}

			{/* Content Sections */}
			<Column
				style={{ margin: 'auto' }}
				as='article'
				maxWidth='xs'
				gap='32'>
				{/* Client Overview */}
				{caseStudy.clientOverview && (
					<Column
						gap='16'
						id='client-overview'>
						<Heading variant='heading-strong-m'>Client Overview</Heading>
						{/* TODO: Render block content - will be implemented in Phase 5 */}
						<Text variant='body-default-m'>
							[Client Overview content will be rendered here with block content
							renderer]
						</Text>
					</Column>
				)}

				{/* Problem */}
				{caseStudy.problem && (
					<Column
						gap='16'
						id='problem'>
						<Heading variant='heading-strong-m'>Problem</Heading>
						{/* TODO: Render block content - will be implemented in Phase 5 */}
						<Text variant='body-default-m'>
							[Problem content will be rendered here with block content
							renderer]
						</Text>
					</Column>
				)}

				{/* Approach */}
				{caseStudy.approach && (
					<Column
						gap='16'
						id='approach'>
						<Heading variant='heading-strong-m'>Approach</Heading>
						{/* TODO: Render block content - will be implemented in Phase 5 */}
						<Text variant='body-default-m'>
							[Approach content will be rendered here with block content
							renderer]
						</Text>
					</Column>
				)}

				{/* Solution */}
				{caseStudy.solution && (
					<Column
						gap='16'
						id='solution'>
						<Heading variant='heading-strong-m'>Solution</Heading>
						{/* TODO: Render block content - will be implemented in Phase 5 */}
						<Text variant='body-default-m'>
							[Solution content will be rendered here with block content
							renderer]
						</Text>
					</Column>
				)}

				{/* Result & Impact */}
				{caseStudy.result && (
					<Column
						gap='16'
						id='result'>
						<Heading variant='heading-strong-m'>Result & Impact</Heading>
						{/* TODO: Render block content - will be implemented in Phase 5 */}
						<Text variant='body-default-m'>
							[Result content will be rendered here with block content renderer]
						</Text>
					</Column>
				)}

				{/* External Links */}
				{caseStudy.externalLinks && caseStudy.externalLinks.length > 0 && (
					<Column gap='16'>
						<Heading variant='heading-strong-m'>External Links</Heading>
						<Column gap='8'>
							{caseStudy.externalLinks.map((link, index) => (
								<Button
									key={index}
									href={link.url}
									variant='secondary'
									size='m'
									arrowIcon>
									{link.title}
								</Button>
							))}
						</Column>
					</Column>
				)}

				{/* Dashboard Embed */}
				{caseStudy.iframePreview && (
					<Column gap='16'>
						<Heading variant='heading-strong-m'>Live Dashboard</Heading>
						<iframe
							src={caseStudy.iframePreview}
							width='100%'
							height='600'
							style={{ border: 'none', borderRadius: '8px' }}
							title='Dashboard Preview'
						/>
					</Column>
				)}
			</Column>

			<ScrollToHash />
		</Column>
	);
}
