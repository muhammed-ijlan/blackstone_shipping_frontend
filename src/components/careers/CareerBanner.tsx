import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import {
  GetJobPostDetailsResponse,
  JobOpeningDetails,
} from "src/types/graphql/types/careers.types";

import location from "src/assets/icons/location-white.png"

const CareerBanner = ({ data }: { data: GetJobPostDetailsResponse }) => {
  return (
    <Stack gap={3}  >
      <Stack direction={"row"}>
        <Typography sx={{ color: "rgba(109, 110, 113, 1)" }}>
          Careers /&nbsp;
        </Typography>
        <Typography> Submit Application</Typography>
      </Stack>

      <Stack borderRadius={"8px"} color={"white"}
        sx={{
          backgroundImage: `url(${data.jobOpening.jobOpeningsOptions.bannerImage?.node.sourceUrl})`,
          height: 600,
          width: "100%",
          borderRadius:"8px !important",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            borderRadius:"8px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: { xs: "center", md: "flex-end" },
              px: { xs: "20px", md: "80px" },
              py: { xs: "20px", md: "80px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                maxWidth: "800px",
                fontWeight: "700",
                color: "white !important",
                top: "380px",
                textWrap: "wrap",
              }}
            >
              {data.jobOpening.title}
            </Typography>

            <Stack direction={"row"} alignItems={"center"} mt={1} gap={1}>
              <Box
                component={"img"}
                src={location}
                alt={"location"}
                width="24px"
                alignItems={"center"}
              />
              <Typography variant="h5">
                {data.jobOpening.jobOpeningsOptions.jobLocation.nodes[0].name}
              </Typography>
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CareerBanner;
