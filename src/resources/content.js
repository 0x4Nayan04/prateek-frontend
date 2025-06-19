const home = {
	path: '/',
	label: 'Home',
	title: 'Portfolio',
	description: 'Portfolio website showcasing my work',
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

const work = {
	path: '/work',
	label: 'Work',
	title: 'Projects',
	description: 'Power BI Projects'
	// Create new project pages by adding a new .mdx file to app/work/projects
	// All projects will be listed on the /home and /work routes
};

export { home, work };
