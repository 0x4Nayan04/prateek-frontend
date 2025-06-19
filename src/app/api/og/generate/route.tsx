import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
	let url = new URL(request.url);
	let title = url.searchParams.get('title') || 'Portfolio';

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
					padding: '8rem',
					background: '#151515',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<span
					style={{
						fontSize: '8rem',
						lineHeight: '8rem',
						letterSpacing: '-0.05em',
						whiteSpace: 'pre-wrap',
						textWrap: 'balance',
						color: 'white',
						textAlign: 'center'
					}}>
					{title}
				</span>
			</div>
		),
		{
			width: 1280,
			height: 720
		}
	);
}
