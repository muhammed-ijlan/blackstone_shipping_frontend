import React, { RefObject, useState, useEffect } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import arrowRight from "src/assets/icons/arrowRight.png";
import arrowLeft from "src/assets/icons/arrowLeft.png";

interface SliderButton2Props {
  scrollRef: RefObject<HTMLDivElement>;
  scrollAmount?: number;
  setCurrentIndex?: (index: number) => void;
  totalItems?: number;
}

const SliderButton2: React.FC<SliderButton2Props> = ({
  scrollRef,
  scrollAmount = 1000,
  setCurrentIndex,
  totalItems,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const tolerance = 1;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - tolerance);

      // Update currentIndex based on scrollLeft
      const child = scrollRef.current?.querySelector(
        ":scope > *"
      ) as HTMLElement;

      if (child) {
        const itemWidth = child.offsetWidth + 16; // 16px gap (gap={2})
        const index = Math.round(scrollLeft / itemWidth);
        if (setCurrentIndex) {
          setCurrentIndex(index);
        }
      }
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      checkScrollPosition();
      currentRef.addEventListener("scroll", checkScrollPosition);
      const timeout = setTimeout(checkScrollPosition, 100);
      return () => {
        currentRef.removeEventListener("scroll", checkScrollPosition);
        clearTimeout(timeout);
      };
    }
  }, [scrollRef]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    // Detect item width dynamically
    const child = container.querySelector(":scope > *") as HTMLElement;
    const itemWidth = child ? child.offsetWidth + 16 : scrollAmount; // fallback to scrollAmount

    const amount = direction === "left" ? -itemWidth : itemWidth;

    container.scrollBy({ left: amount, behavior: "smooth" });

    setTimeout(() => {
      const index = Math.round(container.scrollLeft / itemWidth);
      setCurrentIndex?.(index);
      checkScrollPosition();
    }, 300);
  };
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      gap={1}
      alignItems="center"
    >
      <IconButton
        size="large"
        onClick={() => scroll("left")}
        sx={{
          border: canScrollLeft
            ? "1px solid rgba(109, 110, 113, 0.5)"
            : "1px solid rgba(109, 110, 113, 0.1)",
          width: "52px",
          height: "52px",
        }}
      >
        <Box component="img" width="16px" src={arrowLeft} />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => scroll("right")}
        sx={{
          border: canScrollRight
            ? "1px solid rgba(109, 110, 113, 0.5)"
            : "1px solid rgba(109, 110, 113, 0.1)",
          width: "52px",
          height: "52px",
        }}
      >
        <Box component="img" width="16px" src={arrowRight} />
      </IconButton>
    </Stack>
  );
};

export default SliderButton2;
