import React from 'react';

import {
	Heading,
	Flex,
	Text,
	Column,
	Badge,
	Schema,
	RevealFx,
	Row,
	Button,
	Icon
} from '@once-ui-system/core';
import { home, person, baseURL, routes } from '@/resources';
import { Posts } from '@/components/blog/Posts';
import { ModernProjects } from '@/components/work/ModernProjects';

export default function Home() {
	return (
		<Column
			fillWidth
			gap='xl'
			horizontal='center'>
			<Schema
				as='webPage'
				baseURL={baseURL}
				path={home.path}
				title={home.title}
				description={home.description}
				author={{
					name: person.name,
					url: `${baseURL}/about`,
					image: `${baseURL}${person.avatar}`
				}}
			/>
			<Column
				fillWidth
				horizontal='center'
				vertical='center'
				paddingY='32'
				paddingX='24'
				gap='16'>
				<Column
					maxWidth='s'
					horizontal='center'
					gap='12'>
					{home.featured.display && (
						<RevealFx
							fillWidth
							horizontal='center'
							paddingBottom='4'>
							<Badge
								background='success-alpha-weak'
								paddingX='16'
								paddingY='2'
								onBackground='neutral-strong'
								textVariant='label-default-s'
								arrow={false}>
								<Row
									gap='4'
									vertical='center'
									paddingY='2'>
									<Icon
										name='sparkle'
										size='xs'
									/>
									{home.featured.title}
								</Row>
							</Badge>
						</RevealFx>
					)}
					<RevealFx
						translateY='8'
						fillWidth
						horizontal='center'
						paddingBottom='12'>
						<Heading
							wrap='balance'
							variant='display-strong-l'
							align='center'>
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx
						translateY={6}
						delay={0.2}
						fillWidth
						horizontal='center'
						paddingBottom='16'>
						<Text
							wrap='balance'
							onBackground='neutral-medium'
							variant='body-default-l'
							align='center'
							style={{
								maxWidth: '480px',
								lineHeight: '1.6',
								letterSpacing: '0.01em'
							}}>
							{home.subline}
						</Text>
					</RevealFx>
					<RevealFx
						translateY='8'
						delay={0.4}
						horizontal='center'>
						<Button
							href='/work'
							id='work'
							data-border='rounded'
							variant='primary'
							size='m'
							weight='default'
							arrowIcon>
							View My Case Studies
						</Button>
					</RevealFx>
				</Column>
			</Column>

			{/* Featured Work Section */}
			<Column
				fillWidth
				horizontal='center'
				vertical='center'
				paddingY='xl'
				paddingX='l'
				gap='xl'>
				<Column
					maxWidth='l'
					horizontal='center'
					gap='m'>
					<RevealFx
						translateY='8'
						fillWidth
						horizontal='center'
						paddingBottom='s'>
						<Heading
							wrap='balance'
							variant='display-strong-l'
							align='center'>
							Selected Work
						</Heading>
					</RevealFx>
					<RevealFx
						translateY={6}
						delay={0.2}
						fillWidth
						horizontal='center'
						paddingBottom='m'>
						<Text
							wrap='balance'
							onBackground='neutral-medium'
							variant='body-default-l'
							align='center'
							style={{
								maxWidth: '600px',
								lineHeight: '1.6',
								letterSpacing: '0.01em'
							}}>
							Real-world solutions that transformed business outcomes through
							strategic data implementation
						</Text>
					</RevealFx>
				</Column>

				<ModernProjects
					title=''
					description=''
					maxItems={6}
					showFilters={false}
					columns='2'
				/>
			</Column>

			<Flex
				id='about'
				fillWidth
				background='surface'
				border='neutral-alpha-weak'
				radius='l'
				padding='32'
				marginY='32'
				marginX='24'
				mobileDirection='column'
				gap='32'>
				<Flex
					flex={1}
					paddingLeft='l'
					paddingTop='8'>
					<Heading
						as='h2'
						variant='display-strong-s'
						wrap='balance'>
						About Me
					</Heading>
				</Flex>
				<Flex
					flex={2}
					paddingX='20'>
					<Column gap='20'>
						<Text
							variant='body-default-l'
							onBackground='neutral-medium'
							style={{ lineHeight: '1.7' }}>
							I'm{' '}
							<Text
								as='span'
								variant='body-strong-l'
								onBackground='neutral-strong'>
								Pratik Srivastava
							</Text>{' '}
							— a data-driven product consultant focused on helping
							organizations make faster, smarter decisions.
						</Text>
						<Text
							variant='body-default-l'
							onBackground='neutral-medium'
							style={{ lineHeight: '1.7' }}>
							With experience spanning{' '}
							<Text
								as='span'
								variant='body-strong-m'
								onBackground='brand-medium'>
								SaaS platforms
							</Text>
							,{' '}
							<Text
								as='span'
								variant='body-strong-m'
								onBackground='brand-medium'>
								analytics products
							</Text>
							, and{' '}
							<Text
								as='span'
								variant='body-strong-m'
								onBackground='brand-medium'>
								marketing technology
							</Text>
							, I design tools and frameworks that transform raw data into
							strategic outcomes. Whether it's building internal BI systems at{' '}
							<Text
								as='span'
								variant='body-strong-m'
								onBackground='accent-medium'>
								Best Buy
							</Text>{' '}
							or developing marketing attribution platforms at{' '}
							<Text
								as='span'
								variant='body-strong-m'
								onBackground='accent-medium'>
								Lifesight
							</Text>
							, my work sits at the intersection of data, product, and
							execution.
						</Text>
						<Text
							variant='body-default-l'
							onBackground='neutral-medium'
							style={{ lineHeight: '1.7' }}>
							I thrive in{' '}
							<Text
								as='span'
								variant='body-strong-l'
								onBackground='neutral-strong'>
								turning complexity into clarity
							</Text>{' '}
							— equipping business teams with the insights they need to move
							with confidence.
						</Text>
					</Column>
				</Flex>
			</Flex>
		</Column>
	);
}
