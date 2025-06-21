import { urlFor } from '@/lib/sanity/client';
import Image from 'next/image';

interface SanityImageProps {
	image: {
		asset: { _ref: string };
		alt?: string;
	};
	width?: number;
	height?: number;
	alt?: string;
	className?: string;
	style?: React.CSSProperties;
	priority?: boolean;
}

export function SanityImage({
	image,
	width = 800,
	height = 500,
	alt,
	className,
	style,
	priority = false
}: SanityImageProps) {
	if (!image?.asset?._ref) {
		return null;
	}

	const imageUrl = urlFor(image)
		.width(width)
		.height(height)
		.fit('max')
		.auto('format')
		.url();

	return (
		<Image
			src={imageUrl}
			alt={alt || image.alt || 'Case study image'}
			width={width}
			height={height}
			className={className}
			style={{
				width: '100%',
				height: 'auto',
				objectFit: 'contain',
				...style
			}}
			priority={priority}
		/>
	);
}
