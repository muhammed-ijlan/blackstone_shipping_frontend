import React from "react";
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";

import {
  OurValueItem,
  OurValuesSectionData,
} from "src/types/graphql/types/company.types";

const OurValues = ({ data }: { data: OurValuesSectionData }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const values = data?.values.nodes || [];
  const image1 = data?.page?.companyPageOurValuesSection.ourValuesImage1?.node?.sourceUrl;
  const image2 = data?.page?.companyPageOurValuesSection.ourValuesImage2?.node?.sourceUrl;

  // Common styles for text boxes
  const textBoxStyles = {
    border: "1px solid rgba(109, 110, 113, 1)",
    borderRadius: "8px",
    p: 4,
    backgroundColor: "#fff",
  };

  // Common styles for the icon container
  const iconContainerStyles = {
    background: "rgba(45, 55, 72, 1)",
    borderRadius: "50%",
    width: "49px",
    height: "49px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Stack sx={{ background: "rgba(245, 247, 251, 1)" }}>
      <Container maxWidth="xl">
        <Box sx={{ p: 4, position: "relative", minHeight: "600px" }}>
          <Typography variant="h3" fontWeight="bold" mb={5}>
            {data?.page?.companyPageOurValuesSection.ourValuesTitle.toUpperCase()}
          </Typography>

          {/* First Row - Trust & Respect (larger) and Honouring Commitment */}
          <ImageList
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              mb: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
            cols={isSmall ? 1 : 2}
            gap={40}
          >
            {/* Trust & Respect - Larger */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "65%",
                height: "auto",
              }}
            >
              <Box sx={textBoxStyles}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={iconContainerStyles}>
                 <Box component="img"
                      src={values[0]?.featuredImage.node.sourceUrl}
                      alt={values[0]?.title}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {values[0]?.title.toUpperCase()}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="rgba(109, 110, 113, 1)"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: values[0]?.content }}
                />
              </Box>
            </ImageListItem>

            {/* Honouring Commitment */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                height: "auto",
              }}
            >
              <Box sx={{ ...textBoxStyles, height: "100%" }}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={iconContainerStyles}>
                 <Box component="img"
                      src={values[1]?.featuredImage.node.sourceUrl}
                      alt={values[1]?.title}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {values[1]?.title.toUpperCase()}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="rgba(109, 110, 113, 1)"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: values[1]?.content }}
                />
              </Box>
            </ImageListItem>
          </ImageList>

          {/* Second Row - Customer Success, Achieving Together, Renew Revive & Re-Grow */}
          <ImageList
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              alignItems: "center",
              justifyContent: "space-between",
              mt: isSmall ? 0 : "0",
            }}
            cols={isSmall ? 1 : 3}
            gap={40}
          >
            {/* Customer Success */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                height: "auto",
              }}
            >
              <Box sx={textBoxStyles}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={iconContainerStyles}>
                 <Box component="img"
                      src={values[2]?.featuredImage.node.sourceUrl}
                      alt={values[2]?.title}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {values[2]?.title.toUpperCase()}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="rgba(109, 110, 113, 1)"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: values[2]?.content }}
                />
              </Box>
            </ImageListItem>

            {/* Achieving Together */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                height: "auto",
              }}
            >
              <Box sx={textBoxStyles}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={iconContainerStyles}>
                 <Box component="img"
                      src={values[3]?.featuredImage.node.sourceUrl}
                      alt={values[3]?.title}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {values[3]?.title.toUpperCase()}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="rgba(109, 110, 113, 1)"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: values[3]?.content }}
                />
              </Box>
            </ImageListItem>

            {/* Renew, Revive & Re-Grow */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                height: "auto",
                marginBottom: "30px",
              }}
            >
              <Box sx={textBoxStyles}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={iconContainerStyles}>
                 <Box component="img"
                      src={values[4]?.featuredImage.node.sourceUrl}
                      alt={values[4]?.title}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {values[4]?.title.toUpperCase()}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="rgba(109, 110, 113, 1)"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: values[4]?.content }}
                />
              </Box>
            </ImageListItem>
          </ImageList>

          {/* Third Row - Image 1, Overall Satisfaction, Image 2 */}
          <ImageList
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              alignItems: "center",
              justifyContent: "space-between",
              mt: isSmall ? 0 : 5,
            }}
            cols={isSmall ? 1 : 3}
            gap={40}
          >
            {/* First Image */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
           <Box component="img"
                src={image1}
                alt="Our Values Image 1"
                
                loading="lazy"
                style={{ width: "100%", height: "auto" ,objectFit:"cover"}}
              />
            </ImageListItem>

            {/* Overall Satisfaction */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                height: "auto",
              }}
            >
              <Box sx={textBoxStyles}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box sx={iconContainerStyles}>
                 <Box component="img"
                      src={values[5]?.featuredImage.node.sourceUrl}
                      alt={values[5]?.title}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {values[5]?.title.toUpperCase()}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  color="rgba(109, 110, 113, 1)"
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{ __html: values[5]?.content }}
                />
              </Box>
            </ImageListItem>

            {/* Second Image */}
            <ImageListItem
              sx={{
                width: isSmall ? "100%" : "30%",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
           <Box component="img"
                src={image2}
                alt="Our Values Image 2"
                loading="lazy"
                style={{ width: "100%", height: "auto" ,objectFit:"cover"}}
              />
            </ImageListItem>
          </ImageList>
        </Box>
      </Container>
    </Stack>
  );
};

export default OurValues;