const home = {
	path: '/',
	label: 'Home',
	title: 'Pratik Srivastava',
	description:
		'Product Manager specializing in Power BI technologies. 300+ successful Business Intelligence solutions delivered.',
	headline: (
		<>
			Building data-driven solutions with{' '}
			<span className='instrument-serif-highlight'>modern technology</span>
		</>
	),
	featured: {
		display: true,
		title: <>Transforming business insights through data & code</>
	},
	subline: (
		<>
			Product Manager with 300+ successful Business Intelligence solutions
			delivered
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
