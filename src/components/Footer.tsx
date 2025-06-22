import { Flex, RevealFx, Text } from '@once-ui-system/core';
import styles from './Footer.module.scss';

// Elegant Section Separator Component
const SectionSeparator = () => (
	<RevealFx
		translateY={4}
		delay={0.02}
		fillWidth
		horizontal='center'
		paddingY='32'>
		<div
			style={{
				width: '100%',
				maxWidth: '400px',
				height: '1px',
				background:
					'linear-gradient(90deg, transparent 0%, var(--brand-alpha-medium) 20%, var(--accent-alpha-strong) 50%, var(--brand-alpha-medium) 80%, transparent 100%)',
				position: 'relative'
			}}>
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
		</div>
	</RevealFx>
);

export const Footer = () => {
	return (
		<>
			{/* Section Separator */}
			<SectionSeparator />

			<Flex
				as='footer'
				fillWidth
				paddingX='8'
				paddingY='8'
				horizontal='center'
				mobileDirection='column'
				style={{
					position: 'relative',
					zIndex: 1,
					marginTop: '0px'
				}}>
				<Flex
					className={styles.mobile}
					background='page'
					border='neutral-alpha-weak'
					radius='m-4'
					shadow='l'
					paddingY='4'
					paddingX='8'
					gap='0'
					horizontal='center'
					vertical='center'>
					<Text
						variant='body-default-s'
						onBackground='neutral-weak'
						align='center'>
						© 2025 ·{' '}
						<Text
							as='span'
							onBackground='neutral-medium'>
							Pratik Srivastava
						</Text>
					</Text>
				</Flex>
			</Flex>
		</>
	);
};
