export const CASE_STUDIES_HOMEPAGE_QUERY = `
  *[_type == "caseStudy"] | order(priority asc) [0...8] {
    _id,
    title,
    slug,
    summary,
    thumbnail,
    images,
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
    images,
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
