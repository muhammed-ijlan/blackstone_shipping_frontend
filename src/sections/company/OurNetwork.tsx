import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Location from "src/components/company/Location";
import OurNetworkCards from "src/components/company/OurNetworkCards";
import { GetCompanyGlobalNetworkResponse } from "src/types/graphql/types/company.types";

const OurNetwork = ({ data }: { data: GetCompanyGlobalNetworkResponse }) => {
  return (
    <Stack sx={{ background: "rgba(245, 247, 251, 1)", py: 10 }}>
      <Container maxWidth="xl">
        <Stack gap={3}>
          <Typography variant="h2" sx={{fontWeight:"700 !important"}}>
            {data?.page?.companyPageOurGlobalNetworkSection?.ourGlobalNetworkTitle.toUpperCase()}
          </Typography>
          <Typography variant="h6" sx={{fontWeight:"500 !important"}} color={"rgba(45, 55, 72, 0.8)"}>
            {
              data?.page?.companyPageOurGlobalNetworkSection
                ?.ourGlobalNetworkContent
            }
          </Typography>

          <OurNetworkCards data={data} />
          <Location header={true} />
        </Stack>
      </Container>
    </Stack>
  );
};

export default OurNetwork;
