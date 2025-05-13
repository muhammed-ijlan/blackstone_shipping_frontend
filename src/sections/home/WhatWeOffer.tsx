import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import CustomSlider from "src/components/customSlider/CustomSlider";
import SectionHead from "src/components/sectionHead/SectionHead";
import { useQuery } from "@apollo/client";
import { GET_WHAT_WE_OFFER } from "src/graphql/queries";

export interface GetWhatWeOfferData {
  page: {
    homePageFieldsWhatWeOffer: {
      whatWeOffersubHeading: string;
      whatWeOfferMainHeading: string;
    };
  };
  whatWeOffers: {
    nodes: {
      title: string;
      uri: string;
      content: string | null;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
}

const WhatWeOffer = () => {
  const { data, loading, error } =
    useQuery<GetWhatWeOfferData>(GET_WHAT_WE_OFFER);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  const headingData = data?.page?.homePageFieldsWhatWeOffer;
  const offers = data?.whatWeOffers?.nodes || [];

  return (
    <Container maxWidth="lg">
      <SectionHead
        title={headingData?.whatWeOffersubHeading || ""}
        subTitle={
          headingData?.whatWeOfferMainHeading?.replace(/\r\n/g, " ") || ""
        }
      />

      <CustomSlider>
        {offers.map((card, index) => (
          <Stack
            key={index}
            width={"500px"}
            position={"relative"}
            sx={{
              minWidth: "400px",
              maxWidth: "400px",
              borderRadius: "5px",
              mb: 3,
              height:"auto"
            }}
          >
            <Typography
              bottom={40}
              left={40}
              color="white"
              variant="h4"
              fontWeight={600}
              position="absolute"
            >
              {card.title}
            </Typography>
            <Box
              component="img"
              src={card.featuredImage?.node?.sourceUrl}
              width="100%"
              height={"270px"}
              borderRadius="7px"
              alt={card.title}
            />
          </Stack>
        ))}
      </CustomSlider>
    </Container>
  );
};

export default WhatWeOffer;
