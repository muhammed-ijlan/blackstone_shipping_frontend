import React, { RefObject } from "react";
import { IconButton, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface SliderButton2Props {
  scrollRef: RefObject<HTMLDivElement>;
  scrollAmount?: number;
}

const SliderButton2: React.FC<SliderButton2Props> = ({ scrollRef, scrollAmount = 300 }) => {
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <Stack direction="row" justifyContent="flex-end" gap={1}>
      <IconButton onClick={() => scroll("left")} sx={{ border: "1px solid black", backgroundColor: "#fff" }}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={() => scroll("right")} sx={{ border: "1px solid black", backgroundColor: "#fff" }}>
        <ArrowForward />
      </IconButton>
    </Stack>
  );
};

export default SliderButton2;
