import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomArrowButton from "src/components/CustomArrowButton";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import SliderProgress from "src/components/customSlider/SliderProgress";
import { CaseStudiesData } from "src/types/graphql/types/resourses.types";

const CaseStudies = ({ data }: { data: CaseStudiesData }) => {
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = data.caseStudies.nodes;
  const mockMoreItems = [...items];

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

  return (
    <Stack sx={{ background: "rgba(45, 55, 72, 1)" }}>
      <Container maxWidth="xl" sx={{ my: 6 }}>
        <Stack gap={4}>
          <Typography variant="h2" color="white">
            Case Studies
          </Typography>
          <CustomSlider2 scrollRef={scrollRef}>
            {mockMoreItems.map((item) => (
              <>
                <Stack
                  sx={{
                    background: "rgba(11, 19, 40, 1)",
                    width: "711px",
                    borderRadius: "8px",
                    minWidth: "711px",
                    maxWidth: "711px",
                  }}
                  padding={2}
                  direction={"row"}
                  gap={4}
                >
                  <Box
                    component={"img"}
                    alt={item.title}
                    src={item.featuredImage?.node.sourceUrl}
                    sx={{
                      borderRadius: "4px",
                      width: "250px",
                      height: "308px",
                      objectFit: "cover",
                    }}
                  />
                  <Stack
                    color={"white"}
                    gap={1}
                    justifyContent={"space-between"}
                  >
                    <Stack gap={2} justifyContent={"space-between"}>
                      <Stack gap={1}>
                        <Typography
                          variant="h4"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "2",
                            overflow: "hidden",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "4",
                            overflow: "hidden",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.content ??
                              "NovaMart collaborated with Blackstone Shipping to s.",
                          }}
                        />
                      </Stack>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                      <CustomArrowButton
                        name="Read More"
                        sx={{
                          border: "none",
                          color: "rgba(26, 86, 219, 1) !important",
                        }}
                      />
                    </Stack>
                    <Stack gap={2}>
                      <Divider />
                      <Stack direction={"row"} gap={2}>
                        <Box
                          component={"img"}
                          src={
                            item.caseStudiesOptions?.caseStudyPersonImage?.node
                              .sourceUrl
                          }
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"4px"}
                          sx={{ objectFit: "cover" }}
                        />
                        <Stack justifyContent={"center"}>
                          <Typography
                            variant="body1"
                            sx={{ fontSize: "18px !important" }}
                            color="rgba(217, 217, 217, 1)"
                          >
                            {item.caseStudiesOptions?.caseStudyPersonName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="rgba(217, 217, 217, 1)"
                          >
                            {
                              item.caseStudiesOptions
                                ?.caseStudyPersonDesignation
                            }
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </>
            ))}
          </CustomSlider2>

          <Stack width={"100%"} alignItems={"flex-end"} justifyContent={"flex-end"} >
            <Stack direction={"row"} width={"55%"} justifyContent={"space-between"}>
              <SliderButton2 scrollRef={scrollRef} />
              <SliderProgress
              sx={{color:"white"}}
                currentIndex={currentIndex}
                totalItems={mockMoreItems.length}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CaseStudies;
