import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { FeaturedContent } from "src/types/graphql/types/myBbx.types";
import { ImageNode } from "src/types/graphql/types/services.types";
import SupplyChainCard from "./SupplyChainCard";

interface Data {
  sciTitle: string;
  sciContent: string;
}

interface Tra {
  traTitle: string;
  traContent: string;
  traImage: ImageNode;
}
interface Fit {
  fitTitle: string;
  fitContent: string;
  fitImage: ImageNode;
}

const SupplyChain = ({
  data,
  frightIndex,
  tools,
  fitSection,
  traSection,
}: {
  data: Data;
  frightIndex: FeaturedContent[];
  tools: FeaturedContent[];
  fitSection: Fit;
  traSection: Tra;
}) => {
  return (
    <Stack mb={6} gap={3}>
      <Stack>
        <Typography variant="h2">{data.sciTitle}</Typography>
        <Box
          component={"div"}
          dangerouslySetInnerHTML={{ __html: data.sciContent }}
          sx={{
            "& p": {
              typography: "body1",
              fontWeight:"600"
            },
          }}
        />
      </Stack>
      <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
        <SupplyChainCard
          data={{
            title: fitSection.fitTitle,
            content: fitSection.fitContent,
            img: fitSection.fitImage,
          }}
          loopData={frightIndex}
        />
        <SupplyChainCard
          data={{
            title: traSection.traTitle,
            content: traSection.traContent,
            img: traSection.traImage,
          }}
          loopData={tools}
        />
      </Stack>
    </Stack>
  );
};

export default SupplyChain;
