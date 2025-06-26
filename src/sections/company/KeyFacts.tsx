import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCompanyKeyFactsResponse } from "src/types/graphql/types/company.types";

const KeyFacts = ({ data }: { data: GetCompanyKeyFactsResponse }) => {
  return (
    <Stack
      sx={{
        position: "relative",
        backgroundImage: `url(${data.page.companyPageKeyFactsSection.keyFactsBackgroundImage.node.sourceUrl})`,
        backgroundSize: "cover",
        color: "white",
      }}
      py={8}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Typography variant="h2" sx={{ textAlign: "center !important" }} mb={5}>
          {data.page.companyPageKeyFactsSection.keyFactsTitle.toUpperCase()}
        </Typography>

        <Grid container spacing={4} justifyContent={"center"}>
          {data.keyFacts.nodes.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, lg: 4 }}
              key={index}
              sx={{ width: "295px !important  ", height: "184px" }}
            >
              <Stack
                sx={{
                  width: "295px",
                  height: "184px",
                  color: "rgba(33, 52, 72, 1)",
                  background: "rgba(245, 247, 251, 1)",
                  borderRadius: "8px",
                  p: 3,
                }}
              >
                <Typography variant="h6">{item.title.toUpperCase()}</Typography>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  color="rgba(109, 110, 113, 1)"
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default KeyFacts;
