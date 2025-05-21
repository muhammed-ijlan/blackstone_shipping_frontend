import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCompanyCertificationsResponse } from "src/types/graphql/types/company.types";

const Certification = ({
  data,
}: {
  data: GetCompanyCertificationsResponse;
}) => {
  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Stack gap={2}>
        <Typography variant="h3">
          {data.page.companyPageCertifications.certificationMainTitle.toUpperCase()}
        </Typography>
        <Typography variant="h4">
          {data.page.companyPageCertifications.certificationSubTitle1.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          color="rgba(45, 55, 72, 0.8)"
          fontWeight={500}
        >
          {data.page.companyPageCertifications.certificationContent1}
        </Typography>
        <Typography variant="h4">
          {data.page.companyPageCertifications.certificationSubTitle2.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          color="rgba(45, 55, 72, 0.8)"
          fontWeight={500}
        >
          {data.page.companyPageCertifications.certificationContent2}
        </Typography>

        <Grid container justifyContent={"space-between"} rowGap={4}>
          {data.certifications.nodes.map((item, index) => (
            <Grid>
              <Stack
                sx={{
                  border: "1px solid rgba(182, 183, 184, 0.3)",
                  width:"300px",
                  height:"156px"
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  component={"img"}
                  alt={item.title}
                  src={item.featuredImage.node.sourceUrl}
                  width={"100px"}
                  sx={{objectFit:"contain"}}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>

       <Typography variant="h4">
          {data.page.companyPageCertifications.certificationSubTitle3.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          color="rgba(45, 55, 72, 0.8)"
          fontWeight={500}
        >
          {data.page.companyPageCertifications.certificationContent3}
        </Typography>

         <Grid container justifyContent={"space-between"} rowGap={4}>
          {data.partners.nodes.map((item, index) => (
            <Grid>
              <Stack
                sx={{
                  border: "1px solid rgba(182, 183, 184, 0.3)",
                  width:"300px",
                  height:"156px"
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  component={"img"}
                  alt={item.title}
                  src={item.featuredImage.node.sourceUrl}
                  width={"100px"}
                  sx={{objectFit:"contain"}}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Certification;
