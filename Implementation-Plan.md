# 🚀 Case Study System Implementation Plan

## 📋 Project Overview

A comprehensive case study portfolio system with Sanity.io CMS integration,
featuring:

- Homepage work section with top 6-8 case studies
- Complete work page with infinite scroll
- Dynamic case study detail pages
- Advanced filtering system
- Responsive design with Once UI components
- Real-time content updates

---

## 🏗️ Technical Architecture

### **Technology Stack**

- **Frontend**: Next.js 14+ (App Router)
- **UI Framework**: Once UI System
- **CMS**: Sanity.io
- **Styling**: Once UI + Custom CSS
- **TypeScript**: Full type safety
- **Data Fetching**: ISR with 1-minute revalidation

### **Project Structure**

```
src/
├── app/
│   ├── work/
│   │   ├── page.tsx                 # Work listing page
│   │   └── [slug]/
│   │       └── page.tsx             # Case study detail page
│   ├── components/
│   │   ├── work/
│   │   │   ├── CaseStudyCard.tsx
│   │   │   ├── CaseStudyGrid.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   ├── FilterDropdown.tsx
│   │   │   ├── LoadingStates.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── sanity/
│   │   │   ├── SanityImage.tsx
│   │   │   ├── BlockContent.tsx
│   │   │   └── PortableText.tsx
│   │   └── ui/
│   │       ├── InfiniteScroll.tsx
│   │       ├── ScrollToTop.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   └── utils/
│   │       ├── filters.ts
│   │       └── url.ts
│   └── hooks/
│       ├── useInfiniteScroll.ts
│       ├── useFilters.ts
│       └── useTableOfContents.ts
```

---

## 🎯 Implementation Phases

### **Phase 1: Foundation Setup**

**Duration**: 2-3 hours

#### Step 1.1: Environment Configuration

Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=5kx3c3yg
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

#### Step 1.2: Dependencies Installation

```bash
npm install @sanity/client @sanity/image-url next-sanity
npm install @types/react @types/node
```

#### Step 1.3: Sanity Client Setup

Create `src/lib/sanity/client.ts`:

```typescript
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
```

#### Step 1.4: TypeScript Definitions

Create `src/lib/sanity/types.ts`:

```typescript
export interface CaseStudy {
	_id: string;
	title: string;
	slug: { current: string };
	summary: string;
	thumbnail: {
		asset: { _ref: string };
		alt: string;
	};
	images?: Array<{
		asset: { _ref: string };
		alt: string;
	}>;
	techStack: string[];
	industry: string[];
	priority: number;
	clientOverview?: any;
	problem?: any;
	approach?: any;
	solution?: any;
	result?: any;
	iframePreview?: string;
	pdfFile?: {
		asset: { _ref: string; url: string };
	};
	externalLinks?: Array<{
		title: string;
		url: string;
		description?: string;
	}>;
}

export interface FilterState {
	techStack: string[];
	industry: string[];
}
```

---

### **Phase 2: Core Components**

**Duration**: 4-5 hours

#### Step 2.1: Case Study Card Component

Create `src/components/work/CaseStudyCard.tsx`:

```typescript
'use client';

import { useState } from 'react';
import {
	Card,
	Column,
	Heading,
	Text,
	Button,
	Row,
	Tag,
	RevealFx
} from '@once-ui-system/core';
import { CaseStudy } from '@/lib/sanity/types';
import { SanityImage } from '@/components/sanity/SanityImage';

interface CaseStudyCardProps {
	caseStudy: CaseStudy;
	index: number;
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<RevealFx
			translateY={16}
			delay={index * 0.1}>
			<Card
				fillWidth
				padding='0'
				radius='l'
				border='neutral-alpha-weak'
				background='surface'
				style={{ overflow: 'hidden', cursor: 'pointer' }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<Column gap='0'>
					{/* Thumbnail */}
					<div style={{ position: 'relative', aspectRatio: '16/10' }}>
						<SanityImage
							image={caseStudy.thumbnail}
							alt={caseStudy.thumbnail.alt}
							fill
							priority={index < 4}
							style={{ objectFit: 'cover' }}
						/>

						{/* Hover Overlay */}
						{isHovered && (
							<div
								style={{
									position: 'absolute',
									inset: 0,
									background: 'rgba(0, 0, 0, 0.7)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.3s ease'
								}}>
								<Button
									href={`/work/${caseStudy.slug.current}`}
									variant='primary'
									size='m'
									arrowIcon>
									Read Case Study
								</Button>
							</div>
						)}
					</div>

					{/* Content */}
					<Column
						padding='20'
						gap='16'>
						<Heading
							variant='heading-strong-m'
							onBackground='neutral-strong'>
							{caseStudy.title}
						</Heading>

						<Text
							variant='body-default-m'
							onBackground='neutral-medium'
							style={{
								lineHeight: '1.6',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden'
							}}>
							{caseStudy.summary}
						</Text>

						{/* Tags */}
						<Row
							gap='8'
							wrap>
							{caseStudy.techStack.slice(0, 3).map((tech) => (
								<Tag
									key={tech}
									size='s'
									variant='neutral'>
									{tech}
								</Tag>
							))}
							{caseStudy.techStack.length > 3 && (
								<Tag
									size='s'
									variant='neutral'>
									+{caseStudy.techStack.length - 3}
								</Tag>
							)}
						</Row>
					</Column>
				</Column>
			</Card>
		</RevealFx>
	);
}
```

