import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import {  GetCompanyPageResponse } from "src/types/graphql/types/company.types";


const Banner = ({ data }: { data: GetCompanyPageResponse }) => {
  return (
    <Stack
      sx={{
        backgroundImage: `url(${data.page.companyPageBannerSection.bannerImage.node.sourceUrl})`,
        height: 600,
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}>
          <Container maxWidth="xl">


      <Typography
        sx={{
          fontSize: "100px !important",
          fontWeight: "700",
          color: "white !important",
          position: "absolute",
          bottom: "50px",
        }}
        >
        {data.page.companyPageBannerSection.bannerTitle}
      </Typography>
          </Container>
        </Stack>
    </Stack>
  );
};

export default Banner;
