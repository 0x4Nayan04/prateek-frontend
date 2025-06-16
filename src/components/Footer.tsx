import { Flex, Text } from '@once-ui-system/core';
import styles from './Footer.module.scss';

export const Footer = () => {
	return (
		<Flex
			as='footer'
			fillWidth
			padding='8'
			horizontal='center'
			mobileDirection='column'
			style={{ position: 'relative', zIndex: 1 }}>
			<Flex
				className={styles.mobile}
				maxWidth='m'
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
				height='120'
				show='s'></Flex>
		</Flex>
	);
};
