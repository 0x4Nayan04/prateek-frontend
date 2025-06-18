import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
	useCdn: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
	return builder.image(source);
}

// Helper function to get file URLs from Sanity assets
export function getFileUrl(
	asset: { _ref?: string; url?: string } | null | undefined
): string | null {
	if (!asset) return null;

	// If URL is already provided, use it
	if (asset.url) return asset.url;

	// If we have a _ref, construct the URL
	if (asset._ref) {
		const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
		const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
		return `https://cdn.sanity.io/files/${projectId}/${dataset}/${asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`;
	}

	return null;
}
