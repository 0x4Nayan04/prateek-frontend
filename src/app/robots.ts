import { MetadataRoute } from 'next';
import { baseURL } from '@/resources';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/_next/']
		},
		sitemap: `${baseURL}/sitemap.xml`
	};
}
