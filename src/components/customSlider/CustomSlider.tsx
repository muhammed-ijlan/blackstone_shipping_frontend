import React, { useRef, ReactNode } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Iconify } from "../iconify";

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
          size="large"
          onClick={() => scroll("left")}
          sx={{ border: "1px solid rgba(109, 110, 113, 0.1)" }}
        >
          <Iconify
            icon={"icon-park-outline:arrow-left"}
            width={"25px"}
            color="rgba(26, 86, 219, 1)"
          />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => scroll("right")}
          sx={{ border: "1px solid rgba(109, 110, 113, 0.1)" }}
        >
          <Iconify
            icon={"icon-park-outline:arrow-right"}
            width={"25px"}
            color="rgba(26, 86, 219, 1)"
          />
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
