import { urlFor } from '@/lib/sanity/client';

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
		.fit('crop')
		.auto('format')
		.url();

	return (
		<img
			src={imageUrl}
			alt={alt || image.alt || 'Case study image'}
			className={className}
			style={{
				width: '100%',
				height: 'auto',
				objectFit: 'cover',
				...style
			}}
			loading={priority ? 'eager' : 'lazy'}
		/>
	);
}
