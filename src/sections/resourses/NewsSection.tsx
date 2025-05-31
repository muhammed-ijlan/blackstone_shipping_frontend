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
      <Stack gap={5}>
        <Stack gap={3}>
          <Typography variant="h2" sx={{ fontSize: "50px!important" }}>
            {data.newsSectionTitle}
          </Typography>
          <Typography
            variant="h4"
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
