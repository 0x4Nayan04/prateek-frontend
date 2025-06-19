const home = {
	path: '/',
	label: 'Home',
	title: 'Pratik Srivastava',
	description: '300+ successful Business Intelligence solutions delivered.',
	headline: (
		<>
			We don&apos;t believe in guess work, only in{' '}
			<span className='instrument-serif-highlight'>data driven</span> insights!
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

const work = {
	path: '/work',
	label: 'Work',
	title: 'Projects - Power BI & Web Development Portfolio',
	description:
		'Explore my portfolio of Power BI dashboards, web applications, and data visualization projects.'
	// Create new project pages by adding a new .mdx file to app/work/projects
	// All projects will be listed on the /home and /work routes
};

// Display configuration for components that need it
const display = {
	location: false,
	time: false
};

export { home, work, display };
