'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Column, Text, Row, Button } from '@once-ui-system/core';

// Configure PDF.js worker
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
	fileUrl: string;
	title?: string;
	style?: React.CSSProperties;
	className?: string;
}

export function PDFViewer({
	fileUrl,
	title,
	style,
	className
}: PDFViewerProps) {
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);
	const [pageWidth, setPageWidth] = useState<number>(800);

	// Prevent hydration mismatch by mounting on client only
	useEffect(() => {
		setMounted(true);

		// Set responsive width based on screen size
		const updateWidth = () => {
			const containerWidth = Math.min(window.innerWidth * 0.9, 900);
			setPageWidth(containerWidth);
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
		setLoading(false);
		setError(null);
	};

	const onDocumentLoadError = (error: Error) => {
		setLoading(false);
		setError(`Failed to load PDF: ${error.message}`);
	};

	const goToPrevious = () => {
		setPageNumber((prev) => Math.max(1, prev - 1));
	};

	const goToNext = () => {
		if (numPages) {
			setPageNumber((prev) => Math.min(numPages, prev + 1));
		}
	};

	// Don't render anything until mounted (prevents hydration mismatch)
	if (!mounted) {
		return (
			<Column
				gap='16'
				className={className}
				style={style}>
				{title && (
					<Text
						variant='body-default-s'
						onBackground='neutral-medium'
						style={{
							fontFamily: '"Open Sans", "Inter", sans-serif',
							fontWeight: '500',
							textAlign: 'center'
						}}>
						{title}
					</Text>
				)}

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: '600px',
						background: 'var(--surface)',
						border: '1px solid var(--neutral-alpha-medium)',
						borderRadius: '12px',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
					}}>
					<Text
						variant='body-default-m'
						onBackground='neutral-medium'
						style={{
							fontFamily: '"Open Sans", "Inter", sans-serif',
							textAlign: 'center'
						}}>
						Initializing PDF viewer...
					</Text>
				</div>
			</Column>
		);
	}

	// Check if fileUrl is valid
	if (!fileUrl || typeof fileUrl !== 'string') {
		return (
			<Column
				gap='16'
				className={className}
				style={style}>
				{title && (
					<Text
						variant='body-default-s'
						onBackground='neutral-medium'
						style={{
							fontFamily: '"Open Sans", "Inter", sans-serif',
							fontWeight: '500',
							textAlign: 'center'
						}}>
						{title}
					</Text>
				)}

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: '400px',
						background: 'var(--surface)',
						border: '1px solid var(--neutral-alpha-medium)',
						borderRadius: '12px',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
						padding: '40px'
					}}>
					<Text
						variant='body-default-m'
						onBackground='neutral-medium'
						style={{
							fontFamily: '"Open Sans", "Inter", sans-serif',
							textAlign: 'center'
						}}>
						No PDF file available for this case study.
					</Text>
				</div>
			</Column>
		);
	}

	return (
		<Column
			gap='16'
			className={className}
			style={style}>
			{title && (
				<Text
					variant='body-default-s'
					onBackground='neutral-medium'
					style={{
						fontFamily: '"Open Sans", "Inter", sans-serif',
						fontWeight: '500',
						textAlign: 'center'
					}}>
					{title}
				</Text>
			)}

			{/* PDF Container with Perfect Center Alignment */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					background: 'var(--surface)',
					border: '1px solid var(--neutral-alpha-medium)',
					borderRadius: '12px',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
					padding: '24px',
					position: 'relative'
				}}>
				{loading && (
					<div
						style={{
							position: 'absolute',
							inset: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: 'var(--surface)',
							zIndex: 10,
							borderRadius: '12px'
						}}>
						<Text
							variant='body-default-m'
							onBackground='neutral-medium'
							style={{
								fontFamily: '"Open Sans", "Inter", sans-serif',
								textAlign: 'center'
							}}>
							Loading PDF...
						</Text>
					</div>
				)}

				{error && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: '400px',
							textAlign: 'center'
						}}>
						<Text
							variant='body-default-m'
							onBackground='danger-medium'
							style={{
								fontFamily: '"Open Sans", "Inter", sans-serif'
							}}>
							{error}
						</Text>
					</div>
				)}

				{!loading && !error && (
					<>
						{/* Single Page Display */}
						<Document
							file={fileUrl}
							onLoadSuccess={onDocumentLoadSuccess}
							onLoadError={onDocumentLoadError}
							loading={
								<Text
									variant='body-default-m'
									onBackground='neutral-medium'
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif',
										textAlign: 'center'
									}}>
									Loading document...
								</Text>
							}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									width: '100%',
									boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
									borderRadius: '8px',
									overflow: 'hidden',
									background: '#fff'
								}}>
								<Page
									pageNumber={pageNumber}
									width={pageWidth}
									renderTextLayer={false}
									renderAnnotationLayer={false}
									loading=''
									error=''
									noData=''
								/>
							</div>
						</Document>

						{/* Navigation Controls */}
						{numPages && numPages > 1 && (
							<Row
								horizontal='center'
								vertical='center'
								gap='16'
								style={{
									marginTop: '24px',
									padding: '12px 20px',
									background: 'var(--neutral-alpha-weak)',
									borderRadius: '12px',
									border: '1px solid var(--neutral-alpha-medium)',
									width: 'fit-content'
								}}>
								<Button
									onClick={goToPrevious}
									disabled={pageNumber <= 1}
									variant={pageNumber <= 1 ? 'tertiary' : 'secondary'}
									size='s'
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif',
										fontSize: '14px',
										fontWeight: '500',
										opacity: pageNumber <= 1 ? 0.5 : 1,
										cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer'
									}}>
									Previous
								</Button>

								<Text
									variant='body-default-s'
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif',
										fontWeight: '600',
										color: 'var(--neutral-on-background-strong)',
										minWidth: '100px',
										textAlign: 'center',
										padding: '8px 16px',
										background: 'var(--surface)',
										borderRadius: '8px',
										border: '1px solid var(--neutral-alpha-medium)'
									}}>
									Page {pageNumber} of {numPages}
								</Text>

								<Button
									onClick={goToNext}
									disabled={pageNumber >= numPages}
									variant={pageNumber >= numPages ? 'tertiary' : 'secondary'}
									size='s'
									style={{
										fontFamily: '"Open Sans", "Inter", sans-serif',
										fontSize: '14px',
										fontWeight: '500',
										opacity: pageNumber >= numPages ? 0.5 : 1,
										cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer'
									}}>
									Next
								</Button>
							</Row>
						)}
					</>
				)}
			</div>
		</Column>
	);
}
