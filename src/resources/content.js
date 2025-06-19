const person = {
	firstName: 'Pratik',
	lastName: 'Srivastava',
	get name() {
		return `${this.firstName} ${this.lastName}`;
	},
	role: 'Product Manager',
	avatar: '/images/avatar.jpg',
	email: 'pratik@pratik.com',
	location: 'India', // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
	languages: ['English', 'Bahasa'] // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
	display: false,
	title: <>Subscribe to {person.firstName}'s Newsletter</>,
	description: (
		<>
			I occasionally write about design, technology, and share thoughts on the
			intersection of creativity and engineering.
		</>
	)
};

const social = [
	// Links are automatically displayed.
	// Import new icons in /once-ui/icons.ts
	{
		name: 'GitHub',
		icon: 'github',
		link: 'https://github.com/once-ui-system/nextjs-starter'
	},
	{
		name: 'LinkedIn',
		icon: 'linkedin',
		link: 'https://www.linkedin.com/company/once-ui/'
	},
	{
		name: 'Threads',
		icon: 'threads',
		link: 'https://www.threads.com/@once_ui'
	},
	{
		name: 'Email',
		icon: 'email',
		link: `mailto:${person.email}`
	}
];

const home = {
	path: '/',
	label: 'Home',
	title: `${person.name}'s Portfolio`,
	description: `Portfolio website showcasing my work as a ${person.role}`,
	headline: (
		<>
			We don't believe in guess work, only in{' '}
			<span className='instrument-serif-highlight '>data driven</span> insights!
		</>
	),
	featured: {
		display: true,
		title: <>Helping companies unlock decisions with data</>
	},
	subline: (
		<>
			300 successful Business Intelligence solutions delivered across platforms
		</>
	)
};

const about = {
	path: '/about',
	label: 'About',
	title: `About – ${person.name}`,
	description: `Meet ${person.name}, ${person.role} from ${person.location}`,
	tableOfContent: {
		display: true,
		subItems: false
	},
	avatar: {
		display: true
	},
	calendar: {
		display: true,
		link: 'https://cal.com'
	},
	intro: {
		display: true,
		title: 'Introduction',
		description: (
			<>
				Selene is a Jakarta-based design engineer with a passion for
				transforming complex challenges into simple, elegant design solutions.
				Her work spans digital interfaces, interactive experiences, and the
				convergence of design and technology.
			</>
		)
	},
	work: {
		display: true, // set to false to hide this section
		title: 'Work Experience',
		experiences: [
			{
				company: 'FLY',
				timeframe: '2022 - Present',
				role: 'Senior Design Engineer',
				achievements: [
					<>
						Redesigned the UI/UX for the FLY platform, resulting in a 20%
						increase in user engagement and 30% faster load times.
					</>,
					<>
						Spearheaded the integration of AI tools into design workflows,
						enabling designers to iterate 50% faster.
					</>
				],
				images: [
					// optional: leave the array empty if you don't want to display images
					{
						src: '/images/projects/project-01/cover-01.jpg',
						alt: 'Once UI Project',
						width: 16,
						height: 9
					}
				]
			},
			{
				company: 'Creativ3',
				timeframe: '2018 - 2022',
				role: 'Lead Designer',
				achievements: [
					<>
						Developed a design system that unified the brand across multiple
						platforms, improving design consistency by 40%.
					</>,
					<>
						Led a cross-functional team to launch a new product line,
						contributing to a 15% increase in overall company revenue.
					</>
				],
				images: []
			}
		]
	},
	studies: {
		display: true, // set to false to hide this section
		title: 'Studies',
		institutions: [
			{
				name: 'University of Jakarta',
				description: <>Studied software engineering.</>
			},
			{
				name: 'Build the Future',
				description: <>Studied online marketing and personal branding.</>
			}
		]
	},
	technical: {
		display: true, // set to false to hide this section
		title: 'Technical skills',
		skills: [
			{
				title: 'Figma',
				description: (
					<>Able to prototype in Figma with Once UI with unnatural speed.</>
				),
				// optional: leave the array empty if you don't want to display images
				images: [
					{
						src: '/images/projects/project-01/cover-02.jpg',
						alt: 'Project image',
						width: 16,
						height: 9
					},
					{
						src: '/images/projects/project-01/cover-03.jpg',
						alt: 'Project image',
						width: 16,
						height: 9
					}
				]
			},
			{
				title: 'Next.js',
				description: (
					<>Building next gen apps with Next.js + Once UI + Supabase.</>
				),
				// optional: leave the array empty if you don't want to display images
				images: [
					{
						src: '/images/projects/project-01/cover-04.jpg',
						alt: 'Project image',
						width: 16,
						height: 9
					}
				]
			}
		]
	}
};

const work = {
	path: '/work',
	label: 'Work',
	title: `Projects – ${person.name}`,
	description: `Design and dev projects by ${person.name}`
	// Create new project pages by adding a new .mdx file to app/work/projects
	// All projects will be listed on the /home and /work routes
};

export { about, home, newsletter, person, social, work };
