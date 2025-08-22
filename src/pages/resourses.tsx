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
import ScrollToHash from "src/components/ScrollToHash";

const Page = () => {
  const { data: pageData, loading: pageLoading } =
    useQuery<ResourcesPageData>(GET_RESOURSES_PAGE);

  const { data: caseStudiesData, loading: caseStudiesLoading } =
    useQuery<CaseStudiesData>(GET_CASE_STUDIES, {
      variables: { count: 3 },
    });

  const { loading: faqLoading } = useQuery<FaqsData>(GET_FAQS);

  if (pageLoading) return <LoadingFallback />;

  const allLoaded =
    !pageLoading && !caseStudiesLoading && !faqLoading;

  return (
    <>
      <ScrollToHash deps={[allLoaded]} offset={100} />
      {pageData && (
        <>
          <Banner
            bgUrl={
              pageData?.page.resourcesPageBannerSection.bannerImage.node
                .sourceUrl
            }
            mainTitle={pageData?.page.resourcesPageBannerSection.bannerTitle}
          />
          <div id="news">
            <NewsSection data={pageData.page.resourcesPageNewsSection} />
          </div>

          {caseStudiesLoading ? (
            <LoadingFallback />
          ) : (
            caseStudiesData &&
            <div id="casestudies">
              <CaseStudies data={caseStudiesData} />
            </div>
          )}

          {faqLoading ? <LoadingFallback /> :
            <div id="faq">
              <FaqSection />
            </div>
          }
          <div id="downloads">
            <Downloads data={pageData} />
          </div>
        </>
      )}
    </>
  );
};

export default Page;
