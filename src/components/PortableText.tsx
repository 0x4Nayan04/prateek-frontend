'use client';

import { PortableText as BasePortableText } from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity/client';
import Image from 'next/image';

const components = {
	block: {
		normal: ({ children }: any) => (
			<p
				style={{
					fontFamily: ' "Inter", sans-serif',
					fontSize: '16px',
					lineHeight: '1.6',
					marginBottom: '16px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</p>
		),
		h1: ({ children }: any) => (
			<h1
				style={{
					fontFamily: '"Inter", sans-serif',
					fontSize: 'clamp(28px, 4vw, 36px)',
					fontWeight: '700',
					lineHeight: '1.2',
					marginBottom: '24px',
					marginTop: '32px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</h1>
		),
		h2: ({ children }: any) => (
			<h2
				style={{
					fontFamily: '"Inter", sans-serif',
					fontSize: 'clamp(24px, 3.5vw, 30px)',
					fontWeight: '600',
					lineHeight: '1.3',
					marginBottom: '20px',
					marginTop: '28px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</h2>
		),
		h3: ({ children }: any) => (
			<h3
				style={{
					fontFamily: '"Inter", sans-serif',
					fontSize: 'clamp(20px, 3vw, 24px)',
					fontWeight: '600',
					lineHeight: '1.4',
					marginBottom: '16px',
					marginTop: '24px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</h3>
		),
		h4: ({ children }: any) => (
			<h4
				style={{
					fontFamily: '"Inter", sans-serif',
					fontSize: 'clamp(18px, 2.5vw, 20px)',
					fontWeight: '600',
					lineHeight: '1.4',
					marginBottom: '12px',
					marginTop: '20px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</h4>
		),
		blockquote: ({ children }: any) => (
			<blockquote
				style={{
					fontFamily: ' "Inter", sans-serif',
					fontSize: '18px',
					fontStyle: 'italic',
					lineHeight: '1.6',
					margin: '24px 0',
					paddingLeft: '24px',
					borderLeft: '4px solid var(--brand-medium)',
					color: 'var(--neutral-on-background-medium)',
					background: 'var(--neutral-alpha-weak)'
				}}>
				{children}
			</blockquote>
		)
	},
	list: {
		bullet: ({ children }: any) => (
			<ul
				style={{
					fontFamily: ' "Inter", sans-serif',
					fontSize: '16px',
					lineHeight: '1.6',
					marginBottom: '16px',
					paddingLeft: '24px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</ul>
		),
		number: ({ children }: any) => (
			<ol
				style={{
					fontFamily: ' "Inter", sans-serif',
					fontSize: '16px',
					lineHeight: '1.6',
					marginBottom: '16px',
					paddingLeft: '24px',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</ol>
		)
	},
	listItem: {
		bullet: ({ children }: any) => (
			<li style={{ marginBottom: '8px' }}>{children}</li>
		),
		number: ({ children }: any) => (
			<li style={{ marginBottom: '8px' }}>{children}</li>
		)
	},
	marks: {
		strong: ({ children }: any) => (
			<strong
				style={{
					fontWeight: '700',
					color: 'var(--neutral-on-background-strong)'
				}}>
				{children}
			</strong>
		),
		em: ({ children }: any) => (
			<em
				style={{
					fontStyle: 'italic',
					color: 'var(--neutral-on-background-medium)'
				}}>
				{children}
			</em>
		),
		underline: ({ children }: any) => (
			<span
				style={{
					textDecoration: 'underline',
					textDecorationColor: 'var(--brand-medium)'
				}}>
				{children}
			</span>
		),
		code: ({ children }: any) => (
			<code
				style={{
					fontFamily: 'Monaco, "Lucida Console", monospace',
					fontSize: '14px',
					background: 'var(--neutral-alpha-weak)',
					padding: '2px 6px',
					borderRadius: '4px',
					color: 'var(--brand-on-background-strong)'
				}}>
				{children}
			</code>
		),
		link: ({ children, value }: any) => (
			<a
				href={value.href}
				target='_blank'
				rel='noopener noreferrer'
				style={{
					color: 'var(--brand-medium)',
					textDecoration: 'underline',
					textDecorationColor: 'var(--brand-alpha-medium)',
					fontWeight: '500',
					transition: 'all 0.2s ease'
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.color = 'var(--brand-strong)';
					e.currentTarget.style.textDecorationColor = 'var(--brand-medium)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.color = 'var(--brand-medium)';
					e.currentTarget.style.textDecorationColor =
						'var(--brand-alpha-medium)';
				}}>
				{children}
			</a>
		)
	},
	types: {
		image: ({ value }: { value: any }) => {
			if (!value?.asset?._ref) {
				return null;
			}

			const imageUrl = urlFor(value)
				.width(800)
				.height(600)
				.fit('max')
				.auto('format')
				.url();

			return (
				<div style={{ margin: '32px 0' }}>
					<Image
						src={imageUrl}
						alt={value.alt || ''}
						width={800}
						height={600}
						style={{
							width: '100%',
							height: 'auto',
							borderRadius: '8px',
							boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
						}}
					/>
					{value.caption && (
						<p
							style={{
								fontFamily: '"Inter", sans-serif',
								fontSize: '14px',
								fontStyle: 'italic',
								textAlign: 'center',
								marginTop: '8px',
								color: 'var(--neutral-on-background-medium)'
							}}>
							{value.caption}
						</p>
					)}
				</div>
			);
		}
	}
};

interface PortableTextProps {
	value: any;
	className?: string;
	style?: React.CSSProperties;
}

export function PortableText({ value, className, style }: PortableTextProps) {
	if (!value) return null;

	return (
		<div
			className={className}
			style={style}>
			<BasePortableText
				value={value}
				components={components}
			/>
		</div>
	);
}
