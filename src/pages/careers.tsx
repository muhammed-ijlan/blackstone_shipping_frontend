import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import JoinOurTeam from "src/components/careers/JoinOurTeam";
import { GET_CAREERS_PAGE } from "src/graphql/queries";
import PageSliderSection from "src/sections/careers/PageSliderSection";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const Page = () => {
  const { data, loading, error } =
    useQuery<GetCareersPageData>(GET_CAREERS_PAGE);
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
            <JoinOurTeam data={data}/>
            <PageSliderSection data={data}/>
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
