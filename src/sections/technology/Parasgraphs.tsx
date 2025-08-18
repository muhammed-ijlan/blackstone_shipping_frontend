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
        {data?.subTitle}
      </Typography>
      <Box
        component={"div"}
        sx={{
          mt: { xs: 2, md: 3 },
          "& p": {
            fontWeight: "500 !important",
            typography: "h4",
            marginTop: "5px"
          },
          // "& strong": {
          //   fontWeight: "600",
          //   typography: "h4",
          // },
          // "& ul": {
          //   padding: 0,
          //   display: "flex",
          //   flexWrap: "wrap",
          //   gap: 2,
          //   justifyContent: "space-between",
          //   margin: 0,
          //   listStyleType: "disc",
          //   paddingLeft: "1.5rem",
          // },
          // "& li": {
          //   typography: "body1",
          //   //  listStyle:"disc",
          // },
        }}

        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Stack>
  );
};

export default Parasgraphs;
