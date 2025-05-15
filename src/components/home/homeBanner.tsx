import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import bannerImage from "src/assets/images/container.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner from "src/assets/images/container.png";
import banner1 from "src/assets/images/banner1.jpg";
import banner2 from "src/assets/images/banner2.jpg";
import banner3 from "src/assets/images/banner3.jpg";
import banner4 from "src/assets/images/banner4.jpg";
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


const HomeBanner :React.FC = () => {
  const { loading, error, data } = useQuery<GetSlidersData>(GET_SLIDERS);

  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showIndicators={true}
      infiniteLoop={true}
      showThumbs={false}
      useKeyboardArrows={true}
      autoPlay={false}
      stopOnHover={true}
      swipeable={true}
      dynamicHeight={false}
      emulateTouch={true}
      autoFocus={true}
      
    >
    
      {data?.sliders.nodes.map((slide, index) => (
        <div key={index}  style={{
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
        unselectable="on"
        onMouseDown={(e) => e.preventDefault()}
        >
          {/* <img
            src={slide.featuredImage.node.sourceUrl}
            alt="Banner"
            style={{ objectFit: "cover", height: "600px",filter: "brightness(60%)", }}
          /> */}

          <Stack
  sx={{
    position: "relative",
    width: "110vw",
    height: { xs: "300px", md: "600px" }, // Responsive height
    overflow: "hidden",
    objectFit: "cover",
  }}
>
  <iframe
    src="https://www.youtube.com/embed/Lh5u7GOXvxc?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=Lh5u7GOXvxc"
    title="Banner Video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
    style={{
      position: "absolute",
      top: "-25%",       // Vertically center & crop
      left: 0,
      width: "100vw",
      height: "150%",    // Simulates object-fit: cover
      pointerEvents: "none",
      objectFit: "cover",
    }}
  ></iframe>
</Stack>


          <Stack
            width={"600px"}
            direction="column"
            spacing={2}
            sx={{ position: "absolute", top: "20%", left: "10%" }}
          >
            <Stack
              direction={"row"}
              gap={1}
              borderBottom={2}
              borderColor={"rgba(32, 189, 103, 1)"}
              paddingBottom={2}
              width={"fit-content"}
            >
              <Typography variant="h3" fontWeight={700} color="white">
               {slide.sliderFields.subtitle.split(" ")[0]}
              </Typography>
              <Typography variant="h3" fontWeight={400} color="white">
              {slide.sliderFields.subtitle.split(" ")[1]}


              </Typography>
            </Stack>
            <Typography
              variant="h1"
              color="white"
              fontWeight={700}
              textAlign={"left"}
              flexWrap={"wrap"}
            >
              {slide.sliderFields.sliderMainHeading}
            </Typography>
            <Typography
              variant="h4"
              color="white"
              fontWeight={500}
              textAlign={"left"}
            >
              {slide.sliderFields.shortDescription}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button  onClick={()=>router.push(slide.sliderFields.button1Link)}
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
              <Button  onClick={()=>router.push(slide.sliderFields.button2Link)}

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
          </Stack>
        </div>
      ))}
    </Carousel>
  );
};

export default HomeBanner;
