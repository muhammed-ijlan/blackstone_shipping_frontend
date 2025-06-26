import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCompanyHistoryResponse } from "src/types/graphql/types/company.types";

const History = ({ data }: { data: GetCompanyHistoryResponse }) => {
  return (
    <Container maxWidth={"xl"} sx={{ pb: 5 }}>
      <Stack gap={5}>
        <Typography variant="h2" sx={{fontWeight:"700 !important"}}>
          {data.page.companyPageHistorySection.historySectionMainTitle?.toUpperCase()}
        </Typography>
        <Divider />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 4, lg: 10 }}
          justifyContent={"space-between"}
          alignItems={{ xs: "center", lg: "flex-start" }}
         
        >
          <Typography
            flex={0.4}
            sx={{
              textAlign: { xs: "left", lg: "left" },
              textTransform: "uppercase !important",
            }}
            fontWeight={600}
            variant="h6"
            color="rgba(45, 55, 72, 1)"
            pt={2}
          >
            {data.page.companyPageHistorySection.historySectionSubTitle}
          </Typography>

          <Box
            component="p"
            sx={{
              flex: 1,
              textAlign: {
                xs: "left",
                lg: "left",
                color: "rgba(45, 55, 72, 1)",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: data.page.companyPageHistorySection.historySectionContent,
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default History;
