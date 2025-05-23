import { Container, Stack, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import SectionHead from "src/components/sectionHead/SectionHead";
import IndustryCoverageCard from "../../components/home/IndustryCoverageCard";
import { useQuery } from "@apollo/client";
import { GET_INDUSTRY_COVERAGE } from "src/graphql/queries";

export interface GetIndustryCoverageData {
  page: {
    title: string;
    homePageFieldsIndustryCoverage: {
      industryCoverageMainHeading: string;
    };
  };
  industries: {
    nodes: {
      title: string;
      content: string | null;
      uri: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
      industriesFieldOptions: {
        colorCode: string;
      };
    }[];
  };
}

const IndustryCoverage = () => {
  const { data, loading, error } = useQuery<GetIndustryCoverageData>(
    GET_INDUSTRY_COVERAGE
  );

  if (loading) return <Typography color="white">Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Stack
      color={"white"}
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(114.75deg, #242E40 100%, #343D4D 0%)",
      }}
    >
      <Container maxWidth="xl">
        <SectionHead
          title={
            data?.page?.homePageFieldsIndustryCoverage
              ?.industryCoverageMainHeading || "INDUSTRY COVERAGE"
          }
          titleColor="white"
        />

        <Grid
          container
          rowGap={3}
          mb={10}
          columnSpacing={5}
          justifyContent="space-between"
          alignItems={"center"}
        >
          {data?.industries?.nodes?.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6,md:4 }} mt={3} key={index} p={0}>
              <IndustryCoverageCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default IndustryCoverage;
