import React, { useRef, ReactNode } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface CustomSliderProps {
  children: ReactNode;
  scrollAmount?: number;
  gap?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  children,
  scrollAmount = 300,
  gap = 2,
}) => {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      scrollContainer.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="flex-end" gap={1}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            border: "1px solid black",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            border: "1px solid black",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <ArrowForward />
        </IconButton>
      </Stack>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: gap,
          "&::-webkit-scrollbar": { display: "none" },
        }}
        ref={scrollContainer}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default CustomSlider;
