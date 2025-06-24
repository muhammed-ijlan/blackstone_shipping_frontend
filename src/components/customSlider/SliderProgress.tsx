import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

interface SliderProgressProps {
  currentIndex: number;
  totalItems: number;
  sx?: object;
}

const SliderProgress: React.FC<SliderProgressProps> = ({
  currentIndex,
  totalItems,
  sx,
}) => {
  const progress = ((currentIndex + 1) / totalItems) * 100;

  return (
    <Box sx={{ width: "200px" }}>
      <Typography variant="body1" color="white" sx={{ ...sx }}>
        {String(currentIndex + 1).padStart(2, "0")} /{" "}
        {String(totalItems).padStart(2, "0")}
      </Typography>
      <LinearProgress
        color="inherit"
        variant="determinate"
        value={progress}
        sx={{
          height: "4px",
          color: "white !important",
          backgroundColor: "rgba(109, 110, 113, 1)",
          borderRadius: "4px",
          mt: 1,
        }}
      />
    </Box>
  );
};

export default SliderProgress;
