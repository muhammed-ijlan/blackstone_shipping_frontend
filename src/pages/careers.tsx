import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import JoinOurTeam from "src/components/careers/JoinOurTeam";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_CAREERS_PAGE } from "src/graphql/queries";
import AllJobjsSection from "src/sections/careers/AllJobjsSection";
import OpenPositions from "src/sections/careers/OpenPositions";
import PageSliderSection from "src/sections/careers/PageSliderSection";
import WeAreLookingFor from "src/sections/careers/WeAreLookingFor";
import WhyJoinUs from "src/sections/careers/WhyJoinUs";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const Page = () => {
  const { data, loading, error } =
    useQuery<GetCareersPageData>(GET_CAREERS_PAGE);
  if (loading) return <LoadingFallback />;
  return (
    <>
      {data && (
        <>
          <Banner
            bgUrl={
              data?.page.careersPageBannerSection.bannerImage.node.sourceUrl
            }
            mainTitle={data?.page.careersPageBannerSection.bannerTitle}
          />
          <Container maxWidth="xl">
            <JoinOurTeam data={data} />
            <PageSliderSection data={data} />
            <AllJobjsSection data={data} />
            <OpenPositions data={data} />
          </Container>
          <WhyJoinUs data={data} />
          <Container maxWidth="xl">
            <WeAreLookingFor data={data} />
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
