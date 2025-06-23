import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { FeaturedContent } from "src/types/graphql/types/myBbx.types";

interface Data {
  ctTitle: string;
  ctContent: string;
}

const ControlTower = ({ data }: { data: Data }) => {
  return (
    <Stack my={6}>
      <Typography variant="h2">{data.ctTitle}</Typography>
      <Box
        component={"div"}
        dangerouslySetInnerHTML={{ __html: data.ctContent }}
      />
    </Stack>
  );
};

export default ControlTower;
