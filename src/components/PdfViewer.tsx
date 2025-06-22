'use client';

import { useState } from 'react';
import {
	Button,
	Column,
	Row,
	Text,
	Icon,
	Card,
	Line
} from '@once-ui-system/core';

interface PdfViewerProps {
	url: string;
	title?: string;
}

export function PdfViewer({ url, title = 'Document' }: PdfViewerProps) {
	const [viewMode, setViewMode] = useState<'preview' | 'download'>('preview');
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = url;
		link.download = title + '.pdf';
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handlePreviewLoad = () => {
		setIsLoading(false);
		setHasError(false);
	};

	const handlePreviewError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	// Google Docs viewer URL for better PDF rendering
	const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

	return (
		<Card
			fillWidth
			direction='column'
			radius='xl'
			border='neutral-alpha-medium'
			background='page'
			style={{
				minHeight: '600px',
				maxHeight: '800px',
				overflow: 'hidden'
			}}>
			{/* Header */}
			<Row
				fillWidth
				horizontal='space-between'
				vertical='center'
				padding='20'
				style={{
					borderBottom: '1px solid var(--neutral-alpha-weak)'
				}}>
				<Row
					vertical='center'
					gap='12'>
					<Icon
						name='document'
						size='m'
						style={{ color: 'var(--accent-medium)' }}
					/>
					<Column gap='2'>
						<Text
							variant='label-strong-m'
							style={{ color: 'var(--neutral-strong)' }}>
							{title}
						</Text>
						<Text
							variant='body-default-xs'
							style={{ color: 'var(--neutral-medium)' }}>
							PDF Document
						</Text>
					</Column>
				</Row>

				<Row gap='8'>
					<Button
						variant={viewMode === 'preview' ? 'primary' : 'secondary'}
						size='s'
						prefixIcon='eye'
						onClick={() => setViewMode('preview')}
						style={{ minWidth: 'auto' }}>
						Preview
					</Button>
					<Button
						variant='secondary'
						size='s'
						prefixIcon='chevronDown'
						onClick={handleDownload}
						style={{ minWidth: 'auto' }}>
						Download
					</Button>
				</Row>
			</Row>

			{/* Content */}
			<Column
				fillWidth
				style={{ flex: 1, position: 'relative' }}>
				{viewMode === 'preview' ? (
					<>
						{isLoading && (
							<Column
								fillWidth
								fill
								center
								gap='16'
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: 'var(--neutral-alpha-weak)',
									zIndex: 1
								}}>
								<div
									style={{
										width: '32px',
										height: '32px',
										border: '3px solid var(--neutral-alpha-medium)',
										borderTop: '3px solid var(--accent-medium)',
										borderRadius: '50%',
										animation: 'spin 1s linear infinite'
									}}
								/>
								<Text
									variant='body-default-s'
									style={{ color: 'var(--neutral-medium)' }}>
									Loading document...
								</Text>
							</Column>
						)}

						{hasError ? (
							<Column
								fillWidth
								fill
								center
								gap='16'
								padding='40'>
								<Icon
									name='warning'
									size='l'
									style={{ color: 'var(--warning-medium)' }}
								/>
								<Column
									gap='8'
									center>
									<Text
										variant='heading-strong-s'
										style={{ color: 'var(--neutral-strong)' }}>
										Preview Unavailable
									</Text>
									<Text
										variant='body-default-s'
										style={{
											color: 'var(--neutral-medium)',
											textAlign: 'center'
										}}>
										This PDF cannot be previewed in the browser. Please download
										it to view.
									</Text>
								</Column>
								<Button
									variant='primary'
									size='m'
									prefixIcon='chevronDown'
									onClick={handleDownload}>
									Download PDF
								</Button>
							</Column>
						) : (
							<iframe
								src={googleDocsUrl}
								style={{
									width: '100%',
									height: '100%',
									border: 'none',
									borderRadius: '0 0 12px 12px'
								}}
								onLoad={handlePreviewLoad}
								onError={handlePreviewError}
								title={`${title} - PDF Preview`}
								sandbox='allow-scripts allow-same-origin'
							/>
						)}
					</>
				) : (
					<Column
						fillWidth
						fill
						center
						gap='24'
						padding='40'>
						<Card
							padding='24'
							radius='l'
							background='accent-alpha-weak'
							border='accent-alpha-medium'
							center>
							<Icon
								name='document'
								size='xl'
								style={{ color: 'var(--accent-medium)' }}
							/>
						</Card>

						<Column
							gap='12'
							center>
							<Text
								variant='heading-strong-m'
								style={{ color: 'var(--neutral-strong)' }}>
								{title}
							</Text>
							<Text
								variant='body-default-s'
								style={{ color: 'var(--neutral-medium)', textAlign: 'center' }}>
								Click the button below to download and view this PDF document.
							</Text>
						</Column>

						<Button
							variant='primary'
							size='l'
							prefixIcon='chevronDown'
							onClick={handleDownload}>
							Download PDF
						</Button>
					</Column>
				)}
			</Column>

			{/* CSS for loading spinner animation */}
			<style jsx>{`
				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</Card>
	);
}
