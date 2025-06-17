'use client';

import { useState } from 'react';
import {
	Card,
	Column,
	Row,
	Heading,
	Text,
	Tag,
	Button,
	RevealFx
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { SanityImage } from '@/components/sanity/SanityImage';

interface ModernCaseStudyCardProps {
	caseStudy: CaseStudy;
	index: number;
	priority?: boolean;
}

// Color themes for cards (cycling through them)
const cardThemes = [
	{
		background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', // Light blue
		textColor: '#1565C0',
		buttonBg: '#1976D2',
		tagBg: 'rgba(25, 118, 210, 0.1)'
	},
	{
		background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', // Light amber
		textColor: '#E65100',
		buttonBg: '#FF9800',
		tagBg: 'rgba(230, 81, 0, 0.1)'
	},
	{
		background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', // Light purple
		textColor: '#7B1FA2',
		buttonBg: '#9C27B0',
		tagBg: 'rgba(123, 31, 162, 0.1)'
	},
	{
		background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)', // Light green
		textColor: '#2E7D32',
		buttonBg: '#4CAF50',
		tagBg: 'rgba(46, 125, 50, 0.1)'
	}
];

export function ModernCaseStudyCard({
	caseStudy,
	index,
	priority = false
}: ModernCaseStudyCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const theme = cardThemes[index % cardThemes.length];

	return (
		<RevealFx
			translateY={20}
			delay={index * 0.15}>
			<Card
				fillWidth
				padding='0'
				radius='xl'
				border='neutral-alpha-weak'
				style={{
					background: theme.background,
					overflow: 'hidden',
					cursor: 'pointer',
					transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
					transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
					boxShadow: isHovered
						? '0 20px 40px rgba(0, 0, 0, 0.15)'
						: '0 4px 12px rgba(0, 0, 0, 0.05)'
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<Column fillWidth>
					{/* Header with Company Info */}
					<Row
						paddingX='24'
						paddingY='20'
						vertical='center'
						gap='12'>
						{/* Company Logo Placeholder - You can replace with actual logos */}
						<div
							style={{
								width: '40px',
								height: '40px',
								borderRadius: '8px',
								background: theme.buttonBg,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'white',
								fontWeight: 'bold',
								fontSize: '16px'
							}}>
							{caseStudy.title.charAt(0)}
						</div>

						<Column gap='4'>
							{/* Tags */}
							<Row gap='8'>
								{caseStudy.industry.slice(0, 2).map((industry) => (
									<Tag
										key={industry}
										size='s'
										style={{
											background: theme.tagBg,
											color: theme.textColor,
											border: 'none',
											fontSize: '12px',
											fontWeight: '500'
										}}>
										{industry}
									</Tag>
								))}
							</Row>
						</Column>
					</Row>

					{/* Main Content */}
					<Column
						paddingX='24'
						gap='16'>
						{/* Project Title */}
						<Heading
							variant='heading-strong-l'
							style={{
								color: theme.textColor,
								lineHeight: '1.2',
								fontSize: '24px',
								fontWeight: '700'
							}}>
							{caseStudy.title}
						</Heading>

						{/* Description */}
						<Text
							variant='body-default-m'
							style={{
								color: theme.textColor,
								opacity: 0.8,
								lineHeight: '1.5',
								fontSize: '16px',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden'
							}}>
							{caseStudy.summary}
						</Text>

						{/* Tech Stack Tags */}
						{caseStudy.techStack.length > 0 && (
							<Row
								gap='2'
								wrap>
								{caseStudy.techStack.slice(0, 4).map((tech) => (
									<span
										key={tech}
										style={{
											padding: '4px 8px',
											background: 'rgba(255, 255, 255, 0.6)',
											color: theme.textColor,
											borderRadius: '12px',
											fontSize: '12px',
											fontWeight: '500'
										}}>
										{tech}
									</span>
								))}
								{caseStudy.techStack.length > 4 && (
									<span
										style={{
											padding: '4px 8px',
											background: 'rgba(255, 255, 255, 0.6)',
											color: theme.textColor,
											borderRadius: '12px',
											fontSize: '12px',
											fontWeight: '500'
										}}>
										+{caseStudy.techStack.length - 4}
									</span>
								)}
							</Row>
						)}
					</Column>

					{/* Image Section */}
					{caseStudy.thumbnail && (
						<Column
							paddingX='24'
							paddingY='16'>
							<div
								style={{
									position: 'relative',
									borderRadius: '12px',
									overflow: 'hidden',
									background: 'rgba(255, 255, 255, 0.5)',
									padding: '16px'
								}}>
								<SanityImage
									image={caseStudy.thumbnail}
									width={600}
									height={300}
									alt={caseStudy.thumbnail.alt}
									priority={priority}
									style={{
										borderRadius: '8px',
										transition: 'transform 0.3s ease',
										transform: isHovered ? 'scale(1.02)' : 'scale(1)',
										boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
									}}
								/>
							</div>
						</Column>
					)}

					{/* Action Button */}
					<Column
						paddingX='24'
						paddingBottom='24'>
						<Button
							href={`/work/${caseStudy.slug.current}`}
							size='l'
							style={{
								background: theme.buttonBg,
								color: 'white',
								border: 'none',
								borderRadius: '12px',
								fontWeight: '600',
								fontSize: '16px',
								padding: '16px 24px',
								width: '100%',
								transition: 'all 0.3s ease',
								transform: isHovered ? 'scale(1.02)' : 'scale(1)',
								boxShadow: isHovered
									? `0 8px 20px ${theme.buttonBg}40`
									: `0 4px 12px ${theme.buttonBg}20`
							}}>
							View Project
						</Button>
					</Column>
				</Column>
			</Card>
		</RevealFx>
	);
}
