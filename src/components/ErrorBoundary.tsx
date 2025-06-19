'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import { Column, Text, Button, Heading } from '@once-ui-system/core';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log the error for debugging
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		// Call the onError callback if provided
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}

		// Handle specific async response errors
		if (
			error.message.includes(
				'A listener indicated an asynchronous response by returning true'
			)
		) {
			console.warn('Async response error caught and handled by ErrorBoundary');
		}
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			// Render custom fallback UI if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI
			return (
				<Column
					fillWidth
					center
					padding='xl'
					gap='20'
					background='surface'
					border='neutral-alpha-weak'
					radius='xl'
					style={{ margin: '20px 0' }}>
					<Heading
						variant='heading-default-l'
						onBackground='neutral-strong'
						align='center'>
						Something went wrong
					</Heading>
					<Text
						variant='body-default-m'
						onBackground='neutral-medium'
						align='center'
						style={{ maxWidth: '400px' }}>
						We encountered an unexpected error. Please try refreshing the page
						or contact support if the problem persists.
					</Text>
					{this.state.error?.message.includes(
						'A listener indicated an asynchronous response'
					) && (
						<Text
							variant='body-default-s'
							onBackground='neutral-weak'
							align='center'
							style={{ maxWidth: '500px', fontStyle: 'italic' }}>
							This appears to be a temporary connectivity issue. Refreshing the
							page should resolve it.
						</Text>
					)}
					<Button
						onClick={this.handleRetry}
						variant='secondary'
						size='m'>
						Try Again
					</Button>
				</Column>
			);
		}

		return this.props.children;
	}
}

// Hook version for functional components
export function useErrorHandler() {
	return React.useCallback((error: Error) => {
		// Handle async response errors gracefully
		if (
			error.message.includes(
				'A listener indicated an asynchronous response by returning true'
			)
		) {
			console.warn('Async response error handled:', error.message);
			return; // Don't throw, just log
		}

		// For other errors, you might want to show a toast or handle differently
		console.error('Unhandled error:', error);
	}, []);
}
