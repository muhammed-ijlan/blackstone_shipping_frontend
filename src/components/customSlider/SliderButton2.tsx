import React, { RefObject, useState, useEffect } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { Iconify } from "../iconify";
import arrowRight from "src/assets/icons/arrowRight.png"
import arrowLeft from "src/assets/icons/arrowLeft.png"
interface SliderButton2Props {
  scrollRef: RefObject<HTMLDivElement>;
  scrollAmount?: number;
}

const SliderButton2: React.FC<SliderButton2Props> = ({
  scrollRef,
  scrollAmount = 1000,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Tolerance to handle floating-point pixel issues
      const tolerance = 1;
      // Can scroll left if not at the start
      setCanScrollLeft(scrollLeft > 0);
      // Can scroll right if not at or very close to the end
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - tolerance);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      // Initial check
      checkScrollPosition();
      // Add scroll event listener
      currentRef.addEventListener("scroll", checkScrollPosition);
      // Trigger check after a slight delay to ensure DOM is fully rendered
      const timeout = setTimeout(checkScrollPosition, 100);
      return () => {
        currentRef.removeEventListener("scroll", checkScrollPosition);
        clearTimeout(timeout);
      };
    }
  }, [scrollRef]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
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
            width:"52px",
            height:"52px"
        }}
      >
       <Box component={"img"} width={"16px"} src={arrowLeft}/>
      </IconButton>
      <IconButton
        size="large"
        onClick={() => scroll("right")}
        sx={{
          border: canScrollRight
            ? "1px solid rgba(109, 110, 113, 0.5)"
            : "1px solid rgba(109, 110, 113, 0.1)",
             width:"52px",
            height:"52px"
        }}
      >
       <Box component={"img"} width={"16px"} src={arrowRight}/>
      </IconButton>
    </Stack>
  );
};

export default SliderButton2;