import React from "react";
import {
  Button,
  Container,
  Stack,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ArrowForward } from "@mui/icons-material";
import { GET_SLIDERS } from "src/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "src/routes/hooks";

interface SliderNode {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  sliderFields: {
    sliderMainHeading: string;
    subtitle: string;
    shortDescription: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
  };
}

interface GetSlidersData {
  sliders: {
    nodes: SliderNode[];
  };
}

const HomeBanner: React.FC = () => {
  const { loading, error, data } = useQuery<GetSlidersData>(GET_SLIDERS);
  const router = useRouter();
  const theme = useTheme();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box width="100%" position={"relative"} height={{ xs: 400, md: 600 }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Box
          component="iframe"
          src="https://www.youtube.com/embed/KUE6R4l0mas?si=ZcJl6WqKok3hdphA&controls=0&modestbranding=1&rel=0&loop=1&playlist=KUE6R4l0mas&autoplay=1&mute=1"
          title="Banner Video"
          allow="autoplay; fullscreen"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100vw",
            minHeight: "130vh",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            border: 0,
            filter: "brightness(0.5)",
          }}
        />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack width={"100%"}>
          <Carousel
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            showThumbs={false}
            useKeyboardArrows
            autoPlay={false}
            stopOnHover
            swipeable
            emulateTouch
          >
            {data?.sliders.nodes.map((slide, index) => (
              <Box
                key={index}
                style={{
                  MozUserSelect: "none",
                  WebkitUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                  position: "relative",
                }}
                unselectable="on"
                onMouseDown={(e) => e.preventDefault()}
              >
                <Box
                  width={"700px"}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  alignItems={"flex-start"}
                >
                  <Stack
                    direction="row"
                    gap={1}
                    borderBottom={2}
                    borderColor="rgba(32, 189, 103, 1)"
                    paddingBottom={1}
                    width="fit-content"
                  >
                    <Typography variant="h3" fontWeight={700} color="white">
                      {slide.sliderFields.subtitle.split(" ")[0]}
                    </Typography>
                    <Typography variant="h3" fontWeight={400} color="white">
                      {slide.sliderFields.subtitle.split(" ")[1]}
                    </Typography>
                  </Stack>

                  <Typography
                    textAlign={"left"}
                    variant="h1"
                    color="white"
                    fontWeight={700}
                    // sx={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
                  >
                    {slide.sliderFields.sliderMainHeading.toUpperCase()}
                  </Typography>

                  <Typography
                    variant="h5"
                    color="white"
                    fontWeight={400}
                    // sx={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
                  >
                    {slide.sliderFields.shortDescription}
                  </Typography>

                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      onClick={() =>
                        router.push(slide.sliderFields.button1Link)
                      }
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: "#0061f2",
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "16px",
                        borderRadius: "8px",
                        px: 3,
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "#0052cc",
                        },
                      }}
                    >
                      {slide.sliderFields.button1Text}
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(slide.sliderFields.button2Link)
                      }
                      variant="contained"
                      sx={{
                        backgroundColor: "#28a745",
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "16px",
                        borderRadius: "8px",
                        px: 3,
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "#218838",
                        },
                      }}
                    >
                      {slide.sliderFields.button2Text}
                    </Button>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeBanner;
