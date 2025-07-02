export const CASE_STUDIES_HOMEPAGE_QUERY = `
  *[_type == "caseStudy"] | order(_createdAt desc) [0...8] {
    _id,
    title,
    slug,
    summary,
    thumbnail,
    images,
    techStack,
    industry,
    _createdAt
  }
`;

export const CASE_STUDIES_ALL_QUERY = `
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    summary,
    thumbnail,
    images,
    techStack,
    industry,
    _createdAt
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    thumbnail {
      ...,
      asset-> {
        ...,
        metadata { dimensions }
      }
    },
    images[] {
      ...,
      asset-> {
        ...,
        metadata { dimensions }
      }
    },
    techStack,
    industry,
    _createdAt,
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
    "techStack": array::unique(*[_type == "caseStudy"].techStack[]) | order(@),
    "industry": array::unique(*[_type == "caseStudy"].industry[]) | order(@)
  }
`;
