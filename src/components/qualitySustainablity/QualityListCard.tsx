import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { QualityNode } from "src/types/graphql/types/quality.types";

const QualityListCard = ({ quality }: { quality: QualityNode }) => {
  return (
    <Stack
      sx={{
        bgcolor: "rgba(45, 55, 72, 1)",
        width: "100%",
        borderRadius: "8px",
        padding: 2,
        height: "100%",
      }}
      gap={2}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Stack
          sx={{
            bgcolor: "rgba(11, 19, 40, 1)",
            width: "36px",
            height: "36px",
            borderRadius: "4px",
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            component={"img"}
            sx={{
              width: "22px",
              borderRadius: "8px",
            }}
            src={quality.featuredImage?.node.sourceUrl}
          />
        </Stack>

        <Typography
          variant="h5"
          color="white"
          sx={{ textTransform: "uppercase !important" }}
        >
          {quality.title}
        </Typography>
      </Stack>
      <Divider />

      <Box
        component={"div"}
        dangerouslySetInnerHTML={{ __html: quality.content }}
        sx={{
          color: "white",
          "& p": {
            margin: 0,
          },
        }}
      />
    </Stack>
  );
};

export default QualityListCard;
