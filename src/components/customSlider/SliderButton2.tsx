import React, { RefObject } from "react";
import { IconButton, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Iconify } from "../iconify";

interface SliderButton2Props {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scrollAmount?: number;
}

const SliderButton2: React.FC<SliderButton2Props> = ({
  scrollRef,
  scrollAmount = 1000,
}) => {
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
  );
};

export default SliderButton2;
