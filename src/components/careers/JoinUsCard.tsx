import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface JoinUsCardInterface {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

const JoinUsCard = ({ data }: { data: JoinUsCardInterface }) => {
  return (
    <Stack
      gap={1}
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.5)",
        p: {xs:2,sm:3},
        borderRadius: "8px",
        height: "100%",
      }}
      alignItems={{ xs: "flex-start", sm: "flex-start" }}
    >
      <Stack gap={{xs:2,sm:1}} direction={{ xs: "row", sm: "column" }} alignItems={{xs:"center",sm:"flex-start"}}>

      <Box
        component={"img"}
        src={data.featuredImage.node.sourceUrl}
        sx={{
          width:{xs:"30px",sm:"40px"},
        }}
      />
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase !important",
          textAlign: { xs: "left ", sm: "left" },
        }}
        >
        {data.title}
      </Typography>
        </Stack>
      <Box
        component={"div"}
        sx={{
          " & p": {
            typography: "body1",
            m: 0,
            textAlign: { xs: "left ", sm: "left" },
          },
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Stack>
  );
};

export default JoinUsCard;
