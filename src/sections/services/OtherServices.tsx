import { Container, Grid } from "@mui/material";
import React from "react";
import OtherServiceCard from "src/components/services/OtherServiceCard";
import { ServiceChild } from "src/types/graphql/types/services.types";

const OtherServices = ({ data }: { data: ServiceChild[] }) => {
  return (
    <Container maxWidth={"xl"} sx={{ my: { xs: 4, lg: 10 } }}>
      <Grid container rowGap={6} spacing={4}>
        {data.map((service, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }} key={index}>
            <OtherServiceCard data={service} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OtherServices;
