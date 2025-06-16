import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import Banner from "src/components/banner/Banner";
import { GET_TECHNOLOGY_DETAILS_BY_ID } from "src/graphql/queries";
import Parasgraphs from "src/sections/technology/Parasgraphs";
import TechnologyCards from "src/sections/technology/TechnologyCards";
import {
  TechnologyData,
  TechnologyVars,
} from "src/types/graphql/types/technology.types";

const Page = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<TechnologyData, TechnologyVars>(
    GET_TECHNOLOGY_DETAILS_BY_ID,
    {
      variables: {
        id: id || "",
      },
      skip: !id,
    }
  );
  return (
    <>
      {data && (
        <>
          <Banner
            mainTitle={
              data?.technology?.technologySinglePageBannerSection
                ?.bannerTitle ?? ""
            }
            subTitle={"Technology"}
            bgUrl={
              data?.technology?.technologySinglePageBannerSection?.bannerImage
                ?.node.sourceUrl ?? ""
            }
          />
          <Container maxWidth="xl">
            <Parasgraphs data={data}/>
            <TechnologyCards data={data}/>
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
