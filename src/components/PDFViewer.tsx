'use client';

import { useState, useEffect } from 'react';
import { Column, Text } from '@once-ui-system/core';

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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch by mounting on client only
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleLoad = () => {
		setLoading(false);
		setError(null);
	};

	const handleError = () => {
		setLoading(false);
		setError('Failed to load PDF document');
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
							fontWeight: '500'
						}}>
						{title}
					</Text>
				)}

				<div
					style={{
						border: '1px solid var(--neutral-alpha-medium)',
						borderRadius: '12px',
						overflow: 'hidden',
						backgroundColor: 'var(--surface)',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
						minHeight: '600px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<Text
						variant='body-default-m'
						onBackground='neutral-medium'
						style={{ fontFamily: '"Open Sans", "Inter", sans-serif' }}>
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
							fontWeight: '500'
						}}>
						{title}
					</Text>
				)}

				<div
					style={{
						border: '1px solid var(--neutral-alpha-medium)',
						borderRadius: '12px',
						overflow: 'hidden',
						backgroundColor: 'var(--surface)',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
						minHeight: '200px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
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
						fontWeight: '500'
					}}>
					{title}
				</Text>
			)}

			<div
				className='pdf-viewer-container'
				style={{
					position: 'relative',
					width: '100%',
					height: '600px'
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
							style={{ fontFamily: '"Open Sans", "Inter", sans-serif' }}>
							Loading PDF...
						</Text>
					</div>
				)}

				{error && (
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
							onBackground='danger-medium'
							style={{ fontFamily: '"Open Sans", "Inter", sans-serif' }}>
							{error}
						</Text>
					</div>
				)}

				{/* Native browser PDF viewer */}
				<iframe
					src={fileUrl}
					title={title || 'PDF Document'}
					onLoad={handleLoad}
					onError={handleError}
				/>
			</div>
		</Column>
	);
}