#### Step 2.2: Filter Sidebar Component

Create `src/components/work/FilterSidebar.tsx`:

```typescript
'use client';

import { useState } from 'react';
import {
	Column,
	Flex,
	Heading,
	Text,
	Button,
	Checkbox,
	Icon
} from '@once-ui-system/core';
import { FilterState } from '@/lib/sanity/types';

interface FilterSidebarProps {
	filters: FilterState;
	availableFilters: {
		techStack: string[];
		industry: string[];
	};
	onFiltersChange: (filters: FilterState) => void;
	isCollapsed: boolean;
	onToggleCollapse: () => void;
}

export function FilterSidebar({
	filters,
	availableFilters,
	onFiltersChange,
	isCollapsed,
	onToggleCollapse
}: FilterSidebarProps) {
	const clearAllFilters = () => {
		onFiltersChange({ techStack: [], industry: [] });
	};

	const handleTechStackChange = (tech: string, checked: boolean) => {
		const newTechStack = checked
			? [...filters.techStack, tech]
			: filters.techStack.filter((t) => t !== tech);

		onFiltersChange({ ...filters, techStack: newTechStack });
	};

	const handleIndustryChange = (industry: string, checked: boolean) => {
		const newIndustry = checked
			? [...filters.industry, industry]
			: filters.industry.filter((i) => i !== industry);

		onFiltersChange({ ...filters, industry: newIndustry });
	};

	const hasActiveFilters =
		filters.techStack.length > 0 || filters.industry.length > 0;

	return (
		<Column
			gap='24'
			padding='24'
			background='surface'
			border='neutral-alpha-weak'
			radius='l'
			style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
			{/* Header */}
			<Flex
				justify='space-between'
				align='center'>
				<Heading variant='heading-strong-s'>Filters</Heading>
				<Button
					variant='tertiary'
					size='s'
					onClick={onToggleCollapse}
					prefixIcon={isCollapsed ? 'chevronDown' : 'chevronUp'}
				/>
			</Flex>

			{!isCollapsed && (
				<>
					{/* Clear All */}
					{hasActiveFilters && (
						<Button
							variant='secondary'
							size='s'
							onClick={clearAllFilters}
							fillWidth>
							Clear All Filters
						</Button>
					)}

					{/* Tech Stack */}
					<Column gap='12'>
						<Text
							variant='label-strong-s'
							onBackground='neutral-strong'>
							Tech Stack
						</Text>
						<Column gap='8'>
							{availableFilters.techStack.map((tech) => (
								<Checkbox
									key={tech}
									label={tech}
									isChecked={filters.techStack.includes(tech)}
									onToggle={(checked) => handleTechStackChange(tech, checked)}
								/>
							))}
						</Column>
					</Column>

					{/* Industry */}
					<Column gap='12'>
						<Text
							variant='label-strong-s'
							onBackground='neutral-strong'>
							Industry
						</Text>
						<Column gap='8'>
							{availableFilters.industry.map((industry) => (
								<Checkbox
									key={industry}
									label={industry}
									isChecked={filters.industry.includes(industry)}
									onToggle={(checked) =>
										handleIndustryChange(industry, checked)
									}
								/>
							))}
						</Column>
					</Column>
				</>
			)}
		</Column>
	);
}
```

