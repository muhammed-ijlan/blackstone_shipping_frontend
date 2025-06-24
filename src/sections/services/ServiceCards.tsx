import { Container, Divider, Grid } from "@mui/material";
import React from "react";
import ServiceCard from "src/components/services/ServiceCard";
import { ServiceNode } from "src/types/graphql/types/services.types";

const ServiceCards = ({ data }: { data: ServiceNode[] }) => {
  return (
    <Container maxWidth="xl">
      <Divider />
      <Grid container my={5} spacing={4}>
        {data.map((item, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
            key={item.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ServiceCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServiceCards;
