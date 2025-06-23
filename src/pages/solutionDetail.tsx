import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import Banner from "src/components/banner/Banner";
import ContactUsCard from "src/components/ContactUsCard";
import {
  GET_SERVICE_WITH_SUBSERVICES,
  GET_SOLUTIONS_WITH_SUBSOLUTIONS,
} from "src/graphql/queries";
import OtherServices from "src/sections/services/OtherServices";
import OtherTopics from "src/sections/services/OtherTopics";
import { GetSolutionsWithSubSolutionsData } from "src/types/graphql/types/solutions.types";

const Page = () => {
  const { solutionId } = useParams();
  const { data, loading, error } = useQuery<GetSolutionsWithSubSolutionsData>(
    GET_SOLUTIONS_WITH_SUBSOLUTIONS,
    {
      variables: {
        uri: `solution/${solutionId}`,
      },
    }
  );

  return (
    <>
      {data && (
        <>
          <Banner
            bgUrl={
              data?.solution.solutionsSinglePageBannerSection.bannerImage.node
                .sourceUrl
            }
            mainTitle={
              data?.solution.solutionsSinglePageBannerSection.bannerTitle
            }
            subTitle={"Solutions"}
          />
          <OtherServices data={data.solution.children.nodes} />
          <ContactUsCard />
          <OtherTopics data={data?.solution.solutionsPageOtherTopicsSection} />
        </>
      )}
    </>
  );
};

export default Page;
