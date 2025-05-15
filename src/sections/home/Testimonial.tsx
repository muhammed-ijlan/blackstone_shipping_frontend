import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SectionHead from "src/components/sectionHead/SectionHead";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import quote from "src/assets/icons/testimonial.png";
import { GET_TESTIMONIALS } from "src/graphql/queries";
import SliderProgress from "src/components/customSlider/SliderProgress";

export interface TestimonialNode {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string;
  uri: string;
  testimonialsFieldOptions: {
    testimonialAuthorDesignation: string;
  };
}

export interface TestimonialsData {
  page: {
    title: string;
    homePageFieldsTestimonials: {
      testimonialsSubHeading: string;
      testimonialsMainHeading: string;
    };
  };
  testimonials: {
    nodes: TestimonialNode[];
  };
}

const Testimonial = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, loading, error } = useQuery<TestimonialsData>(GET_TESTIMONIALS);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const child = container.children[0] as HTMLElement;
      if (!child) return;

      const itemWidth = child.offsetWidth + 16; // item width + gap
      const index = Math.round(container.scrollLeft / itemWidth);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;
  if (error || !data)
    return <Typography color="error">Error loading testimonials.</Typography>;

  const { testimonialsMainHeading, testimonialsSubHeading } =
    data.page.homePageFieldsTestimonials;

  const testimonialsList = data.testimonials.nodes;

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
      <Container maxWidth="xl">
        <Stack direction={"row"} gap={2}>
          <Stack width={"40%"} gap={4} alignItems={"flex-start"}>
            <SectionHead
              title={testimonialsSubHeading}
              color="white"
              subTitle={testimonialsMainHeading}
            />
            <SliderButton2 scrollRef={scrollRef} />
            <SliderProgress currentIndex={currentIndex} totalItems={testimonialsList.length} />
          </Stack>

          <Stack mt={10} width={"60%"}>
            <CustomSlider2 scrollRef={scrollRef}>
              {testimonialsList.map((item, index) => (
                <Stack
                  key={index}
                  sx={{
                    minWidth: "500px",
                    border: "2px solid rgba(109, 110, 113, 1)",
                    borderRadius: "8px",
                    p: 4,
                  }}
                  gap={4}
                  justifyContent={"space-between"}
                >
                  <Box
                    component={"img"}
                    src={quote}
                    width={"83px"}
                    alt="quote icon"
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={400}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.content),
                    }}
                  />
                  <Stack direction={"row"} gap={3}>
                    <Box
                      component={"img"}
                      src={item.featuredImage?.node.sourceUrl}
                      width={"84px"}
                      height={"84px"}
                      sx={{ objectFit: "cover" }}
                      borderRadius={"4px"}
                      alt={item.title}
                    />
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={400}
                        color="rgba(249, 250, 251, 0.5)"
                      >
                        {
                          item.testimonialsFieldOptions
                            .testimonialAuthorDesignation
                        }
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
