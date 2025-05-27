import { useQuery } from "@apollo/client";
import React from "react";
import { Outlet } from "react-router";
import Banner from "src/components/banner/Banner";
import { GET_SERVICES_PAGE, GET_SOLUTIONS_PAGE } from "src/graphql/queries";
import BannerContent from "src/sections/services/BannerContent";
import OtherTopics from "src/sections/services/OtherTopics";
import ServiceCards from "src/sections/services/ServiceCards";
import { GetSolutionsPageResponse } from "src/types/graphql/types/solutions.types";

const Page = () => {
  const {
    data: solutionData,
    loading: solutionLoading,
    error: solutionError,
  } = useQuery<GetSolutionsPageResponse>(GET_SOLUTIONS_PAGE);
  return (
    <>
      {solutionData && (
        <>
          <Banner
            bgUrl={
              solutionData?.page?.solutionsPageBannerSection?.bannerImage?.node
                ?.sourceUrl
            }
            mainTitle={
              solutionData?.page?.solutionsPageBannerSection?.bannerTitle
            }
          />
          <BannerContent content={solutionData?.page?.solutionsPageBannerSection?.pageContent} />
          <ServiceCards data={solutionData?.solutions.nodes}/>
          <OtherTopics data={solutionData.page.solutionsPageOtherTopicsSection}/>
          <Outlet />
        </>
      )}
    </>
  );
};

export default Page;
