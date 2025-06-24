import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCompanyAboutResponse } from "src/types/graphql/types/company.types";

const ConnectingWorld = ({ data }: { data: GetCompanyAboutResponse }) => {
  console.log(data);
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={1}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        component={"img"}
        alt="about"
        width={{ xs: "100%", lg: "422px" }}
        borderRadius={"8px"}
        height={"421px"}
        src={data.page.companyPageAboutSection.aboutUsImage.node.sourceUrl}
      />
      <Stack spacing={2} sx={{ maxWidth: { xs: "100%", lg: "62%" } }}>
        <Typography variant="h2">
          {data.page.companyPageAboutSection.aboutUsTitle}
        </Typography>
        <Typography variant="body1" color="rgba(109, 110, 113, 1)">
          {data.page.companyPageAboutSection.aboutUsContent}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ConnectingWorld;
