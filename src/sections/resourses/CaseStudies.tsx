import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomArrowButton from "src/components/CustomArrowButton";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import SliderProgress from "src/components/customSlider/SliderProgress";
import { useRouter } from "src/routes/hooks";
import { CaseStudiesData } from "src/types/graphql/types/resourses.types";

const CaseStudies = ({ data }: { data: CaseStudiesData }) => {
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const items = data.caseStudies.nodes;
  const mockMoreItems = [...items];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstChild = container.querySelector(":scope > *") as HTMLElement;
      if (!firstChild) return;

      const itemWidth = firstChild.offsetWidth + 16;
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
            {mockMoreItems.map((item, index) => (
              <React.Fragment key={index}>
                <Stack
                  key={index}
                  sx={{
                    background: "rgba(11, 19, 40, 1)",
                    width: { xs: "100%", md: "850px" },
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                  padding={2}
                  direction={{ xs: "column", md: "row" }}
                  gap={4}
                >
                  <Box
                    component={"img"}
                    alt={item.title}
                    src={item.featuredImage?.node.sourceUrl}
                    sx={{
                      borderRadius: "4px",
                      width: { xs: "100%", md: "250px" },
                      height: { xs: "217px", md: "308px" },
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
                            textAlign: "left !important",
                            textWrap: "wrap",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography

                          sx={{
                            typography: { xs: "body1", md: "body2" },
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "3",
                            overflow: "hidden",
                            textWrap: "wrap",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              item.caseStudiesOptions?.customerDescription ?? "",
                          }}
                        />
                      </Stack>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                      <CustomArrowButton
                        onClick={() =>
                          router.push(`/resources${item.uri}`)
                        }
                        name="Read More"
                        sx={{
                          border: "none",
                        }}
                        textColor="rgba(26, 86, 219, 1)"
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
              </React.Fragment>
            ))}
          </CustomSlider2>

          <Stack
            width={"100%"}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Stack
              direction={"row"}
              width={{ xs: "100%", md: "55%" }}
              justifyContent={"space-between"}
            >
              <SliderButton2
                scrollRef={scrollRef}
                setCurrentIndex={setCurrentIndex}
                totalItems={mockMoreItems.length}
              />
              <SliderProgress
                currentIndex={currentIndex}
                totalItems={mockMoreItems.length}
                sx={{ color: "rgba(249, 250, 251, 1)", background: "rgba(109, 110, 113, 1)" }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CaseStudies;
