import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { SustainabilityNode } from "src/types/graphql/types/quality.types";

const SustainablityList = ({ data }: { data: SustainabilityNode[] }) => {
  return (
    <Stack my={5} gap={3}>
      <Typography variant="h2">
        SDGs INLINE WITH OUR RESPONSIBLE PRACTICES & OUR COMMITMENT TO MEET THEM{" "}
      </Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }} key={index}>
            <Stack
              sx={{
                background: "linear-gradient(180deg, #2D3748 0%, #0B1328 100%)",
                borderRadius: "8px",
                width: "100%",
                height: "100%",
                padding: "20px",
              }}
              gap={3}
            >
              <Box
                component={"img"}
                src={item.featuredImage?.node.sourceUrl}
                alt={item.title}
                style={{ width: "60px", height: "auto", borderRadius: "8px" }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {item.title}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default SustainablityList;
