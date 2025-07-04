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

      <Stack  sx={{
        paddingRight: "10px ",
        [theme.breakpoints.down("md")]: {
          overflow: "none"
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
      }}>

   
      <Typography variant="h4" sx={{
      }}>{data.title.toUpperCase()}
      </Typography>

      <Box
        component="div"
        sx={{
          "& p": {
            margin: "0",
            typography: "body1",
            textTransform:"none",
            fontWeight: "500",
          },
          "& ul": {
            marginTop: "0.5rem",
            marginBottom: "1rem",
          },
          "& li": {
            marginBottom: "0.5rem",
            lineHeight: 1.6,
          },
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
         </Stack>
    </Stack>
  );
};

export default OtherServiceCard;
