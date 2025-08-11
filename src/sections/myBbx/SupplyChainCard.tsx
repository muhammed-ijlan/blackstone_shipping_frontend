import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { FeaturedContent } from "src/types/graphql/types/myBbx.types";
import { ImageNode } from "src/types/graphql/types/services.types";

interface Data {
  title: string;
  content: string;
  img: ImageNode;
  sectionId: string;

}

const SupplyChainCard = ({
  data,
  loopData,
}: {
  data: Data;
  loopData: FeaturedContent[];
  
}) => {
  return (
    <Stack
    id={data.sectionId}
      flex={1}
      sx={{
        boxShadow: "3px 3px 20px 0px rgba(45, 55, 72, 0.13)",
        borderRadius: "8px",
        p: 4,
      }}
      gap={1}
    >
      <Stack
        sx={{
          borderRadius: "4px",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(45, 55, 72, 1)",
          width: "42px",
        }}
      >
        <Box component={"img"} src={data.img.node.sourceUrl} width="32px" />
      </Stack>
      <Typography variant="h3" sx={{ textTransform: "capitalize !important" }}>
        {data.title}
      </Typography>
      <Box
        component={"div"}
        dangerouslySetInnerHTML={{ __html: data.content }}
        sx={{
          "& p": {
            typography: "body1",
            margin: "0",
          },
        }}
      />
      <Divider sx={{ my: 3 }} />
      <Stack gap={3}>
        {loopData.map((item) => (
          <Stack gap={2}>
            <Stack direction={"row"} gap={2}>
              <Box
                component={"img"}
                src={item.featuredImage?.node.sourceUrl}
                width="32px"
                height="32px"
              />
              <Typography variant="h4">{item.title}</Typography>
            </Stack>
            <Box
              component={"div"}
              dangerouslySetInnerHTML={{ __html: item.content }}
              sx={{
                "& p": {
                  typography: "body1",
                  margin: "0",
                  color: "rgba(45, 55, 72, 1)",
                },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SupplyChainCard;
