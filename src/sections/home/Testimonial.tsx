import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SectionHead from "src/components/sectionHead/SectionHead";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import quote from "src/assets/icons/testimonial.png";
import { GET_TESTIMONIALS } from "src/graphql/queries";
import SliderProgress from "src/components/customSlider/SliderProgress";
import LoadingFallback from "src/components/LoadingFallback";

interface TestimonialNode {
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

interface TestimonialsData {
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
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
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

  if (loading) return <LoadingFallback />;
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
        background: "rgba(45, 55, 72, 1)",
        pb: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", lg: "row" }} gap={2}>
          <Stack
            width={{ xs: "100%", lg: "40%" }}
            gap={{ xs: 0, sm: 3 }}
            alignItems={{ xs: "center", sm: "flex-start" }}
          >
            <SectionHead
              title={testimonialsSubHeading}
              titleColor="rgba(255, 255, 255, 0.5)"
              subTitleColor="rgba(249, 250, 251, 1)"
              subTitle={testimonialsMainHeading}
            />
            <Stack
              display={{ xs: "none", lg: "flex" }}
              gap={3}
              alignItems={{ xs: "center", lg: "flex-start" }}
            >
              <SliderButton2 scrollRef={scrollRef} />
              <SliderProgress
                currentIndex={currentIndex}
                totalItems={testimonialsList.length}
              />
            </Stack>
          </Stack>

          <Stack mt={{ xs: 0, lg: 10 }} width={{ xs: "100%", lg: "60%" }}>
            <CustomSlider2 scrollRef={scrollRef}>
              {testimonialsList.map((item, index) => (
                <Stack
                  key={index}
                  sx={{
                    minWidth: { xs: "100%", sm: "590px" },
                    border: "2px solid rgba(109, 110, 113, 1)",
                    borderRadius: "8px",
                    p: 4,
                    height: { xs: "auto", lg: "auto" },
                  }}
                  gap={2}
                  justifyContent={{ xs: "normal", sm: "space-between" }}
                >
                  <Stack
                    justifyContent={{ xs: "normal", sm: "space-between" }}
                    gap={2}
                  >
                    <Box
                      component={"img"}
                      src={quote}
                      width={"83px"}
                      alt="quote icon"
                    />
                    <Box
                      component={"div"}
                      fontWeight={400}
                      sx={{
                        "& p": {
                          typography: "body1",
                          textWrap: "wrap",
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.content),
                      }}
                    />
                  </Stack>

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
                        sx={{
                          fontWeight: 400,
                          fontSize: { xs: "10px", sm: "16px" },
                          lineHeight: "26px",
                          letterSpacing: "3%",
                          textTransform: "capitalize",
                        }}
                        color="rgba(249, 250, 251, 0.5)"
                      >
                        {
                          item.testimonialsFieldOptions
                            .testimonialAuthorDesignation
                        }
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: { xs: "10px", sm: "16px" },
                          lineHeight: "26px",
                          letterSpacing: "3%",
                          textTransform: "capitalize",
                        }}
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
          <Stack
            display={{ xs: "flex", lg: "none" }}
            gap={3}
            alignItems={{ xs: "center", lg: "flex-start" }}
          >
            <SliderButton2 scrollRef={scrollRef} />
            <SliderProgress
              currentIndex={currentIndex}
              totalItems={testimonialsList.length}
            />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Testimonial;
