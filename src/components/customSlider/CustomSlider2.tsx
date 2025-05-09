import React, { ReactNode, RefObject } from "react";
import { Box, Stack } from "@mui/material";

interface CustomSliderProps {
  children: ReactNode;
  scrollRef: RefObject<HTMLDivElement>;
  gap?: number;
}

const CustomSlider2: React.FC<CustomSliderProps> = ({ children, scrollRef, gap = 2 }) => {
  return (
    <Stack spacing={2}>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: gap,
          "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default CustomSlider2;
