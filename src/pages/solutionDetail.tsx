import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import Banner from "src/components/banner/Banner";
import ContactUsCard from "src/components/ContactUsCard";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_SOLUTIONS_WITH_SUBSOLUTIONS } from "src/graphql/queries";
import BannerContent from "src/sections/services/BannerContent";
import OtherServices from "src/sections/services/OtherServices";
import OtherTopics from "src/sections/services/OtherTopics";
import { GetSolutionsWithSubSolutionsData } from "src/types/graphql/types/solutions.types";

const Page = () => {
  const { solutionId } = useParams();
  const { data, loading } = useQuery<GetSolutionsWithSubSolutionsData>(
    GET_SOLUTIONS_WITH_SUBSOLUTIONS,
    {
      variables: {
        uri: `solution/${solutionId}`,
      },
    }
  );
  if (loading) return <LoadingFallback />;

  const bannerImage =
    data?.solution?.solutionsSinglePageBannerSection?.bannerImage?.node
      ?.sourceUrl || "";

  const bannerTitle =
    data?.solution?.solutionsSinglePageBannerSection?.bannerTitle || "";

  const childNodes = data?.solution?.children?.nodes || [];

  const otherTopicsData = data?.solution?.solutionsPageOtherTopicsSection;
  const bannerContent = data?.solution.content || "";
  return (
    <>
      <Banner
        bgUrl={bannerImage}
        mainTitle={bannerTitle}
        subTitle="Solutions"
      />
      <BannerContent content={bannerContent} />
      <OtherServices data={childNodes} />
      <ContactUsCard />
      {otherTopicsData && <OtherTopics data={otherTopicsData} />}
    </>
  );
};

export default Page;
