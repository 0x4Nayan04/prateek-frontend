import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Image metadata
export const size = {
	width: 1200,
	height: 630
};
export const contentType = 'image/png';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Get dynamic content from search params
		const title = searchParams.get('title') || 'Pratik Srivastava';
		const subtitle = searchParams.get('subtitle') || 'Product Manager ';
		const description =
			searchParams.get('description') ||
			'Building data-driven solutions with modern technology';

		return new ImageResponse(
			(
				// ImageResponse JSX element
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#0a0a0a',
						backgroundImage:
							'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
						backgroundSize: '100px 100px',
						color: 'white',
						fontFamily: 'Inter, sans-serif'
					}}>
					{/* Logo/Brand */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '40px'
						}}>
						<div
							style={{
								width: '80px',
								height: '80px',
								background: 'linear-gradient(135deg, #00d4aa 0%, #00a3ff 100%)',
								borderRadius: '20px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '36px',
								fontWeight: 'bold',
								marginRight: '20px'
							}}>
							PS
						</div>
					</div>

					{/* Main Content */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							maxWidth: '900px',
							textAlign: 'center',
							padding: '0 60px'
						}}>
						<h1
							style={{
								fontSize: '64px',
								fontWeight: 'bold',
								margin: '0 0 20px 0',
								background:
									'linear-gradient(135deg, #00d4aa 0%, #00a3ff 50%, #ffd700 100%)',
								backgroundClip: 'text',
								color: 'transparent',
								lineHeight: '1.1'
							}}>
							{title}
						</h1>

						<p
							style={{
								fontSize: '32px',
								margin: '0 0 30px 0',
								color: '#a0a0a0',
								fontWeight: '500'
							}}>
							{subtitle}
						</p>

						<p
							style={{
								fontSize: '24px',
								margin: '0',
								color: '#707070',
								lineHeight: '1.4',
								maxWidth: '700px'
							}}>
							{description}
						</p>
					</div>

					{/* Bottom accent */}
					<div
						style={{
							position: 'absolute',
							bottom: '0',
							left: '0',
							right: '0',
							height: '8px',
							background:
								'linear-gradient(90deg, #00d4aa 0%, #00a3ff 50%, #ffd700 100%)'
						}}
					/>
				</div>
			),
			{
				...size
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500
		});
	}
}
