# SEO Management Guide - Magic Portfolio

This document provides a comprehensive guide for managing SEO (Search Engine
Optimization) in your Magic Portfolio. All SEO configurations are centralized
and easy to update.

## 📍 Quick Navigation

- [Core SEO Configuration](#core-seo-configuration)
- [Open Graph (OG) Tags](#open-graph-og-tags)
- [Twitter Cards](#twitter-cards)
- [Structured Data (JSON-LD)](#structured-data-json-ld)
- [Favicon & Web App Manifest](#favicon--web-app-manifest)
- [Robots & Sitemap](#robots--sitemap)
- [Content Optimization](#content-optimization)
- [Performance & Technical SEO](#performance--technical-seo)
- [Monitoring & Analytics](#monitoring--analytics)

---

## 🎯 Core SEO Configuration

### Primary Location: `src/app/layout.tsx`

The main SEO metadata is configured in the `metadata` object:

```typescript
export const metadata: Metadata = {
	metadataBase: new URL(baseURL),
	title: {
		default: home.title, // "Pratik Srivastava - Product Manager & Data Analyst"
		template: `%s | ${home.title}` // Page Title | Pratik Srivastava - Product Manager & Data Analyst
	},
	description: home.description // Main site description
	// ... other metadata
};
```

### Content Source: `src/resources/content.js`

Update these values to change site-wide SEO:

```javascript
const home = {
	title: 'Pratik Srivastava - Product Manager & Data Analyst',
	description:
		'Product Manager and Data Analyst specializing in Power BI, Business Intelligence, and data-driven decision making. View my case studies and projects.'
	// ... other content
};
```

### Keywords Configuration

Current keywords in `layout.tsx`:

```typescript
keywords: [
  'Product Manager',
  'Data Analyst',
  'Power BI',
  'Business Intelligence',
  'Portfolio',
  'Pratik Srivastava'
],
```

**How to Update:**

1. Add industry-specific terms
2. Include skill-based keywords
3. Add location-based keywords if relevant
4. Include tool/technology names you use

---

## 📱 Open Graph (OG) Tags

### Current Configuration

```typescript
openGraph: {
  title: home.title,
  description: home.description,
  url: baseURL,
  siteName: home.title,
  images: [
    {
      url: '/api/og',        // Dynamic OG image generation
      width: 1200,
      height: 630,
      alt: home.title
    }
  ],
  locale: 'en_US',
  type: 'website'
}
```

### Dynamic OG Image Generation

Location: `src/app/api/og/route.tsx`

This generates dynamic Open Graph images for:

- Homepage
- Individual project pages
- Custom content based on URL parameters

**Customization Options:**

- Change background colors/gradients
- Update fonts and typography
- Modify layout and positioning
- Add logos or brand elements

### Manual OG Images (Alternative)

If you prefer static images:

1. Create images (1200x630px) in `/public/og/`
2. Update the images array:

```typescript
images: [
	{
		url: '/og/homepage.png',
		width: 1200,
		height: 630,
		alt: 'Pratik Srivastava Portfolio'
	}
];
```

---

## 🐦 Twitter Cards

### Current Configuration

```typescript
twitter: {
  card: 'summary_large_image',
  title: home.title,
  description: home.description,
  images: ['/api/og']
}
```

### Twitter Card Types

- `summary`: Small card with thumbnail
- `summary_large_image`: Large card with prominent image (current)
- `app`: For mobile app promotion
- `player`: For video/audio content

### Adding Twitter Handle

```typescript
twitter: {
  card: 'summary_large_image',
  site: '@yourtwitterhandle',    // Your Twitter username
  creator: '@yourtwitterhandle', // Content creator
  title: home.title,
  description: home.description,
  images: ['/api/og']
}
```

---

## 🏗️ Structured Data (JSON-LD)

### Current Implementation

Basic structured data is included in individual pages. To enhance SEO, add
comprehensive JSON-LD:

### For Homepage (`src/app/page.tsx`)

Add this script tag to include structured data:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Pratik Srivastava",
      "url": baseURL,
      "jobTitle": "Product Manager & Data Analyst",
      "description": home.description,
      "knowsAbout": [
        "Product Management",
        "Data Analysis",
        "Power BI",
        "Business Intelligence",
        "Data Visualization"
      ],
      "sameAs": [
        "https://linkedin.com/in/yourprofile",
        "https://github.com/yourhandle"
      ]
    })
  }}
/>
```

### For Project Pages (`src/app/work/[slug]/page.tsx`)

```typescript
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "author": {
    "@type": "Person",
    "name": "Pratik Srivastava"
  },
  "dateCreated": project.publishedAt,
  "keywords": project.techStack?.join(", ")
}
```

---

## 🖼️ Favicon & Web App Manifest

### Current Favicon Setup

All favicon files are located in `/public/`:

- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

### Web App Manifest: `/public/site.webmanifest`

```json
{
	"name": "Pratik Srivastava - Portfolio",
	"short_name": "Pratik's Portfolio",
	"icons": [
		{
			"src": "/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	],
	"theme_color": "#000000",
	"background_color": "#000000",
	"display": "standalone"
}
```

**To Update Favicons:**

1. Generate new favicon set using tools like [favicon.io](https://favicon.io)
2. Replace files in `/public/`
3. Update `site.webmanifest` if needed
4. No code changes required - links are already in `layout.tsx`

---

## 🤖 Robots & Sitemap

### Robots.txt: `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/private/', '/admin/'] // Add paths to block
		},
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
	};
}
```

### Sitemap: `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: baseURL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: `${baseURL}/work`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8
		}
		// Add more URLs as needed
	];
}
```

---

## ✍️ Content Optimization

### Page Titles Best Practices

1. **Homepage**: Brand + Value Proposition

   - Current: "Pratik Srivastava - Product Manager & Data Analyst"
   - Keep under 60 characters

2. **Project Pages**: Project Name + Brand

   - Template: `%s | ${home.title}`
   - Example: "E-commerce Analytics Dashboard | Pratik Srivastava"

3. **Work Page**: Clear Description + Brand
   - "Case Studies & Projects | Pratik Srivastava"

### Meta Descriptions

- Keep between 150-160 characters
- Include primary keywords naturally
- Add a call-to-action when appropriate
- Make each page's description unique

### Header Structure (H1, H2, H3)

```html
<!-- Homepage -->
<h1>Pratik Srivastava</h1>
<h2>Product Manager & Data Analyst</h2>

