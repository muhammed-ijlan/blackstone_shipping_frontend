import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCompanyWhoWeAreResponse } from "src/types/graphql/types/company.types";

const WhoWeAre = ({ data }: { data: GetCompanyWhoWeAreResponse }) => {
  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Stack
        sx={{
          background: "rgba(45, 55, 72, 1)",
          padding: "50px",
          borderRadius: "8px",
          alignItems: "center",
          color: "white",
          gap: 3,
        }}
      >
        <Typography variant="h3">
          {data.page.companyPageWhoWeAreSection.whoWeAreTitle}
        </Typography>
        <Typography variant="body1">
          {data.page.companyPageWhoWeAreSection.whoWeAreContent}
        </Typography>
        <Stack direction={"row"} flexWrap={"wrap"} gap={5}>
          <Stack
            flex={1}
            gap={2}
            sx={{
              background:
                "linear-gradient(102.99deg, #343D4D 0%, #232C3F 100%)",
              p: "40px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <img
                src={
                  data.page.companyPageWhoWeAreSection.ourPurposeIcon.node
                    .sourceUrl
                }
                alt=""
                width="40px"
              />
              <Typography variant="h4">
                {data.page.companyPageWhoWeAreSection.ourPurposeTitle.toUpperCase()}
              </Typography>
            </Stack>
            <Typography variant="body1">
              {data.page.companyPageWhoWeAreSection.ourPurposeContent}
            </Typography>
          </Stack>
          <Stack
            flex={1}
            gap={2}
            sx={{
              background:
                "linear-gradient(102.99deg, #343D4D 0%, #232C3F 100%)",
              p: "40px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <img
                src={
                  data.page.companyPageWhoWeAreSection.ourPurposeIcon.node
                    .sourceUrl
                }
                alt=""
                width="40px"
              />
              <Typography variant="h4">
                {data.page.companyPageWhoWeAreSection.ourPurposeTitle.toUpperCase()}
              </Typography>
            </Stack>
            <Typography variant="body1">
              {data.page.companyPageWhoWeAreSection.ourPurposeContent}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default WhoWeAre;
