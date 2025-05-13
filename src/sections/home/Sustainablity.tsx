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
import React from "react";
import CustomSlider from "src/components/customSlider/CustomSlider";
import SectionHead from "src/components/sectionHead/SectionHead";
import { GET_SUSTAINABILITY } from "src/graphql/queries";

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
  const { data, loading, error } = useQuery<GetSustainabilityData>(GET_SUSTAINABILITY);

  if (loading) return <Stack alignItems="center" py={10}><CircularProgress /></Stack>;
  if (error || !data) return <Typography>Error loading data.</Typography>;

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
      <Container maxWidth="lg">
        <SectionHead
          title={heading.sustainabilityCommitmentSubHeading}
          subTitle={heading.sustainabilityCommitmentMainHeading}
          color="rgba(109, 110, 113, 1)"
        />

        <CustomSlider>
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
                height: "100%",
                bgcolor: "white",
                p: 3,
              }}
            >
              <Box
                component="img"
                src={card.featuredImage.node.sourceUrl}
                width="100%"
                height={"218px"}
                sx={{objectFit:"cover"}}
                borderRadius="8px"
              />
              <Typography
                variant="h3"
                fontWeight={600}
                sx={{
                  borderBottom: "2px solid rgba(14, 159, 110, 1)",
                  pb: 2,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="rgba(109, 110, 113, 1)"
                dangerouslySetInnerHTML={{ __html: card.content }}
              />
            </Stack>
          ))}
        </CustomSlider>

        <Stack alignItems="center">
          <Button size="large" variant="outlined">
            Explore More
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Sustainability;
