import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ImageNode } from "src/types/graphql/types/services.types";

interface Data {
  edTitle: string;
  edContent: string;
  edImage: ImageNode;
}

const Edocs = ({ data }: { data: Data }) => {
  return (
    <Stack
      my={5}
      direction={{ xs: "column", md: "row" }}
      flexWrap={"wrap"}
      gap={3}
    >
      <Stack flex={{ xs: 1, md: 2 }}>
        <Typography variant="h2">{data.edTitle}</Typography>
        <Box
          component={"div"}
          dangerouslySetInnerHTML={{ __html: data.edContent }}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            "& p": {
              typography: "body1",
              textWrap: "wrap",
              fontWeight:"600"
            },
            "& ul": {
              display: "flex",
              color: "rgba(109, 110, 113, 1)",
              gap: 2,
              flexWrap: "wrap",
              width: { xs: "100%", md: "500px" },

            },
            "& li": {
              listStyle: "inside",
              fontWeight:"600"
            },
          }}
        />
      </Stack>
      <Stack
        flex={1}
        sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "8px" }}
        p={3}
        alignItems={"center"}
      >
        <Box
          component={"img"}
          width={"380px"}
          src={data.edImage.node.sourceUrl}
        />
      </Stack>
    </Stack>
  );
};

export default Edocs;
