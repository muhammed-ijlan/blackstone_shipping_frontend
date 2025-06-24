import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Iconify } from "src/components/iconify";
import { ResourcesPageData } from "src/types/graphql/types/resourses.types";

import brochure from "src/assets/icons/brochure.png";
import service from "src/assets/icons/service.png";
import whitepapper from "src/assets/icons/whitepapper.png";

const Downloads = ({ data }: { data: ResourcesPageData }) => {
  const resourseData = data.page.resourcesPageDownloadsSection;

  return (
    <Container maxWidth="xl" sx={{ my: 6 }}>
      <Stack gap={3}>
        <Typography variant="h2">
          {resourseData.downloadsSectionTitle}
        </Typography>
        <Box
          component={"div"}
          sx={{
            "& p": {
              margin: "0",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: resourseData.downloadSectionContent,
          }}
        />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                borderRadius: "8px",
                background: "rgba(45, 55, 72, 1)",
                color: "white",
                padding: 3,
              }}
              justifyContent={"space-between"}
              gap={2}
            >
              <Stack gap={3}>
                <Stack gap={2} direction={"row"}>
                  <Box
                    src={brochure}
                    component={"img"}
                    alt="img"
                    width={"32px"}
                  />
                  <Typography sx={{ fontSize: "32px !important" }}>
                    {resourseData.brochureTitle}
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  {resourseData.brochureContent}
                </Typography>
              </Stack>

              <ButtonGroup
                sx={{
                  width: "100%",
                  height: "60px",
                  backgroundColor: "rgba(26, 86, 219, 1) !important",
                  color: "white",
                }}
                fullWidth
                aria-label="Button group with a nested menu"
              >
                <Button
                  target="_blank"
                  href={resourseData.brochureFile?.node?.sourceUrl}
                  sx={{ color: "white" }}
                >
                  Download
                </Button>
                <Button
                  sx={{ width: "60px", color: "white" }}
                  size="small"
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  target="_blank"
                  href={resourseData.brochureFile?.node?.sourceUrl}
                >
                  <Iconify icon={"charm:download"} />
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                borderRadius: "8px",
                background: "rgba(45, 55, 72, 1)",
                color: "white",
                padding: 3,
              }}
              justifyContent={"space-between"}
              gap={2}
            >
              <Stack gap={3}>
                <Stack gap={2} direction={"row"}>
                  <Box
                    src={service}
                    component={"img"}
                    alt="img"
                    height="32px"
                  />
                  <Typography sx={{ fontSize: "32px !important" }}>
                    {resourseData.serviceGuidesTitle}
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  {resourseData.serviceGuidesContent}
                </Typography>
              </Stack>

              <ButtonGroup
                sx={{
                  width: "100%",
                  height: "60px",
                  backgroundColor: "rgba(26, 86, 219, 1) !important",
                  color: "white",
                }}
                fullWidth
                aria-label="Button group with a nested menu"
              >
                <Button
                  target="_blank"
                  href={resourseData.serviceGuidesFile?.node?.sourceUrl}
                  sx={{ color: "white" }}
                >
                  Download
                </Button>
                <Button
                  sx={{ width: "60px", color: "white" }}
                  size="small"
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  target="_blank"
                  href={resourseData.serviceGuidesFile?.node?.sourceUrl}
                >
                  <Iconify icon={"charm:download"} />
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                borderRadius: "8px",
                background: "rgba(45, 55, 72, 1)",
                color: "white",
                padding: 3,
              }}
              justifyContent={"space-between"}
              gap={2}
            >
              <Stack gap={3}>
                <Stack gap={2} direction={"row"}>
                  <Box
                    src={whitepapper}
                    component={"img"}
                    alt="img"
                    width={"32px"}
                    height="32px"
                  />
                  <Typography sx={{ fontSize: "32px !important" }}>
                    {resourseData.whitePapersTitle}
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  {resourseData.whitePapersContent}
                </Typography>
              </Stack>

              <ButtonGroup
                sx={{
                  width: "100%",
                  height: "60px",
                  backgroundColor: "rgba(26, 86, 219, 1) !important",
                  color: "white",
                }}
                fullWidth
                aria-label="Button group with a nested menu"
              >
                <Button
                  sx={{ color: "white" }}
                  target="_blank"
                  href={resourseData.whitePapersFile?.node?.sourceUrl}
                >
                  Download
                </Button>
                <Button
                  sx={{ width: "60px", color: "white" }}
                  size="small"
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  target="_blank"
                  href={resourseData.whitePapersFile?.node?.sourceUrl}
                >
                  <Iconify icon={"charm:download"} />
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Downloads;
