import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ImageNode } from "src/types/graphql/types/services.types";

interface Data {
  smSubTitle: string;
  smMainTitleFirstPart: string;
  smMainTitleSecondPart: string;
  smContent: string;
  smImage: ImageNode;
}

const ShipmentManagement = ({ data }: { data: Data }) => {
  return (
    <Stack direction={"row"} my={6} gap={0}>
      <Stack flex={1}>
        <Typography variant="h3" sx={{ fontWeight: "700 !important" }}>
          {data.smSubTitle}
        </Typography>
        <Typography
          variant="h2"
          sx={{ "& span ": { color: "rgb(108,115,127)" } }}
        >
          {data.smMainTitleFirstPart}{" "}
          {<span>{data.smMainTitleSecondPart}</span>}
        </Typography>
        <Box
          component={"div"}
          sx={{
            "& p": {
              typography: "body1",
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.smContent }}
        />
      </Stack>
      <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
        <Box
          component={"img"}
          src={data.smImage.node.sourceUrl}
          alt={data.smSubTitle}
          sx={{ maxWidth: "500px" }}
        />
      </Stack>
    </Stack>
  );
};

export default ShipmentManagement;
