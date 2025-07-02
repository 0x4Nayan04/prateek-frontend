import { Flex, Text } from '@once-ui-system/core';
import styles from './Footer.module.scss';

export const Footer = () => {
	return (
		<Flex
			as='footer'
			fillWidth
			paddingX='8'
			paddingY='8'
			horizontal='center'
			style={{
				position: 'relative',
				zIndex: 1,
				background: 'transparent'
			}}>
			<div className={styles.footerBadge}>
				<Text
					variant='body-default-s'
					onBackground='neutral-weak'
					align='center'>
					© 2025 · Pratik Srivastava
				</Text>
			</div>
		</Flex>
	);
};
