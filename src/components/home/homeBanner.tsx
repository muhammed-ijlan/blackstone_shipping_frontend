import React, { useRef } from "react";
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
import MobileBanner from "./MobileBanner";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import VideoJS from '../VideoJs';

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
const playerRef = useRef<VideoJsPlayer | null>(null);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  const videoJsOptions: VideoJsPlayerOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    loop: true, 
    muted: true,
    playsinline: true,

    sources: [
      {
        src: 'https://cdn.pixabay.com/video/2019/05/12/23544-335833111_large.mp4',
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: VideoJsPlayer) => {
    playerRef.current = player;

    // You can handle player events here
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
  return (
    <>
      <Box
        width="100%"
        position={"relative"}
        height={{ xs: 400, md: 700 }}
        display={{ xs: "none", sm: "block" }}
      >
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
          <Box sx={{filter:"brightness(0.7)"}}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady}  />
          </Box>
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

      {/* MOBILE SCREEEN */}
      <Stack display={{ xs: "block", sm: "none" }}>
        <Container maxWidth="xl">
          <MobileBanner />
          <Stack width={"100%"} gap={4}>
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
                    width={"100%"}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    alignItems={"center"}
                  >
                    <Stack
                      direction="row"
                      gap={1}
                      borderBottom={2}
                      borderColor="rgba(32, 189, 103, 1)"
                      paddingBottom={1}
                      width="fit-content"
                    >
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="rgba(109, 110, 113, 1)"
                      >
                        {slide.sliderFields.subtitle.split(" ")[0]}
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight={400}
                        color="rgba(109, 110, 113, 1)"
                      >
                        {slide.sliderFields.subtitle.split(" ")[1]}
                      </Typography>
                    </Stack>

                    <Typography
                      textAlign={"center"}
                      variant="h1"
                      color="rgba(11, 19, 40, 1)"
                      fontWeight={700}
                    >
                      {slide.sliderFields.sliderMainHeading.toUpperCase()}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={2} flexWrap={"nowrap"} width={"100%"} alignItems={"center"} >
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
                          fontSize: "13px",
                          borderRadius: "8px",
                          // px: 3,
                          py: 1.5,
                          width: "100%",
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
                          // fontSize: "16px",
                          borderRadius: "8px",
                          width: "100%",

                          // px: 3,
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
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady}  />

          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default HomeBanner;
