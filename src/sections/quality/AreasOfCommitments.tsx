import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import AreasOfCommitmentSection from "./AreasOfCommitmentSection";
import { GetQualityAndSustainabilityPageData } from "src/types/graphql/types/quality.types";
import CarbonCalculator from "./CarbonCalculator";

type AreasOfCommitmentProps = {
  data: GetQualityAndSustainabilityPageData["pageBy"]["qualitySustainabilityPageAreasofCommitment"];
};

const AreasOfCommitments: React.FC<AreasOfCommitmentProps> = ({ data }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h2" color="rgba(45, 55, 72, 1)">
        {data.areasOfCommitmentSectionMainTitle}
      </Typography>

      <AreasOfCommitmentSection
        subTitle={data.areasOfCommitmentSectionSubTitle1}
        content={data.areasOfCommitmentSectionContent1}
        mainImage={data.areasOfCommitmentSection1MainImage}
        subImages={[
          data.areasOfCommitmentSectionSubImage1,
          data.areasOfCommitmentSection1SubImage2,
          data.areasOfCommitmentSection1SubImage3,
          data.areasOfCommitmentSection1SubImage4,
        ]}
      />
      <Divider />
      <AreasOfCommitmentSection
        subTitle={data.areasOfCommitmentSection2SubTitle}
        content={data.areasOfCommitmentSection2Content}
        mainImage={data.areasOfCommitmentSection2MainImage}
        subImages={[
          data.areasOfCommitmentSection2SubImage1,
          data.areasOfCommitmentSection2SubImage2,
          data.areasOfCommitmentSection2SubImage3,
          data.areasOfCommitmentSection2SubImage4,
        ]}
      />
      <Divider />
      <AreasOfCommitmentSection
        subTitle={data.areasOfCommitmentSection3SubTitle}
        content={data.areasOfCommitmentSection3Content}
        mainImage={data.areasOfCommitmentSection3MainImage}
        subImages={[
          data.areasOfCommitmentSection3SubImage1,
          data.areasOfCommitmentSection3SubImage2,
          data.areasOfCommitmentSection3SubImage3,
          data.areasOfCommitmentSection3SubImage4,
        ]}
      />
      <Divider />
      <AreasOfCommitmentSection
        subTitle={data.areasOfCommitmentSection4SubTitle}
        content={data.areasOfCommitmentSection4Content}
        mainImage={data.areasOfCommitmentSection4MainImage}
        subImages={[]}
      />
    </Stack>
  );
};

export default AreasOfCommitments;
