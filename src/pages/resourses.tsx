import { useQuery } from "@apollo/client";
import React from "react";
import Banner from "src/components/banner/Banner";
import {
  GET_CASE_STUDIES,
  GET_FAQS,
  GET_RESOURSES_PAGE,
} from "src/graphql/queries";
import CaseStudies from "src/sections/resourses/CaseStudies";
import Downloads from "src/sections/resourses/Downloads";
import FaqSection from "src/sections/resourses/FaqSection";
import NewsSection from "src/sections/resourses/NewsSection";
import LoadingFallback from "src/components/LoadingFallback";
import {
  CaseStudiesData,
  FaqsData,
  ResourcesPageData,
} from "src/types/graphql/types/resourses.types";

const Page = () => {
  const { data: pageData, loading: pageLoading } =
    useQuery<ResourcesPageData>(GET_RESOURSES_PAGE);

  const { data: caseStudiesData, loading: caseStudiesLoading } =
    useQuery<CaseStudiesData>(GET_CASE_STUDIES, {
      variables: { count: 3 },
    });

  const { loading: faqLoading } = useQuery<FaqsData>(GET_FAQS);

  if (pageLoading) return <LoadingFallback />;

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

          {caseStudiesLoading ? (
            <LoadingFallback />
          ) : (
            caseStudiesData && <CaseStudies data={caseStudiesData} />
          )}

          {faqLoading ? <LoadingFallback /> : <FaqSection />}

          <Downloads data={pageData} />
        </>
      )}
    </>
  );
};

export default Page;