<!-- Project Pages -->
<h1>Project Title</h1>
<h2>Project Sections</h2>
<h3>Subsections</h3>
```

---

## ⚡ Performance & Technical SEO

### Core Web Vitals Monitoring

Important metrics to track:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Image Optimization

Current setup uses Next.js Image component with:

- Automatic WebP conversion
- Responsive images
- Lazy loading
- Proper alt tags

### Performance Tips

1. **Fonts**: Currently using Inter font - already optimized
2. **Images**: Use WebP format when possible
3. **Code Splitting**: Automatic with Next.js App Router
4. **Caching**: Configure in `next.config.mjs`

---

## 📊 Monitoring & Analytics

### Google Search Console Setup

1. Add property for your domain
2. Submit sitemap: `yoursite.com/sitemap.xml`
3. Monitor indexing status
4. Check for crawl errors

### Analytics Integration

Add to `src/app/layout.tsx`:

```typescript
// Google Analytics 4
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_ID');
    `
  }}
/>
```

### SEO Monitoring Tools

- **Google Search Console**: Free, essential
- **Google PageSpeed Insights**: Performance monitoring
- **Lighthouse**: Built into Chrome DevTools
- **SEMrush/Ahrefs**: Keyword tracking (paid)

---

## 🔧 Quick Update Checklist

### When Adding New Projects:

- [ ] Update project metadata in CMS/content files
- [ ] Ensure images have proper alt tags
- [ ] Add structured data for the project
- [ ] Update sitemap if needed

### When Changing Personal Info:

- [ ] Update `src/resources/content.js`
- [ ] Check `layout.tsx` metadata
- [ ] Update structured data
- [ ] Regenerate favicons if needed

### Monthly SEO Tasks:

- [ ] Check Google Search Console for errors
- [ ] Monitor Core Web Vitals
- [ ] Update content with new keywords
- [ ] Check broken links
- [ ] Review and update meta descriptions

---

## 🚀 Advanced SEO Features

### Schema.org Markup Ideas

1. **Portfolio/CreativeWork**: For project showcases
2. **Person**: For professional profile
3. **Organization**: If representing a company
4. **Review**: For client testimonials
5. **Event**: For speaking engagements

### Internationalization (i18n)

If expanding globally:

- Add `hreflang` tags
- Create language-specific content
- Update Open Graph locale settings

### Local SEO (if applicable)

- Add location-based keywords
- Include address in structured data
- Create Google My Business profile

---

## 📞 Support & Resources

### Useful Tools:

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Documentation:

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

_Last Updated: January 2024_ _Update this document whenever you make SEO-related
changes to keep it current._
