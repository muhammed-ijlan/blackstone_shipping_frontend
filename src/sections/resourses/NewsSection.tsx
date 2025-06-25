import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { ResourcesPageData } from "src/types/graphql/types/resourses.types";
import RecentNews from "./RecentNews";
import AllNews from "./AllNews";

const NewsSection = ({
  data,
}: {
  data: { newsSectionTitle: string; newsSectionContent: string };
}) => {
  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Stack gap={{ xs: 2, md: 5 }}>
        <Stack gap={{ xs: 1, md: 3 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "35px", lg: "60px!important" } }}
            color="rgba(45, 55, 72, 1)"
          >
            {data.newsSectionTitle}
          </Typography>
          <Typography
            variant="h4"
            color="rgba(45, 55, 72, 1)"
            sx={{ lineHeight: { xs: "auto", lg: "10px !important" } }}
            dangerouslySetInnerHTML={{ __html: data.newsSectionContent }}
          />
        </Stack>
        <RecentNews />
        <AllNews />
      </Stack>
    </Container>
  );
};

export default NewsSection;
