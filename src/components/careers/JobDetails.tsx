import { Box, Grid, Stack, Typography } from "@mui/material";
import { GetJobPostDetailsResponse } from "src/types/graphql/types/careers.types";

const JobDetails = ({ data }: { data: GetJobPostDetailsResponse }) => {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, }}>
        <Stack
          flex={1}
          sx={{
            border: "1px solid rgba(206, 208, 212, 1)",
            borderRadius: "8px",
            padding: 3,
            height: "100%",
            width: "100%",
          }}
          gap={2}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", textDecoration: "underline" }}
          >
            Summary:
          </Typography>
          <Box
            component="div"
            sx={{
              "& ol": {
                paddingLeft: "1.5rem",
                fontWeight: "700",
                margin: 0,
              },
              "& ul": {
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                margin: 0,
              },
              "& li": {
                marginBottom: "1em",
              },
              fontWeight: 500,
              textAlign: "left !important",
              color: "rgba(109, 110, 113, 1)",
            }}
            dangerouslySetInnerHTML={{
              __html:
                data.jobOpening.jobOpeningsOptions.summary ?? "",
            }}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, }}>
        <Stack
          flex={1}
          sx={{
            border: "1px solid rgba(206, 208, 212, 1)",
            borderRadius: "8px",
            padding: 3,
            height: "100%",
          }}
          gap={2}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", textDecoration: "underline" }}
          >
            Key Responsibilities:
          </Typography>
          <Box
            component="div"
            sx={{
              "& ol": {
                paddingLeft: "1.5rem",
                fontWeight: "700",
                margin: 0,
              },
              "& ul": {
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                margin: 0,
              },
              "& li": {
                marginBottom: "1em",
              },
              fontWeight: 500,
              textAlign: "left !important",
              color: "rgba(109, 110, 113, 1)",
            }}
            dangerouslySetInnerHTML={{
              __html:
                data.jobOpening.jobOpeningsOptions.keyResponsibilities ?? "",
            }}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, }}>
        <Stack
          flex={1}
          sx={{
            border: "1px solid rgba(206, 208, 212, 1)",
            borderRadius: "8px",
            padding: 3,
            height: "100%",
          }}
          gap={2}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", textDecoration: "underline" }}
          >
            Requirements:
          </Typography>
          <Box
            component="div"
            sx={{
              "& ol": {
                paddingLeft: "1.5rem",
                fontWeight: "700",
                margin: 0,
              },
              "& ul": {
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                margin: 0,
              },
              "& li": {
                marginBottom: "1em",
              },
              fontWeight: 500,
              textAlign: "left !important",
              color: "rgba(109, 110, 113, 1)",
            }}
            dangerouslySetInnerHTML={{
              __html: data.jobOpening.jobOpeningsOptions.requirements ?? "",
            }}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, }}>
        <Stack
          flex={1}
          sx={{
            border: "1px solid rgba(206, 208, 212, 1)",
            borderRadius: "8px",
            padding: 3,
            height: "100%",
          }}
          gap={2}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", textDecoration: "underline" }}
          >
            What we offer:
          </Typography>
          <Box
            component="div"
            sx={{
              "& ol": {
                paddingLeft: "1.5rem",
                fontWeight: "700",
                margin: 0,
              },
              "& ul": {
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                margin: 0,
              },
              "& li": {
                marginBottom: "1em",
              },
              fontWeight: 500,
              textAlign: "left !important",
              color: "rgba(109, 110, 113, 1)",
            }}
            dangerouslySetInnerHTML={{
              __html: data.jobOpening.jobOpeningsOptions.whatWeOffer ?? "",
            }}
          />
        </Stack>
      </Grid>

    </Grid>
  );
};

export default JobDetails;
