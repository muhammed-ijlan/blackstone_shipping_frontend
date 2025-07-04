import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface Data {
  title: string;
  subTitle: string;
  content: string;
}

const Parasgraphs = ({ data }: { data: Data }) => {
  console.log( <Box
    component={"div"}
    sx={{
      // "& p": {
      //   fontWeight:"600",
      //   typography:"body1",
      //   margin:"0"
      // },
      // "& strong": {
      //   fontWeight:"600",
      //   typography:"h4",
      // },
      // "& ul": {
      //       padding: 0,
      //       display: "flex",
      //       flexWrap: "wrap",
      //       gap: 2,
      //       justifyContent: "space-between",
      //       margin: 0,
      //     },
      //     "& li": { 
      //       typography: "body1",
      //       flex: "1 1 48%",
      //       fontSize: "1rem",
      //       border: "1px solid rgba(109, 110, 113, 0.1)",
      //       padding: "15px 15px",
      //       borderRadius: "4px",
      //       backgroundColor: "rgba(249, 250, 251, 1)",
      //       position: "relative",
      //       paddingLeft: "30px",
      //     },
      //     "& li::before": {
      //       content: '"•"',
      //       position: "absolute",
      //       left: "12px",
      //       top: "50%",
      //       transform: "translateY(-50%)",
      //       fontSize: "1.2rem",
      //     },
    }}

    dangerouslySetInnerHTML={{ __html: data.content }}
  />)
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
            marginTop:"5px"
          },
          "& strong": {
            fontWeight:"600",
            typography:"h4",
          },
          "& ul": {
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
            margin: 0,
            listStyleType:"disc",
            paddingLeft:"1.5rem",
          },
          "& li": {
              typography: "body1",
          //  listStyle:"disc",
          },
        }}

        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Stack>
  );
};

export default Parasgraphs;
