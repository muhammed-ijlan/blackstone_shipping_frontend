import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import AreasOfSubImages from "./AreasOfSubImages";
interface PageSectionCardProps {
  subTitle: string;
  content: string;
  imageUrl: string;
  images?: {
    node: {
      sourceUrl: string;
    };
  }[];
}

const PageSectionCard: React.FC<PageSectionCardProps> = ({
  subTitle,
  content,
  imageUrl,
  images = [],
}) => {
  return (
    <Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          my: { xs: 2, sm: 4 },
        }}
      >
        <Stack
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "left",
          }}
        >
          <Typography color="rgba(11, 19, 40, 1)" variant="h2">
            {subTitle}
          </Typography>

          <Box
            component="div"
            dangerouslySetInnerHTML={{ __html: content }}
            sx={{
              "& p": {
                marginBottom: 2,
                typography:"body1 ",
              },
              "& strong": {

                typography: "h4",
              },
              "& h3": { 
                typography: "h4 ",
              },
              color: "rgba(45, 55, 72, 1)",
            }}
          />
        </Stack> 
        <Stack>
          <img
            src={imageUrl}
            alt={subTitle}
            style={{  
              width: "100%",
              maxWidth: 505,
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          {images.length > 0 && <AreasOfSubImages images={images} />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PageSectionCard;
