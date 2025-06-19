import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { CountryPageData } from "src/types/graphql/types/support.types";

const Services = ({ data }: { data: CountryPageData }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      flexWrap={"wrap"}
      gap={2}
      my={7}
      sx={{
        bgColor: "rgba(249, 250, 251, 1)",
        border: "1px solid rgba(182, 183, 184, 1)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Stack flex={1}>
        <Typography
          variant="h2"
          color="rgba(11, 19, 40, 0.6)"
          sx={{
            textTransform: "capitalize !important",
            textAlign: "left !important",
          }}
        >
          Services
        </Typography>
        <Stack style={{ padding: "10px", listStyleType: "unset", margin: 0 }}>
          {data.country?.services?.nodes?.map((service) => (
            <Box
              key={service.id}
              sx={{
                margin: "20px 10px",
                padding: "15px",
                fontSize: "16px",
                lineHeight: "24px",
                boxShadow: "0px 2px 3px 0px rgba(45, 55, 72, 0.08)",
              }}
            >
              <a
                href={service.uri}
                style={{
                  textDecoration: "none",
                  color: "rgba(0, 0, 0, 1)",
                  fontSize: "16px",
                  background: "rgba(255, 255, 255, 1)",
                }}
              >
                <Typography variant="h4" sx={{ textAlign: "left !important" }}>
                  • &nbsp;&nbsp;{service.title}
                </Typography>
              </a>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={{ xs: 1, sm: 2 }}>
        <Stack flex={1}>
          <Box
            component={"img"}
            maxWidth={{ xs: "100%", md: "376px" }}
            height={{ xs: "100%", md: "524px" }}
            src={data.country?.countriesOptions?.countryImage1?.node?.sourceUrl}
            sx={{ borderRadius: "4px", objectFit: "cover" }}
          />
        </Stack>
        <Stack flex={1} gap={{ xs: 1, sm: 3 }}>
          <Box
            component={"img"}
            maxWidth={{ xs: "100%", md: "376px" }}
            height={{ xs: "100%", md: "243px" }}
            src={data.country.countriesOptions?.countryImage2?.node?.sourceUrl}
            sx={{ borderRadius: "4px", objectFit: "cover" }}
          />
          <Box
            component={"img"}
            maxWidth={{ xs: "100%", sm: "376px" }}
            height={{ xs: "100%", sm: "243px" }}
            src={data.country.countriesOptions?.countryImage3.node?.sourceUrl}
            sx={{ borderRadius: "4px", objectFit: "cover" }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Services;
