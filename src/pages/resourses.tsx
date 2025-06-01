import { useQuery } from "@apollo/client";
import React from "react";
import Banner from "src/components/banner/Banner";
import { GET_CASE_STUDIES, GET_RESOURSES_PAGE } from "src/graphql/queries";
import CaseStudies from "src/sections/resourses/CaseStudies";
import NewsSection from "src/sections/resourses/NewsSection";
import {
  CaseStudiesData,
  ResourcesPageData,
} from "src/types/graphql/types/resourses.types";

const Page = () => {
  const { data: pageData, loading: pageLoading } =
    useQuery<ResourcesPageData>(GET_RESOURSES_PAGE);
  const { data: caseStudiesData } = useQuery<CaseStudiesData>(
    GET_CASE_STUDIES,
    {
      variables: { count: 3 },
    }
  );

  return (
    <>
      {pageData && (
        <>
          <Banner
            bgUrl={
              pageData?.page.resourcesPageBannerSection.bannerImage.node
                .sourceUrl
            }
            mainTitle={pageData?.page.resourcesPageBannerSection.bannerTitle}
          />
          <NewsSection data={pageData.page.resourcesPageNewsSection} />
          {caseStudiesData && <CaseStudies data={caseStudiesData}/>}
        </>
      )}
    </>
  );
};

export default Page;
