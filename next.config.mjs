/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx'],
	sassOptions: {
		compiler: 'modern',
		silenceDeprecations: ['legacy-js-api']
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/images/**' // allow all images under this path
			}
		]
	}
};

export default nextConfig;
