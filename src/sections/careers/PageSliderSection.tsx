import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SliderCard from "src/components/careers/SliderCard";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import SliderProgress from "src/components/customSlider/SliderProgress";
import { background } from "src/theme";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const PageSliderSection = ({ data }: { data: GetCareersPageData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const child = container.children[0] as HTMLElement;
      if (!child) return;

      const itemWidth = child.offsetWidth + 16;
      const index = Math.round(container.scrollLeft / itemWidth);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  return (
    <Stack gap={3} position={"relative"}>
      <Divider />
      <Stack sx={{ position: "relative" }}>
        <Stack maxWidth={"700px"}>
          <Stack>
            <Typography variant="h2">
              {data.page.careersPageMeetOur.meetOurPeopleTitle}
            </Typography>
            <Box
              sx={{ color: "rgba(109, 110, 113, 1)" }}
              component={"div"}
              dangerouslySetInnerHTML={{
                __html: data.page.careersPageMeetOur.meetOurPeopleContent,
              }}
            />
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          // alignItems={"flex-end"}
          // justifyContent={"flex-end"}
          mb={3}
          gap={3}
          position={{ xs: "static", sm: "absolute" }}
          right={0}
          bottom={0}
        >
          <Stack display={{ xs: "none", md: "flex" }}>
            <SliderButton2 scrollRef={scrollRef} />
          </Stack>
        </Stack>
      </Stack>

      <CustomSlider2 scrollRef={scrollRef}>
        {data.peoples.nodes.map((item, index) => (
          <SliderCard data={item} />
        ))}
      </CustomSlider2>

      <Stack display={{ xs: "flex", sm: "none" }} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
        <SliderButton2 scrollRef={scrollRef} />
        <SliderProgress
          currentIndex={currentIndex}
          totalItems={data.peoples.nodes.length}
          textColor="rgba(45, 55, 72, 1)"
          sx={{ color: "rgba(109, 110, 113, 1) !important", background: "rgba(217, 217, 217, 1) !important" }}
        />
      </Stack>
    </Stack>
  );
};

export default PageSliderSection;
