import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface Data {
  title: string;
  subTitle: string;
  content: string;
}

const Parasgraphs = ({ data }: { data: Data }) => {
  return (
    <Stack sx={{ my: 5 }}>
      <Typography variant="h1" sx={{ textTransform: "capitalize !important" }}>
        {data.title} :<br /> {data?.subTitle}
      </Typography>
      <Box
        component={"div"}
        sx={{
          "& p": {
            fontWeight:"600",
            typography:"body1",
            margin:"0"
          },
          "& strong": {
            fontWeight:"600",
            typography:"h4",
          }
        }}

        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Stack>
  );
};

export default Parasgraphs;
