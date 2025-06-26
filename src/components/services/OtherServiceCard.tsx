import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ServiceChild } from "src/types/graphql/types/services.types";

const OtherServiceCard = ({ data }: { data: ServiceChild }) => {
  return (
    <Stack gap={2}>
      <Box
        component={"img"}
        src={data?.featuredImage?.node?.sourceUrl}
        alt={data.title}
        sx={{
          width: "100%",
          height: "262px !important",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Typography variant="h4">{data.title.toUpperCase()}</Typography>
      <Box
        sx={{
          "& ul": {
            paddingLeft: "1.5rem",
            marginTop: "0.5rem",
            marginBottom: "1rem",
          },
          "& li": {
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            lineHeight: 1.6,
          },
          "& p": {
            marginBottom: "1rem",
            fontSize: "0.95rem",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            "& p": {
              margin: "0",
              typography: "body1",
              fontWeight:"500",
            },
            "& ul": {
              typography: "body1",
              margin: 0,
              padding: 0,
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </Box>
    </Stack>
  );
};

export default OtherServiceCard;
