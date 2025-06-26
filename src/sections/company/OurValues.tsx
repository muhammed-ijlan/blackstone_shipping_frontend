import React from "react";
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
  Grid,
} from "@mui/material";

import {
  OurValueItem,
  OurValuesSectionData,
} from "src/types/graphql/types/company.types";

const OurValues = ({ data }: { data: OurValuesSectionData }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const values = data?.values.nodes || [];
  const image1 =
    data?.page?.companyPageOurValuesSection.ourValuesImage1?.node?.sourceUrl;
  const image2 =
    data?.page?.companyPageOurValuesSection.ourValuesImage2?.node?.sourceUrl;

  // Common styles for text boxes
  const textBoxStyles = {
    border: "1px solid rgba(109, 110, 113, 1)",
    borderRadius: "8px",
    p: { xs: 2, lg: 4 },
    backgroundColor: "#fff",
    height: "100%",
  };

  // Common styles for the icon container
  const iconContainerStyles = {
    background: "rgba(45, 55, 72, 1)",
    borderRadius: "100%",
    width: "49px",
    height: "49px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const items = [
    { type: "value", value: values[0], xs: 12, md: 8 },
    { type: "value", value: values[1], xs: 12, md: 4 },
    { type: "value", value: values[2], xs: 12, md: 4 },
    { type: "value", value: values[3], xs: 12, md: 4 },
    { type: "value", value: values[4], xs: 12, md: 4 },
    { type: "image", src: image1, alt: "Our Values Image 1", xs: 12, md: 4 },
    { type: "value", value: values[5], xs: 12, md: 4 },
    { type: "image", src: image2, alt: "Our Values Image 2", xs: 12, md: 4 },
  ];

  return (
    <Stack sx={{ background: "rgba(245, 247, 251, 1)" }}>
      <Container maxWidth="xl">
        <Box sx={{ my: 6, position: "relative", minHeight: "600px" }}>
          <Typography variant="h2" sx={{fontWeight:"700 !important"}} mb={5}>
            {data?.page?.companyPageOurValuesSection.ourValuesTitle.toUpperCase()}
          </Typography>

          <Grid container spacing={5}>
            {items.map((item, index) => (
              <Grid
                size={{ xs: item.xs, md: item.md }}
                key={index}
                sx={{
                  display: "flex",
                  ...(item.type === "image" && {
                    borderRadius: "8px",
                    overflow: "hidden",
                  }),
                }}
              >
                {item.type === "value" && item.value ? (
                  <Box sx={textBoxStyles}>
                    <Stack direction="row" alignItems="center" gap={2}>
                      <Box sx={iconContainerStyles}>
                        <Box
                          component="img"
                          src={item.value?.featuredImage.node.sourceUrl}
                          alt={item.value?.title}
                          width={24}
                          height={24}
                          style={{ objectFit: "contain" }}
                          loading="lazy"
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ textAlign: "left !important" }}
                      >
                        {item.value?.title.toUpperCase()}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body1"
                      color="rgba(109, 110, 113, 1)"
                      sx={{ mt: 2, textAlign: "left !important" }}
                      dangerouslySetInnerHTML={{ __html: item.value?.content }}
                    />
                  </Box>
                ) : (
                  item.type === "image" && (
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  )
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Stack>
  );
};

export default OurValues;
