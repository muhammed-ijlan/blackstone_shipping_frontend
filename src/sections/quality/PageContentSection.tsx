import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import PageSectionCard from "src/components/qualitySustainablity/PageSectionCard";

interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface UnifiedContentSection {
  mainTitle: string;
  subTitle1: string;
  content1: string;
  image1: ImageNode;
  subTitle2: string;
  content2: string;
  image2: ImageNode;
  bottomContent?: string;
}

const PageContentSection = ({ data }: { data: UnifiedContentSection }) => {
  return (
    <Stack my={6}>
      <Typography
        variant="h1"
        sx={{
          textTransform: "capitalize !important",
          fontweight: "600 !important",
          color: "rgba(45, 55, 72, 1)",
        }}
      >
        {data.mainTitle}
      </Typography>
      <PageSectionCard
        subTitle={data.subTitle1}
        content={data.content1}
        imageUrl={data.image1.node.sourceUrl}
      />
      <Divider />
      <PageSectionCard
        subTitle={data.subTitle2}
        content={data.content2}
        imageUrl={data.image2.node.sourceUrl}
      />
      {data.bottomContent && (
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "rgba(45, 55, 72, 1)" }}
        >
          {data.bottomContent}
        </Typography>
      )}
    </Stack>
  );
};

export default PageContentSection;
