"use client";

import { CaseStudy } from '@/lib/sanity/types';
import { CaseStudyGrid } from "./CaseStudyGrid";
import { useFilters } from "@/hooks/useFilters";

interface ProjectsClientProps {
  caseStudies: CaseStudy[];
}

export function ProjectsClient({ caseStudies }: ProjectsClientProps) {
  const {
    filters,
    setFilters,
    availableFilters,
    filteredCaseStudies
  } = useFilters(caseStudies);

  return (
    <CaseStudyGrid
      caseStudies={filteredCaseStudies}
      filters={filters}
      availableFilters={availableFilters}
      onFiltersChange={setFilters}
      showFilters={true}
      title="Case Studies"
      description="Explore data-driven solutions and strategic impact across various industries and technologies."
      columns={{ desktop: 1, tablet: 1, mobile: 1 }}
    />
  );
} 