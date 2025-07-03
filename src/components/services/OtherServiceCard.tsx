import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { ServiceChild } from "src/types/graphql/types/services.types";

const OtherServiceCard = ({ data }: { data: ServiceChild }) => {
  const theme = useTheme();
  return (
    <Stack gap={2}>
      <Box
        component={"img"}
        src={data?.featuredImage?.node?.sourceUrl}
        alt={data.title}
        sx={{
          width: "100%",
          height: "262px !important",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Typography variant="h4" sx={{
        // [theme.breakpoints.up("md")]: {
        //   display:"-webkit-box",
        //   WebkitLineClamp: 2,
        //   WebkitBoxOrient: "vertical",
        //   overflow: "hidden",
        //   textOverflow: "ellipsis",
        //   height:"100%"
        // },
        // [theme.breakpoints.down("md")]: {
        //   display:"flex",
        // },
      }}>{data.title.toUpperCase()}</Typography>
      <Box
        sx={{
          "& ul": {
            paddingLeft: "1.5rem",
            marginTop: "0.5rem",
            marginBottom: "1rem",
          },
          "& li": {
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            lineHeight: 1.6,
          },
          "& p": {
            marginBottom: "1rem",
            fontSize: "0.95rem",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            paddingRight: "10px ",
            [theme.breakpoints.down("md")]: {
              overflow:"none"
            },
            [theme.breakpoints.up("md")]: {
              overflowY: "auto",
              maxHeight: "200px",
              minHeight: "100px",
              width: "100%",
              "&::-webkit-scrollbar": {
                width: "5px",
                borderRadius: "10px",
                WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                background: "rgba(0,0,0,0.4)"
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(0,0,0,0.1)"
              }

            }, 
          
            "& p": {
              margin: "0",
              typography: "body1",
              fontWeight:"500",
            },
            "& ul": {
              typography: "body1",
              margin: 0,
              padding: 0,
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </Box>
    </Stack>
  );
};

export default OtherServiceCard;
