import { Flex, Text, RevealFx } from '@once-ui-system/core';
import styles from './Footer.module.scss';

// Elegant Section Separator Component
const SectionSeparator = () => (
	<RevealFx
		translateY={8}
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
				padding='8'
				horizontal='center'
				mobileDirection='column'
				style={{ position: 'relative', zIndex: 1 }}>
				<Flex
					className={styles.mobile}
					maxWidth='l'
					paddingY='8'
					paddingX='16'
					gap='16'
					horizontal='space-between'
					vertical='center'>
					<Text
						variant='body-default-s'
						onBackground='neutral-strong'>
						© 2025 Pratik Srivastava
					</Text>
				</Flex>
				<Flex
					height={120}
					show='s'></Flex>
			</Flex>
		</>
	);
};
