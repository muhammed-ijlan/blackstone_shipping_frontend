import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import SliderCard from "src/components/careers/SliderCard";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const PageSliderSection = ({ data }: { data: GetCareersPageData }) => {
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  return (
    <Stack gap={3}>
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
            <Stack display={{ xs: "none", sm: "flex" }}>
              <SliderButton2 scrollRef={scrollRef} />
            </Stack>
          </Stack>  
      </Stack>

      <CustomSlider2 scrollRef={scrollRef}>
        {data.peoples.nodes.map((item, index) => (
          <SliderCard data={item} />
        ))}
      </CustomSlider2>
    </Stack>
  );
};

export default PageSliderSection;
