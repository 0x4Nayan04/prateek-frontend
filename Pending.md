
Now I have some things which we need to dicuss then we should implememt it

Pending things :

1. Work Section on the Home Page

- It Include include these things :
- Some Top 6-8 Case Study ( I Will attach the context about it how to choose
  this later,choose accorind to the provided sanity schema Priority no. 1->2->3----------------------


  Q
  etc) and then a button show more case study which will navigate to /work page
- also a filtre button (dropdown) on to filtre the case study (use will add this
  using the Sanity.io)

```

The filter button will allow visitors to easily explore your case studies based
on two categories:

Tech Stack (e.g., Power BI, SQL, Python)

Industry (e.g., Retail, Fintech, Healthcare)

When a user clicks the filter button (usually at the top of the Case Studies
section), a dropdown or popup will appear where they can:

Select one or multiple technologies

Choose one or more industries

Once selected, the case study cards shown below will automatically update to
match the filters.

This helps people quickly find work that’s most relevant to them, improving the
experience for recruiters, potential clients, or collaborators.

```

- Talking about the case Study Component on the Home Page

1.  It should Contain Thubmbnail Image
2.  A Title
3.  A Short Summary (with `text truncation `)
4.  and when i hover on it a button or icon to `Read the Case Study` and go to
    `/work/[slug]` page.

- The Component Should be Responsive
- I am Planning to get this one
- Should be responsive (Check the Attached Screenshot)
  ### Attaching Some UI Inspiration (You should decide what what screen I need what)
  > Remember these are just for inspiration I want to day that for our Project
  > we just need thumbnail,filtre tag,titlem,summary and Read Case Study Button
  > ![alt text](src/images-inspiration/Desptp.jpeg) >
  > ![alt text](src/images-inspiration/Mobile.jpeg) >
  > ![alt text](<src/images-inspiration/TAB AND WHEN ZOM.jpeg>)

2. Work Page (/work) -> Change the Header Also then

- it's same as the 1. (home page work ) but it contain all the Case Study Card.

3. Slug Page /work/[slug]

This is the most Important Page for our Portflio. When a user click a Case Study
then this Page Will Open

Should Follow This Structure (Use the Schema for refence)

- Use Line Breaker

1. Title(h1 heading)
2. Images (not thumbanil , it will be array)
3. Short Summary and and Filtre tags (with nice ui)
4. Client Overview (heading h2, this heading and the content with nice ui and
   typography)
5. Problem (heading h2, this heading and the content with nice ui and
   typography)
6. Approach (heading h2, this heading and the content with nice ui and
   typography)
7. Solution (heading h2, this heading and the content with nice ui and
   typography)
8. Result & Impact (heading h2, this heading and the content with nice ui and
   typography)
9. Solution (heading h2, this heading and the content with nice ui and
   typography)
10. Solution (heading h2, this heading and the content with nice ui and
    typography)
11. Dashboard/Report Embed URL (Iframe if added)
12. Downloadable Report (PDF) (Pdf View if added)
13. External Links (Pdf if added)

- Make sure to Implement Pagination for this
- And A button to /work page (with NICE UI)

# Important Context About the Project

Hey I am Using sanity.io for CMS

Here are my Schema Code :

1.  index.ts

```ts
// /schemas/index.ts

import blockContent from './blockContent';
import caseStudy from './caseStudy';

export const schemaTypes = [blockContent, caseStudy];
```

2.caseStudy.ts

