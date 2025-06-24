import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface CategoryCard {
  name: string;
  description: string;
}

const JobCategoryCard = ({ data }: { data: CategoryCard }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        bgcolor: "rgba(45, 55, 72, 1)",
        height: "100%",
        borderRadius: "8px",
      }}
      p={3}
      gap={1}
    >
      <Typography
        sx={{
          fontWeight: "600",
          height: "60px",
          lineHeight: "30px !important",
          textTransform: "uppercase !important",
          fontSize: "24px !important",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
        }}
        color="rgba(255, 255, 255, 1)"
      >
        {data.name}
      </Typography>
      <Divider />
      <Typography color="rgba(255, 255, 255, 1)">{data.description}</Typography>
    </Stack>
  );
};

export default JobCategoryCard;
