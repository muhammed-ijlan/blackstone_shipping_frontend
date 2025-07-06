import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import ScrollPane from "src/layouts/components/ScrollPane";
import { ServiceChild } from "src/types/graphql/types/services.types";

const OtherServiceCard = ({ data }: { data: ServiceChild }) => {
  const theme = useTheme();
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

      <ScrollPane maxHeight={220}>
        <Typography variant="h4" sx={{
        }}>{data.title.toUpperCase()}
        </Typography>

        <Box
          component="div"
          sx={{
            "& p": {
              margin: "0",
              typography: "body1",
              textTransform: "none",
              fontWeight: "500",
            },
            "& ul": {
              marginTop: "0.5rem",
              marginBottom: "1rem",
            },
            "& li": {
              marginBottom: "0.5rem",
              lineHeight: 1.6,
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </ScrollPane>
    </Stack>
  );
};

export default OtherServiceCard;
