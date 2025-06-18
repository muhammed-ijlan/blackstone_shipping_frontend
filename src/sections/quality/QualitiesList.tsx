import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import QualityListCard from "src/components/qualitySustainablity/QualityListCard";
import { QualityNode } from "src/types/graphql/types/quality.types";

interface QualitiesListProps {
  title1: string;
  title2: string;
  qualities: QualityNode[];
  listPoints: string;
}

const QualitiesList = ({
  title1,
  title2,
  qualities,
  listPoints,
}: QualitiesListProps) => {
  return (
    <Stack my={5} gap={3}>
      <Typography variant="h4" align="center" gutterBottom>
        {title1}
      </Typography>
      <Grid container spacing={3}>
        {qualities.map((quality, index) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <QualityListCard key={index} quality={quality} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" align="center" gutterBottom>
        {title2}
      </Typography>

      <Box
        component={"div"}
        dangerouslySetInnerHTML={{
          __html: listPoints,
        }}
        sx={{
          "& ul": {
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
            margin: 0,
          },
          "& li": {
            typography: "body1",
            flex: "1 1 48%",
            fontSize: "1rem",
            border: "1px solid rgba(109, 110, 113, 0.1)",
            padding: "15px 15px",
            borderRadius: "4px",
            backgroundColor: "rgba(249, 250, 251, 1)",
            position: "relative",
            paddingLeft: "30px",
          },
          "& li::before": {
            content: '"•"',
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.2rem",
          },
        }}
      />
    </Stack>
  );
};

export default QualitiesList;