```ts
// /schemas/caseStudy.ts

import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'caseStudy',
	title: 'Case Study',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'The main title of the case study',
			validation: (Rule) => Rule.required().min(10).max(100)
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'URL-friendly version of the title',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'summary',
			title: 'Short Summary',
			type: 'text',
			description: 'Brief description of the case study',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'thumbnail',
			title: 'Thumbnail Image',
			type: 'image',
			description: 'Main image shown on case study cards and headers',
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alt text',
					validation: (Rule) => Rule.required()
				}
			]
		}),
		defineField({
			name: 'images',
			title: 'Gallery Images',
			type: 'array',
			description: 'Additional images for the case study',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alt text',
							validation: (Rule) => Rule.required()
						}
					]
				}
			]
		}),
		defineField({
			name: 'techStack',
			title: 'Tech Stack',
			type: 'array',
			description: 'Technologies used (e.g., Power BI, SQL, Python)',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			},
			validation: (Rule) => Rule.max(10)
		}),

		defineField({
			name: 'industry',
			title: 'Industry',
			type: 'array',
			description: 'Relevant industries (e.g., Retail, Fintech, Healthcare)',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			},
			validation: (Rule) => Rule.max(5)
		}),

		defineField({
			name: 'priority',
			title: 'Priority (Lower number = higher priority)',
			type: 'number',
			description:
				'Used to sort case studies. Lower = higher priority. Keep it unique manually.',
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.max(100)
					.warning('Ensure this number is unique across all case studies.'),
			initialValue: 50
		}),
		defineField({
			name: 'clientOverview',
			title: 'Client Overview',
			type: 'blockContent',
			description: 'Background information about the client and their business'
		}),
		defineField({
			name: 'problem',
			title: 'Problem',
			type: 'blockContent',
			description: 'What challenges or problems needed to be solved'
		}),
		defineField({
			name: 'approach',
			title: 'Approach',
			type: 'blockContent',
			description: 'Your methodology and strategy for solving the problem'
		}),
		defineField({
			name: 'solution',
			title: 'Solution',
			type: 'blockContent',
			description: 'The technical solution and implementation details'
		}),
		defineField({
			name: 'result',
			title: 'Result & Impact',
			type: 'blockContent',
			description: 'Outcomes, metrics, and business impact achieved'
		}),
		defineField({
			name: 'iframePreview',
			title: 'Dashboard/Report Embed URL',
			type: 'url',
			description:
				'URL for embedding Power BI, Tableau, or other interactive dashboards'
		}),
		defineField({
			name: 'pdfFile',
			title: 'Downloadable Report (PDF)',
			type: 'file',
			description: 'PDF report or documentation for download',
			options: {
				accept: '.pdf'
			}
		}),
		defineField({
			name: 'externalLinks',
			title: 'External Links',
			type: 'array',
			description: 'Links to live dashboards, reports, or related resources',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', type: 'string', title: 'Link Title' },
						{ name: 'url', type: 'url', title: 'URL' },
						{ name: 'description', type: 'string', title: 'Description' }
					]
				}
			]
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'summary',
			media: 'thumbnail'
		}
	},
	orderings: [
		{
			title: 'Priority (Highest First)',
			name: 'priorityDesc',
			by: [{ field: 'priority', direction: 'asc' }]
		},
		{
			title: 'Title A-Z',
			name: 'titleAsc',
			by: [{ field: 'title', direction: 'asc' }]
		}
	]
});
```

3. blockContent.ts