---

### **Phase 3: Homepage Work Section**

**Duration**: 3-4 hours

#### Step 3.1: GROQ Queries

Create `src/lib/sanity/queries.ts`:

```typescript
export const CASE_STUDIES_HOMEPAGE_QUERY = `
  *[_type == "caseStudy"] | order(priority asc) [0...8] {
    _id,
    title,
    slug,
    summary,
    thumbnail,
    techStack,
    industry,
    priority
  }
`;

export const CASE_STUDIES_ALL_QUERY = `
  *[_type == "caseStudy"] | order(priority asc) {
    _id,
    title,
    slug,
    summary,
    thumbnail,
    techStack,
    industry,
    priority
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    thumbnail,
    images,
    techStack,
    industry,
    priority,
    clientOverview,
    problem,
    approach,
    solution,
    result,
    iframePreview,
    pdfFile,
    externalLinks
  }
`;

export const AVAILABLE_FILTERS_QUERY = `
  {
    "techStack": *[_type == "caseStudy"].techStack[] | unique | order(@),
    "industry": *[_type == "caseStudy"].industry[] | unique | order(@)
  }
`;
```

#### Step 3.2: Homepage Work Section Integration

Update `src/app/page.tsx` to include work section:

```typescript
// Add work section after About Me
{
	/* Work Section */
}
<Flex
	fillWidth
	gap='32'
	mobileDirection='column'
	paddingX='24'
	paddingY='48'>
	<RevealFx
		translateY='12'
		delay={0.1}>
		<Flex
			flex={1}
			paddingLeft='l'
			paddingTop='8'>
			<Column gap='16'>
				<Flex
					gap='12'
					vertical='center'>
					<Icon
						name='grid'
						size='m'
						onBackground='brand-medium'
					/>
					<Heading
						as='h2'
						variant='display-strong-s'
						wrap='balance'
						onBackground='neutral-strong'>
						Featured Work
					</Heading>
				</Flex>
				<Text
					variant='body-default-m'
					onBackground='neutral-weak'
					style={{ maxWidth: '320px' }}>
					Case studies showcasing data-driven solutions and strategic impact
				</Text>
			</Column>
		</Flex>
	</RevealFx>
	<Flex
		flex={3}
		paddingX='20'>
		<CaseStudyHomepageSection />
	</Flex>
</Flex>;
```

---

### **Phase 4: Work Page & Infinite Scroll**

**Duration**: 5-6 hours

#### Step 4.1: Infinite Scroll Hook

Create `src/hooks/useInfiniteScroll.ts`:

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { CaseStudy } from '@/lib/sanity/types';

export function useInfiniteScroll(
	initialData: CaseStudy[],
	itemsPerPage: number = 8
) {
	const [data, setData] = useState<CaseStudy[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);

		try {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const start = page * itemsPerPage;
			const newItems = initialData.slice(start, start + itemsPerPage);

			if (newItems.length === 0) {
				setHasMore(false);
			} else {
				setData((prev) => [...prev, ...newItems]);
				setPage((prev) => prev + 1);
			}
		} catch (error) {
			console.error('Error loading more items:', error);
		} finally {
			setLoading(false);
		}
	}, [initialData, itemsPerPage, loading, hasMore, page]);

	const reset = useCallback(
		(newData: CaseStudy[]) => {
			setData(newData.slice(0, itemsPerPage));
			setPage(1);
			setHasMore(newData.length > itemsPerPage);
			setLoading(false);
		},
		[itemsPerPage]
	);

	return {
		data,
		loading,
		hasMore,
		loadMore,
		reset
	};
}
```

---

### **Phase 5: Case Study Detail Page**

**Duration**: 6-8 hours

#### Step 5.1: Table of Contents Component

Create `src/components/work/TableOfContents.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Column, Text, Button } from '@once-ui-system/core';

interface TOCItem {
	id: string;
	title: string;
	level: number;
}

