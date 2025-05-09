// Testimonial.tsx
import { Box, Container, Stack, Typography } from "@mui/material";
import React, { ReactNode, RefObject, useRef } from "react";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SectionHead from "src/components/sectionHead/SectionHead";
import quote from "src/assets/icons/testimonial.png";
import user from "src/assets/images/user.jpg";
import SliderButton2 from "src/components/customSlider/SliderButton2";

interface CustomSliderProps {
  children: ReactNode;
  scrollAmount?: number;
  gap?: number;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const Testimonial = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Stack
      color={"white"}
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(114.75deg, #242E40 100%, #343D4D 0%)",
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={"row"} gap={2}>
          <Stack width={"40%"} gap={4} alignItems={"flex-start"}>
            <SectionHead
              title="Testimonial"
              color="white"
              subTitle="Delivering more than logistics—building relationships through reliability, service, and success."
            />
            <SliderButton2 scrollRef={scrollRef} />
          </Stack>

          <Stack mt={10} width={"60%"}>
            <CustomSlider2 scrollRef={scrollRef}>
              {[1, 2, 3, 4].map((item) => (
                <Stack
                  key={item}
                  sx={{
                    minWidth: "500px", // Use minWidth to force horizontal scrolling
                    border: "2px solid rgba(109, 110, 113, 1)",
                    borderRadius: "8px",
                    p: 4,
                  }}
                  gap={4}
                >
                  <Box component={"img"} src={quote} width={"83px"} />
                  <Typography variant="subtitle1" fontWeight={400}>
                    Testimonial message number {item}.
                  </Typography>
                  <Stack direction={"row"} gap={3}>
                    <Box
                      component={"img"}
                      src={user}
                      width={"84px"}
                      height={"84px"}
                      borderRadius={"4px"}
                    />
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        James Turner {item}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={400}
                        color="rgba(249, 250, 251, 0.5)"
                      >
                        Logistics Director
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={400}
                        color="rgba(249, 250, 251, 0.5)"
                      >
                        Orion Manufacturing Group
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </CustomSlider2>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Testimonial;
