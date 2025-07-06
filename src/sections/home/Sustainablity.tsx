// src/sections/Sustainability.tsx
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useRef } from "react";
import CustomArrowButton from "src/components/CustomArrowButton";
import CustomSlider from "src/components/customSlider/CustomSlider";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import SliderButton2 from "src/components/customSlider/SliderButton2";
import LoadingFallback from "src/components/LoadingFallback";
import SectionHead from "src/components/sectionHead/SectionHead";
import { GET_SUSTAINABILITY } from "src/graphql/queries";
import ScrollPane from "src/layouts/components/ScrollPane";
import { useRouter } from "src/routes/hooks";

// src/types/sustainability.ts
interface SustainabilityCommitment {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string;
  uri: string;
}

interface GetSustainabilityData {
  page: {
    title: string;
    homePageFieldsSustainabilityCommitment: {
      sustainabilityCommitmentSubHeading: string;
      sustainabilityCommitmentMainHeading: string;
    };
  };
  sustainabilityCommitments: {
    nodes: SustainabilityCommitment[];
  };
}

const Sustainability = () => {
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const { data, loading, error } =
    useQuery<GetSustainabilityData>(GET_SUSTAINABILITY);

  const router = useRouter();

  if (loading) return <LoadingFallback />;
  if (error || !data) return <LoadingFallback />;

  const commitments = data.sustainabilityCommitments.nodes;
  const heading = data.page.homePageFieldsSustainabilityCommitment;

  return (
    <Stack
      color="black"
      sx={{
        width: "100%",
        height: "100%",
        background: "rgba(245, 247, 251, 1)",
        pb: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack position={"relative"}>
          <SectionHead
            title={heading.sustainabilityCommitmentSubHeading}
            subTitle={heading.sustainabilityCommitmentMainHeading}
            titleColor="rgba(26, 32, 44, 1)"
            subTitleColor="rgba(109, 110, 113, 1)"
          />

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
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
          {commitments.map((card, index) => (
            <Stack
              key={index}
              gap={2}
              width="500px"
              sx={{
                minWidth: "400px",
                maxWidth: "400px",
                borderRadius: "5px",
                mb: 3,
                height: "auto",
                bgcolor: "white",
                p: 3,
              }}
            >
              <Box
                component="img"
                src={card.featuredImage.node.sourceUrl}
                width="100%"
                height={"218px"}
                sx={{ objectFit: "cover" }}
                borderRadius="8px"
              />
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  height: { xs: "58px", md: "65px" },
                  borderBottom: "2px solid rgba(14, 159, 110, 1)",
                  pb: 2,
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "34px",
                  letterSpacing: "3%",
                  textTransform: "capitalize",
                  typography: { xs: "h4", lg: "h5" },
                  textWrap: "wrap",
                }}
              >
                {card.title}
              </Typography>

              <ScrollPane maxHeight={250}  >

              <Box
                component={"div"}
                sx={{
                  "& p": {
                    typography: { xs: "body1", lg: "body2" },
                    margin: "0",
                    textWrap: "wrap",
                  },
                }}
                color="rgba(109, 110, 113, 1)"
                dangerouslySetInnerHTML={{ __html: card.content }}
                />
                </ScrollPane>
            </Stack>
          ))}
        </CustomSlider2>

        <Stack alignItems="center" gap={3}>
          <Stack display={{ xs: "flex", sm: "none" }}>
            <SliderButton2 scrollRef={scrollRef} />
          </Stack>
          <CustomArrowButton
            onClick={() => router.push("/quality-sustainability")}
            name="Explore More"
            sx={{ py: "12px", px: "24px", width: { xs: "100%", md: "auto" } }}
          />
        </Stack>
      </Container>
    </Stack>
  );
};

export default Sustainability;
