export interface CaseStudy {
	_id: string;
	title: string;
	slug: { current: string };
	summary: string;
	thumbnail: {
		asset: {
			_ref: string;
			metadata?: {
				dimensions?: {
					width: number;
					height: number;
				};
			};
		};
		alt: string;
	};
	images?: Array<{
		asset: {
			_ref: string;
			metadata?: {
				dimensions?: {
					width: number;
					height: number;
				};
			};
		};
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
