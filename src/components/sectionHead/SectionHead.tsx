import { Stack, Typography } from "@mui/material";
import React from "react";

interface SectionHeadProps {
  title: string;
  subTitle?: string;
  content?: string;
  titleColor?: string;
  subTitleColor?: string;
  contentColor?: string;
  variant?: "h2" | "h3" | "h4" | "h5" | "h6";
}

const SectionHead: React.FC<SectionHeadProps> = ({
  title,
  subTitle,
  content,
  titleColor = "rgba(33, 52, 72, 1)",
  subTitleColor = "rgba(33, 52, 72, 0.8)",
  contentColor = "rgba(33, 52, 72, 0.6)",
  variant = "h2",
}) => {
  return (
    <Stack gap={3} mt={10} mb={5} textAlign={{ xs: "center", md: "left" }}>
      <Typography
        variant="h6"
        textAlign={{ xs: "center", md: "left" }}
        fontWeight={600}
        color={titleColor}
      >
        {title.toUpperCase()}
      </Typography>

      {subTitle && (
        <Typography
          maxWidth={900}
          variant={variant}
          sx={{
            textTransform:"capitalize !important",
          }}

          fontWeight={600}
          color={subTitleColor}
        >
          {subTitle}
        </Typography>
      )}

      {content && (
        <Typography
          variant="body1"
          maxWidth={900}
          sx={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "28px",
            letterSpacing: "0%",
            textTransform: "capitalize",
          }}
          color={contentColor}
        >
          {content}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionHead;
