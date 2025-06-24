import { useQuery } from "@apollo/client";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import Banner from "src/components/banner/Banner";
import { GET_GENERAL_PAGES } from "src/graphql/queries";
import {
  GetGeneralPagesData,
  GetGeneralPagesVars,
} from "src/types/graphql/types/common.types";

const Page = () => {
  const { uri } = useParams();

  const { data } = useQuery<GetGeneralPagesData, GetGeneralPagesVars>(
    GET_GENERAL_PAGES,
    {
      variables: { uri: uri ?? "" },
      skip: !uri,
    }
  );

  return (
    <Stack>
      {data && (
        <>
          <Banner
            mainTitle={
              data?.pageBy.blackboxFreightPageBannerSection.bannerTitle
            }
            bgUrl={
              data?.pageBy.blackboxFreightPageBannerSection.bannerImage.node
                .sourceUrl
            }
          />
          <Container maxWidth="xl">
            <Box
              my={7}
              component={"div"}
              dangerouslySetInnerHTML={{ __html: data?.pageBy.content }}
            />
          </Container>
        </>
      )}
    </Stack>
  );
};

export default Page;
