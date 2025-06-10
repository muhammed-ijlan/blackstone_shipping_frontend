import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import JoinUsCard from "src/components/careers/JoinUsCard";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const WhyJoinUs = ({ data }: { data: GetCareersPageData }) => {
  return (
    <Stack
      my={3}
      sx={{
        bgcolor: "rgba(45, 55, 72, 1)",
        color: "white",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack gap={3}>
          <Typography variant="h2">
            {data.page.careersPageWhyJoinUsSection.whyJoinUsTitle}
          </Typography>
          <Typography variant="h4" color="rgba(255, 255, 255, 0.7)">
            {data.page.careersPageWhyJoinUsSection.whyJoinUsContent}
          </Typography>
          <Grid container spacing={4}>
            {data.careerAdvantages.nodes.map((item) => (
              <Grid size={{ xs: 12, md: 4 }}>
                <JoinUsCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default WhyJoinUs;
