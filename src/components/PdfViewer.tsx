'use client';

import { useState } from 'react';
import { Button, Column, Row, Text, Card, Line } from '@once-ui-system/core';

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
				padding='16'
				style={{
					borderBottom: '1px solid var(--neutral-alpha-weak)',
					gap: '16px'
				}}>
				{/* Document Info */}
				<Column
					gap='4'
					style={{
						flex: 1,
						minWidth: 0 // Allows text truncation
					}}>
					<Text
						variant='label-strong-m'
						style={{
							color: 'var(--neutral-strong)',
							fontSize: 'clamp(14px, 2.5vw, 16px)',
							lineHeight: '1.4',
							fontWeight: '600'
						}}>
						{title}
					</Text>
					<Text
						variant='body-default-xs'
						style={{
							color: 'var(--neutral-medium)',
							fontSize: 'clamp(11px, 2vw, 13px)'
						}}>
						PDF Document
					</Text>
				</Column>

				{/* Action Buttons */}
				<Row
					gap='8'
					style={{
						flexShrink: 0
					}}>
					<Button
						variant={viewMode === 'preview' ? 'primary' : 'secondary'}
						size='s'
						onClick={() => setViewMode('preview')}
						style={{
							minWidth: 'auto',
							padding: '8px 16px',
							fontSize: 'clamp(12px, 2vw, 14px)',
							fontWeight: '500'
						}}>
						Preview
					</Button>
					<Button
						variant='secondary'
						size='s'
						onClick={handleDownload}
						style={{
							minWidth: 'auto',
							padding: '8px 16px',
							fontSize: 'clamp(12px, 2vw, 14px)',
							fontWeight: '500'
						}}>
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
								gap='20'
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: 'var(--neutral-alpha-weak)',
									zIndex: 1,
									padding: '24px'
								}}>
								<div
									style={{
										width: 'clamp(32px, 8vw, 40px)',
										height: 'clamp(32px, 8vw, 40px)',
										border: '3px solid var(--neutral-alpha-medium)',
										borderTop: '3px solid var(--accent-medium)',
										borderRadius: '50%',
										animation: 'spin 1s linear infinite'
									}}
								/>
								<Text
									variant='body-default-s'
									style={{
										color: 'var(--neutral-medium)',
										fontSize: 'clamp(13px, 3vw, 15px)',
										textAlign: 'center'
									}}>
									Loading document...
								</Text>
							</Column>
						)}

						{hasError ? (
							<Column
								fillWidth
								fill
								center
								gap='24'
								padding='32'
								style={{
									textAlign: 'center'
								}}>
								<Column
									gap='16'
									center
									style={{
										maxWidth: '400px'
									}}>
									<Text
										variant='heading-strong-s'
										style={{
											color: 'var(--neutral-strong)',
											fontSize: 'clamp(18px, 4vw, 22px)',
											fontWeight: '600',
											lineHeight: '1.3'
										}}>
										Preview Unavailable
									</Text>
									<Text
										variant='body-default-s'
										style={{
											color: 'var(--neutral-medium)',
											textAlign: 'center',
											fontSize: 'clamp(14px, 3vw, 16px)',
											lineHeight: '1.5',
											maxWidth: '320px'
										}}>
										This PDF cannot be previewed in the browser. Please download
										it to view.
									</Text>
								</Column>
								<Button
									variant='primary'
									size='m'
									onClick={handleDownload}
									style={{
										padding: '12px 24px',
										fontSize: 'clamp(14px, 3vw, 16px)',
										fontWeight: '500',
										minHeight: '44px' // Better touch target for mobile
									}}>
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
						gap='32'
						padding='32'
						style={{
							textAlign: 'center'
						}}>
						{/* Document Card Placeholder */}
						<Card
							padding='32'
							radius='l'
							background='accent-alpha-weak'
							border='accent-alpha-medium'
							center
							style={{
								width: 'clamp(80px, 20vw, 120px)',
								height: 'clamp(80px, 20vw, 120px)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<div
								style={{
									width: 'clamp(32px, 8vw, 48px)',
									height: 'clamp(40px, 10vw, 60px)',
									backgroundColor: 'var(--accent-medium)',
									borderRadius: '4px',
									position: 'relative'
								}}>
								{/* Simple document shape */}
								<div
									style={{
										position: 'absolute',
										top: '0',
										right: '0',
										width: '25%',
										height: '25%',
										backgroundColor: 'var(--accent-alpha-weak)',
										clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
									}}
								/>
							</div>
						</Card>

						{/* Document Info */}
						<Column
							gap='16'
							center
							style={{
								maxWidth: '400px'
							}}>
							<Text
								variant='heading-strong-m'
								style={{
									color: 'var(--neutral-strong)',
									fontSize: 'clamp(20px, 5vw, 26px)',
									fontWeight: '600',
									lineHeight: '1.2'
								}}>
								{title}
							</Text>
							<Text
								variant='body-default-s'
								style={{
									color: 'var(--neutral-medium)',
									textAlign: 'center',
									fontSize: 'clamp(14px, 3vw, 16px)',
									lineHeight: '1.5',
									maxWidth: '320px'
								}}>
								Click the button below to download and view this PDF document.
							</Text>
						</Column>

						{/* Download Button */}
						<Button
							variant='primary'
							size='l'
							onClick={handleDownload}
							style={{
								padding: '16px 32px',
								fontSize: 'clamp(15px, 3.5vw, 18px)',
								fontWeight: '500',
								minHeight: '48px', // Better touch target for mobile
								borderRadius: '12px'
							}}>
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

				/* Mobile-first responsive improvements */
				@media (max-width: 640px) {
					/* Stack buttons vertically on very small screens */
					.pdf-header-buttons {
						flex-direction: column;
						width: 100%;
						gap: 8px;
					}

					.pdf-header-buttons button {
						width: 100%;
						justify-content: center;
					}
				}

				@media (min-width: 640px) {
					/* Better spacing on larger screens */
					.pdf-content {
						padding: 40px;
					}
				}
			`}</style>
		</Card>
	);
}