```ts
// /schemas/blockContent.ts

import { defineType, defineArrayMember } from 'sanity';

export default defineType({
	name: 'blockContent',
	title: 'Block Content',
	type: 'array',
	of: [
		// Basic text block
		defineArrayMember({
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'H1', value: 'h1' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'Quote', value: 'blockquote' }
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
				{ title: 'Checklist', value: 'checklist' }
			],
			marks: {
				decorators: [
					{ title: 'Bold', value: 'strong' },
					{ title: 'Italic', value: 'em' },
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
					{ title: 'Code', value: 'code' },
					{ title: 'Highlight', value: 'highlight' }
				],
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'External Link',
						fields: [
							{
								name: 'href',
								type: 'url',
								title: 'URL',
								validation: (Rule) => Rule.required()
							},
							{
								name: 'blank',
								type: 'boolean',
								title: 'Open in new tab?',
								initialValue: true
							},
							{
								name: 'title',
								type: 'string',
								title: 'Link Title (optional)',
								description: 'Appears on hover'
							}
						]
					},
					{
						name: 'internalLink',
						type: 'object',
						title: 'Internal Link',
						fields: [
							{
								name: 'reference',
								type: 'reference',
								title: 'Reference',
								to: [{ type: 'caseStudy' }]
							}
						]
					}
				]
			}
		}),

		// Enhanced Image block
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alt text',
					description: 'Important for accessibility and SEO',
					validation: (Rule) => Rule.required()
				},
				{
					name: 'caption',
					type: 'string',
					title: 'Caption',
					description: 'Optional caption displayed below the image'
				},
				{
					name: 'size',
					type: 'string',
					title: 'Display Size',
					options: {
						list: [
							{ title: 'Small', value: 'small' },
							{ title: 'Medium', value: 'medium' },
							{ title: 'Large', value: 'large' },
							{ title: 'Full Width', value: 'full' }
						]
					},
					initialValue: 'medium'
				}
			]
		}),

		// Enhanced iframe embed block
		defineArrayMember({
			type: 'object',
			name: 'iframe',
			title: 'Embedded Content (iframe)',
			fields: [
				{
					name: 'url',
					type: 'url',
					title: 'Embed URL',
					validation: (Rule) => Rule.required()
				},
				{
					name: 'title',
					type: 'string',
					title: 'Title',
					description: 'Descriptive title for accessibility',
					validation: (Rule) => Rule.required()
				},
				{
					name: 'height',
					type: 'number',
					title: 'Height (px)',
					initialValue: 600,
					validation: (Rule) => Rule.min(200).max(1200)
				},
				{
					name: 'allowFullscreen',
					type: 'boolean',
					title: 'Allow Fullscreen?',
					initialValue: true
				}
			],
			preview: {
				select: { title: 'title', url: 'url', height: 'height' },
				prepare({ title, url, height }) {
					return {
						title: title || 'Embedded Content',
						subtitle: `${url} (${height}px)`
					};
				}
			}
		}),

		// Callout/Alert block
		defineArrayMember({
			type: 'object',
			name: 'callout',
			title: 'Callout Box',
			fields: [
				{
					name: 'type',
					type: 'string',
					title: 'Callout Type',
					options: {
						list: [
							{ title: 'Info', value: 'info' },
							{ title: 'Success', value: 'success' },
							{ title: 'Warning', value: 'warning' },
							{ title: 'Error', value: 'error' },
							{ title: 'Note', value: 'note' }
						]
					},
					initialValue: 'info'
				},
				{
					name: 'title',
					type: 'string',
					title: 'Title (optional)'
				},
				{
					name: 'content',
					type: 'array',
					title: 'Content',
					of: [{ type: 'block' }]
				}
			],
			preview: {
				select: { title: 'title', type: 'type' },
				prepare({ title, type }) {
					return {
						title: title || 'Callout',
						subtitle: type
					};
				}
			}
		}),

		// Metrics/Statistics block
		defineArrayMember({
			type: 'object',
			name: 'metricsGrid',
			title: 'Metrics Grid',
			fields: [
				{
					name: 'metrics',
					type: 'array',
					title: 'Metrics',
					of: [
						{
							type: 'object',
							fields: [
								{ name: 'label', type: 'string', title: 'Label' },
								{ name: 'value', type: 'string', title: 'Value' },
								{ name: 'description', type: 'string', title: 'Description' }
							]
						}
					],
					validation: (Rule) => Rule.max(6)
				}
			],
			preview: {
				select: { metrics: 'metrics' },
				prepare({ metrics }) {
					const count = metrics ? metrics.length : 0;
					return {
						title: `Metrics Grid (${count} items)`,
						subtitle: 'Key performance indicators'
					};
				}
			}
		}),

		// PDF file block (enhanced)
		defineArrayMember({
			type: 'object',
			name: 'pdfEmbed',
			title: 'PDF Document',
			fields: [
				{
					name: 'file',
					type: 'file',
					title: 'PDF File',
					options: {
						accept: '.pdf'
					},
					validation: (Rule) => Rule.required()
				},
				{
					name: 'title',
					type: 'string',
					title: 'Document Title',
					validation: (Rule) => Rule.required()
				},
				{
					name: 'description',
					type: 'text',
					title: 'Description'
				},
				{
					name: 'showPreview',
					type: 'boolean',
					title: 'Show Preview?',
					description: 'Display PDF in an embedded viewer',
					initialValue: true
				},
				{
					name: 'downloadText',
					type: 'string',
					title: 'Download Button Text',
					initialValue: 'Download PDF'
				}
			],
			preview: {
				select: { title: 'title', file: 'file' },
				prepare({ title, file }) {
					return {
						title: title || 'PDF Document',
						subtitle: file ? file.asset?.originalFilename : 'No file selected'
					};
				}
			}
		})
	]
});
```

You need to fetch will fetch the code from the grok query ( sanity language )

and the data will use to show the case study work

Some things I want you to make sure Happen:

1. The data revalidate every 1 min ( or if you can give any other apporch to it,
   I want that when i change to CMS then it should show on the UI immedialty)

# Please Ask me some Question First and Discuss this Approch and if you want to add some more then add more and then Respond with a detail Instruction.md with all the Plan to implemnt this.

# Also use Once UI theme only

# Make sure UI is nice and responsive for all device

# Clean All the Doubts then Create a Plan
----------------------


