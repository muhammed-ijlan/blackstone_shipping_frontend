import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import quote from "src/assets/icons/testimonial.png";
import ScrollPane from "src/layouts/components/ScrollPane";

interface TestimonialCardProps {
  item: {
    content: string;
    title: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
      };
    };
    testimonialsFieldOptions: {
      testimonialAuthorDesignation: string;
      testimonialAuthorCompany:string;
    };
  };
}

const TestimonialCard = ({ item }: TestimonialCardProps) => {
  return (
    <Stack
      sx={{
        minWidth: { xs: "100%", sm: "590px" },
        border: "2px solid rgba(109, 110, 113, 1)",
        borderRadius: "8px",
        p: 4,
        height: { xs: "auto", lg: "auto" },
      }}
      gap={2}
      justifyContent={{ xs: "normal", sm: "space-between" }}
    >
      <Stack justifyContent={{ xs: "normal", sm: "space-between" }} gap={2}>
        <Box component={"img"} src={quote} width={"83px"} alt="quote icon" />
        <ScrollPane maxHeight={250}  sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "10px",
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            background: "#ffffffb3",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0,0,0,0.4)",
          },
        }} >
        <Box
          component={"div"}
          fontWeight={400}
          sx={{
            "& p": {
              typography: "body1",
              textWrap: "wrap",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: item.content 
          }}
          />
          </ScrollPane>
      </Stack>

      <Stack direction={"row"} gap={3}>
        <Box
          component={"img"}
          src={item.featuredImage?.node.sourceUrl}
          width={"84px"}
          height={"84px"}
          sx={{ objectFit: "cover" }}
          borderRadius={"4px"}
          alt={item.title}
        />
        <Stack>
          <Typography variant="h4" fontWeight={600}>
            {item.title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "10px", sm: "16px" },
              lineHeight: "26px",
              letterSpacing: "3%",
              textTransform: "capitalize",
            }}
            color="rgba(249, 250, 251, 0.5)"
          >
            {item.testimonialsFieldOptions.testimonialAuthorDesignation}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "10px", sm: "16px" },
              lineHeight: "26px",
              letterSpacing: "3%",
              textTransform: "capitalize",
              textWrap:"wrap"
            }}
            color="rgba(249, 250, 251, 0.5)"
          >
            {item.testimonialsFieldOptions.testimonialAuthorCompany}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TestimonialCard;
