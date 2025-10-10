import { useQuery } from "@apollo/client";
import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import SliderProgress from "src/components/customSlider/SliderProgress";
import TestimonialCard from "src/components/home/TestimonialCard";
import LoadingFallback from "src/components/LoadingFallback";
import SectionHead from "src/components/sectionHead/SectionHead";
import { GET_TESTIMONIALS } from "src/graphql/queries";

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
    testimonialAuthorCompany: string;

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

      const itemWidth = child.offsetWidth + 16;
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
        <Stack direction={{ xs: "column", lg: "row" }} gap={{ xs: 3, md: 7 }}>
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
              variant="h3"
            />
            <Stack
              display={{ xs: "none", lg: "flex" }}
              gap={3}
              alignItems={{ xs: "center", lg: "flex-start" }}
            >
              <SliderButton2
                scrollRef={scrollRef}
                setCurrentIndex={setCurrentIndex}
                totalItems={testimonialsList.length}
              />
              <SliderProgress
                currentIndex={currentIndex}
                totalItems={testimonialsList.length}
                sx={{ color: "white", background: "rgba(109, 110, 113, 1)" }}
              />
            </Stack>
          </Stack>

          <Stack mt={{ xs: 0, lg: 10 }} width={{ xs: "100%", lg: "60%" }}>
            <CustomSlider2 scrollRef={scrollRef}>
              {testimonialsList.map((item, index) => (
                <TestimonialCard key={index} item={item} />
              ))}
            </CustomSlider2>
          </Stack>
          <Stack
            display={{ xs: "flex", lg: "none" }}
            gap={3}
            alignItems={{ xs: "center", lg: "flex-start" }}
          >
            <SliderButton2
              scrollRef={scrollRef}
              setCurrentIndex={setCurrentIndex}
              totalItems={testimonialsList.length}
            />
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
