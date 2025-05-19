import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import VisionCard from "src/components/company/VisionCard";
import { GetCompanyVisionResponse } from "src/types/graphql/types/company.types";

const Vision = ({ data }: { data: GetCompanyVisionResponse }) => {
  return (
    <Stack sx={{ backgroundColor: "rgba(45, 55, 72, 1)" }}>
      <Container maxWidth="xl">
        <Stack my={10} color="white">
          <Typography variant="h3">
            {data.page.companyPageVisionSection.visionTitle.toUpperCase()}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{
              __html: data.page.companyPageVisionSection.visionContent,
            }}
            sx={{
              fontWeight: 500,
              fontSize: "17px !important",
              lineHeight: "32px",
              letterSpacing: "3%",
            }}
          />

          <Grid container spacing={5} mt={5} justifyContent="space-between">
            {data.visions.nodes.map((vision, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <VisionCard vision={vision} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Vision;