interface TableOfContentsProps {
	content: any[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
	const [activeSection, setActiveSection] = useState('');
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	const sections = [
		{ id: 'overview', title: 'Overview', level: 1 },
		{ id: 'client-overview', title: 'Client Overview', level: 2 },
		{ id: 'problem', title: 'Problem', level: 2 },
		{ id: 'approach', title: 'Approach', level: 2 },
		{ id: 'solution', title: 'Solution', level: 2 },
		{ id: 'result', title: 'Result & Impact', level: 2 }
	];

	useEffect(() => {
		const handleScroll = () => {
			// Calculate scroll progress
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = Math.min(scrollTop / docHeight, 1);
			setScrollProgress(progress);

			// Find active section
			const sectionElements = sections
				.map((section) => document.getElementById(section.id))
				.filter(Boolean);

			const currentSection = sectionElements.find((element) => {
				if (!element) return false;
				const rect = element.getBoundingClientRect();
				return rect.top <= 100 && rect.bottom >= 100;
			});

			if (currentSection) {
				setActiveSection(currentSection.id);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<Column
			gap='16'
			padding='20'
			background='surface'
			border='neutral-alpha-weak'
			radius='m'
			style={{
				position: 'sticky',
				top: '100px',
				height: 'fit-content',
				maxHeight: 'calc(100vh - 120px)',
				overflow: 'auto'
			}}>
			{/* Header with Progress */}
			<Column gap='8'>
				<Button
					variant='tertiary'
					size='s'
					onClick={() => setIsCollapsed(!isCollapsed)}
					style={{ justifyContent: 'space-between' }}>
					<Text variant='label-strong-s'>Table of Contents</Text>
					{/* Progress indicator */}
					<div
						style={{
							width: '40px',
							height: '4px',
							background: 'var(--neutral-alpha-weak)',
							borderRadius: '2px',
							overflow: 'hidden'
						}}>
						<div
							style={{
								width: `${scrollProgress * 100}%`,
								height: '100%',
								background: 'var(--brand-solid)',
								transition: 'width 0.2s ease'
							}}
						/>
					</div>
				</Button>
			</Column>

			{/* Mobile Collapsible Content */}
			{!isCollapsed && (
				<Column gap='4'>
					{sections.map((section, index) => (
						<Button
							key={section.id}
							variant='tertiary'
							size='s'
							onClick={() => scrollToSection(section.id)}
							style={{
								justifyContent: 'flex-start',
								paddingLeft: section.level === 2 ? '16px' : '8px',
								opacity: activeSection === section.id ? 1 : 0.7,
								fontWeight: activeSection === section.id ? 'bold' : 'normal'
							}}>
							{index + 1}. {section.title}
						</Button>
					))}
				</Column>
			)}
		</Column>
	);
}
```

#### Step 5.2: Case Study Detail Page

Create `src/app/work/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { CASE_STUDY_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import { CaseStudy } from '@/lib/sanity/types';
import { CaseStudyDetailClient } from './CaseStudyDetailClient';

interface Props {
	params: { slug: string };
}

export const revalidate = 60; // ISR revalidation

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
	return await client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const caseStudy = await getCaseStudy(params.slug);

	if (!caseStudy) {
		return {
			title: 'Case Study Not Found'
		};
	}

	return {
		title: `${caseStudy.title} | Pratik Srivastava`,
		description: caseStudy.summary,
		openGraph: {
			title: caseStudy.title,
			description: caseStudy.summary,
			images: caseStudy.thumbnail
				? [
						{
							url: urlFor(caseStudy.thumbnail).width(1200).height(630).url(),
							width: 1200,
							height: 630,
							alt: caseStudy.thumbnail.alt
						}
				  ]
				: []
		}
	};
}

export default async function CaseStudyPage({ params }: Props) {
	const caseStudy = await getCaseStudy(params.slug);

	if (!caseStudy) {
		notFound();
	}

	return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
```

---

### **Phase 6: Performance & Polish**

**Duration**: 3-4 hours

#### Step 6.1: Loading States

Create comprehensive skeleton components for all loading states.

#### Step 6.2: Error Boundaries

Implement error handling for API failures and missing content.

#### Step 6.3: SEO Optimization

- Dynamic meta tags
- Structured data
- Sitemap generation

#### Step 6.4: Performance Optimization

- Image optimization
- Code splitting
- Bundle analysis

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Sanity webhooks setup (optional)
- [ ] Performance monitoring
- [ ] Analytics implementation
- [ ] SEO validation
- [ ] Accessibility testing
- [ ] Cross-browser testing

---
