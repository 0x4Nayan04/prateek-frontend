'use client';

import { useState, useEffect } from 'react';
import { SanityImage } from './SanityImage';

interface AdaptiveImageProps {
	image: {
		asset: {
			_ref: string;
			metadata?: {
				dimensions?: {
					width: number;
					height: number;
				};
			};
		};
		alt?: string;
	};
	className?: string;
	style?: React.CSSProperties;
	priority?: boolean;
	fallbackAspectRatio?: number;
}

export const AdaptiveImage = ({
	image,
	className,
	style,
	priority = false,
	fallbackAspectRatio = 16 / 9
}: AdaptiveImageProps) => {
	const [aspectRatio, setAspectRatio] = useState(fallbackAspectRatio);

	useEffect(() => {
		if (image?.asset?.metadata?.dimensions) {
			const { width, height } = image.asset.metadata.dimensions;
			setAspectRatio(width / height);
		}
	}, [image]);

	if (!image?.asset?._ref) {
		return null;
	}

	return (
		<div
			style={{
				aspectRatio: aspectRatio.toString(),
				overflow: 'hidden',
				...style
			}}
			className={className}>
			<SanityImage
				image={image}
				style={{
					objectFit: 'contain',
					width: '100%',
					height: '100%'
				}}
				priority={priority}
			/>
		</div>
	);
};
