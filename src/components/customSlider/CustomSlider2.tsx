import React, { ReactNode, RefObject, useEffect } from "react";
import { Box, Stack } from "@mui/material";

interface CustomSliderProps {
  children: ReactNode;
  scrollRef: RefObject<HTMLDivElement>;
  gap?: number;
  autoScroll?: boolean;
  scrollSpeed?: number;
}

const CustomSlider2: React.FC<CustomSliderProps> = ({
  children,
  scrollRef,
  gap = 2,
  autoScroll = false,
  scrollSpeed = 1,
}) => {
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const scrollElement = scrollRef.current;
    let animationFrameId: number;

    const scroll = () => {
      if (!scrollElement) return;

      scrollElement.scrollLeft += scrollSpeed;

      // If scrolled past the first half (original content), reset
      const halfWidth = scrollElement.scrollWidth / 2;
      if (scrollElement.scrollLeft >= halfWidth) {
        scrollElement.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoScroll, scrollRef, scrollSpeed]);

  // Clone children for infinite loop illusion
  const duplicatedChildren = (
    <>
      {children}
      {children}
    </>
  );

  return (
    <Stack spacing={2}>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "auto", // not "smooth" for controlled scroll
          gap: gap,
          "&::-webkit-scrollbar": { display: "none" },
          whiteSpace: "nowrap",
        }}
      >
        {autoScroll ? duplicatedChildren : children}
      </Box>
    </Stack>
  );
};

export default CustomSlider2;
