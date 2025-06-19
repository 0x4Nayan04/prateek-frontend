import { MetadataRoute } from 'next';
import { baseURL } from '@/resources';

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ['', '/work'];

	return routes.map((route) => ({
		url: `${baseURL}${route}`,
		lastModified: new Date(),
		changeFrequency: route === '' ? 'weekly' : 'monthly',
		priority: route === '' ? 1 : 0.8
	}));
}
