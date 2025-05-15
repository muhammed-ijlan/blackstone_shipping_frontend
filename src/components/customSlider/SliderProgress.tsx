import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

interface SliderProgressProps {
  currentIndex: number;
  totalItems: number;
}

const SliderProgress: React.FC<SliderProgressProps> = ({ currentIndex, totalItems }) => {
  const progress = (currentIndex / Math.max(totalItems - 1, 1)) * 100;

  return (
    <Box sx={{ width: "200px" }}>
      <Typography variant="body2">
        {String(currentIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
      </Typography>
      <LinearProgress
        color="inherit"
        variant="determinate"
        value={progress}
        sx={{
          height: "4px",
          color: "white",
          backgroundColor: "rgba(109, 110, 113, 1)",
          borderRadius: "4px",
          mt: 1,
        }}
      />
    </Box>
  );
};

export default SliderProgress;
