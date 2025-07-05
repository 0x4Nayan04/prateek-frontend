import { ScrollToHash } from '@/components';
import { ModernProjects } from '@/components/work/ModernProjects';
import { baseURL, home } from '@/resources';
import {
	Badge,
	Button,
	Column,
	Flex,
	Heading,
	Icon,
	RevealFx,
	Row,
	Text
} from '@once-ui-system/core';

export const revalidate = 60; // ISR revalidation every 60 seconds - matches work pages

// Elegant Section Separator Component
const SectionSeparator = ({
	variant = 'default'
}: {
	variant?: 'default' | 'subtle';
}) => (
	<RevealFx
		translateY={4}
		delay={0.1}
		fillWidth
		horizontal='center'
		paddingY='32'>
		<div
			style={{
				width: '100%',
				maxWidth: '400px',
				height: '1px',
				background:
					variant === 'subtle'
						? 'linear-gradient(90deg, transparent 0%, var(--neutral-alpha-weak) 20%, var(--neutral-alpha-medium) 50%, var(--neutral-alpha-weak) 80%, transparent 100%)'
						: 'linear-gradient(90deg, transparent 0%, var(--brand-alpha-medium) 20%, var(--accent-alpha-strong) 50%, var(--brand-alpha-medium) 80%, transparent 100%)',
				position: 'relative'
			}}>
			{variant === 'default' && (
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '4px',
						height: '4px',
						borderRadius: '50%',
						background: 'var(--accent-background-strong)',
						opacity: 0.9,
						boxShadow: '0 0 8px var(--accent-alpha-medium)'
					}}
				/>
			)}
		</div>
	</RevealFx>
);

export default function Home() {
	return (
		<Column
			fillWidth
			gap='0'
			horizontal='center'>
			<ScrollToHash />

			{/* Hero Section */}
			<Column
				fillWidth
				horizontal='center'
				vertical='center'
				paddingY='0'
				paddingX='m'
				gap='0'
				style={{
					minHeight: '7vh'
				}}>
				<Column
					//do somethig here so that the look good !
					maxWidth='s'
					horizontal='center'
					gap='8'>
					{home.featured.display && (
						<RevealFx
							translateY={4}
							delay={0}
							fillWidth
							horizontal='center'
							paddingBottom='4'>
							<Badge
								background='brand-alpha-weak'
								paddingX='12'
								paddingY='4'
								onBackground='brand-strong'
								textVariant='label-default-s'
								arrow={false}
								style={{
									cursor: 'pointer'
								}}>
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
						translateY={4}
						delay={0.05}
						fillWidth
						horizontal='center'
						paddingBottom='16'>
						<Heading
							wrap='pretty'
							variant='display-strong-l'
							align='center'>
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx
						translateY={4}
						delay={0.1}
						fillWidth
						horizontal='center'
						paddingBottom='16'>
						<Text
							wrap='balance'
							onBackground='neutral-medium'
							variant='body-default-l'
							align='center'
							style={{
								maxWidth: '500px',
								lineHeight: '1.5',
								letterSpacing: '0.01em'
							}}>
							{home.subline}
						</Text>
					</RevealFx>
					<RevealFx
						translateY={4}
						delay={0.15}
						horizontal='center'>
						<Button
							href='/work'
							id='work'
							data-border='accent'
							variant='primary'
							size='m'
							weight='default'
							arrowIcon>
							View My Case Studies
						</Button>
					</RevealFx>
				</Column>
			</Column>

			{/* Separator: Hero to Work */}
			<SectionSeparator />

			{/* Case Studies Section */}
			<Column
				fillWidth
				horizontal='center'
				vertical='center'
				paddingY='0'
				paddingX='0'
				gap='0'>
				{/* Projects Section with pill filters */}
				<Column
					fillWidth
					paddingTop='16'
					gap='0'
					horizontal='center'>
					<ModernProjects
						title='Case Studies'
						columns='2'
						enableFilters={true}
					/>
				</Column>
			</Column>

			{/* Separator: Work to About */}
			<SectionSeparator />

			{/* About Section */}
			<Column
				fillWidth
				horizontal='center'
				paddingY='64'
				paddingX='24'>
				<Flex
					id='about'
					fillWidth
					maxWidth='xl'
					background='surface'
					border='neutral-alpha-weak'
					radius='xl'
					padding='48'
					mobileDirection='column'
					gap='40'
					style={{
						boxShadow: '0 4px 24px var(--neutral-alpha-weak)',
						background:
							'linear-gradient(135deg, var(--surface-background) 0%, var(--brand-alpha-weak) 100%)'
					}}>
					<Flex
						flex={1}
						paddingLeft='8'>
						<RevealFx
							translateY={4}
							delay={0}>
							<Heading
								as='h2'
								variant='display-strong-m'
								wrap='balance'>
								About Me
							</Heading>
						</RevealFx>
					</Flex>
					<Flex flex={2}>
						<Column gap='24'>
							<RevealFx
								translateY={4}
								delay={0.05}>
								<Text
									variant='body-default-l'
									onBackground='neutral-medium'
									style={{ lineHeight: '1.7' }}>
									I&apos;m{' '}
									<Text
										as='span'
										variant='body-strong-l'
										onBackground='neutral-strong'>
										Pratik Srivastava
									</Text>{' '}
									— a data-driven product consultant focused on helping
									organizations make faster, smarter decisions.
								</Text>
							</RevealFx>
							<RevealFx
								translateY={4}
								delay={0.1}>
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
									strategic outcomes. Whether it&apos;s building internal BI
									systems at{' '}
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
							</RevealFx>
							<RevealFx
								translateY={4}
								delay={0.15}>
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
							</RevealFx>
						</Column>
					</Flex>
				</Flex>
			</Column>
		</Column>
	);
}
