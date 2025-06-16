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
			{routes['/blog'] && (
				<Flex
					fillWidth
					gap='24'
					mobileDirection='column'
					paddingX='24'>
					<Flex
						flex={1}
						paddingLeft='l'
						paddingTop='24'>
						<Heading
							as='h2'
							variant='display-strong-xs'
							wrap='balance'>
							Latest from the blog
						</Heading>
					</Flex>
					<Flex
						flex={3}
						paddingX='20'>
						<Posts
							range={[1, 2]}
							columns='2'
						/>
					</Flex>
				</Flex>
			)}
		</Column>
	);
}
