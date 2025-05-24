import { Stack, Typography } from "@mui/material";
import React from "react";
import { VisionNode } from "src/types/graphql/types/company.types";

const VisionCard = ({ vision }: { vision: VisionNode }) => {
  return (
    <Stack
      sx={{
        background: "linear-gradient(114.5deg, #343D4D 0%, #232C3F 100%)",
        padding: "30px",
        borderRadius: "8px",
        height: "250px",
        borderBottom: "1px solid rgba(249, 250, 251, 1)",
      }}
      justifyContent="space-between"
    >
      <img
        src={vision.featuredImage.node.sourceUrl}
        alt={vision.title}
        style={{ width: "88px" }}
      />
      <Typography sx={{typography:{xs:"h5",lg:"h4"}}} fontWeight={600}>
        {vision.title.toUpperCase()}
      </Typography>
    </Stack>
  );
};

export default VisionCard;
