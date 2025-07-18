import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import icon1 from "src/assets/icons/icon1.png";
import { useRouter } from "src/routes/hooks";

const ServiceCard = ({
  item,
}: {
  item: { title: string; image: string; link: string };
}) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const isHoverEnabled = theme.breakpoints.values.lg <= window.innerWidth;

  return (
    <Stack
      component={"div"}
      onClick={() => router.push(item.link)}
      onMouseEnter={() => {
        if (window.innerWidth >= theme.breakpoints.values.lg) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= theme.breakpoints.values.lg) {
          setHovered(false);
        }
      }}
      sx={{
        border: "1px solid rgba(45, 55, 72, 1)",
        width: "100%",
        height: { xs: "100%", md: "100%" },
        borderRadius: "8px",
        p: {xs: 2, md: 3},
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "rgba(45, 55, 72, 1)",
        [theme.breakpoints.down("lg")]: {
          transition: "none",
          "&::before": {
            display: "none",
          },
        },
        [theme.breakpoints.up("lg")]: {
          transition: "color 0s ease-in-out",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "300%",
            height: "300%",
            background: "white",
            top: 0,
            left: 0,
            transform: hovered
              ? "translate(-50%, -50%) scale(1)"
              : "translate(60%, -100%) scale(1)",
            transition: "transform 0.7s ease-in-out",
            borderRadius: "50%",
            zIndex: 0,
          },
        },
      }}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ position: "relative", zIndex: 1 }}
        gap={1}
      >
        <Typography
          sx={{
            color: {
              xs: "white",
              lg: hovered ? "rgba(45, 55, 72, 1)" : "white",
            },
            transition: {
              xs: "none",
              lg: hovered
                ? "color 0.8s ease-in-out, text-decoration-color 0.3s ease-in-out 0.3s"
                : "color 0.8s ease-in-out, text-decoration-color 0.3s ease-in-out",
            },
            textDecoration: "underline",
            textDecorationColor: {
              xs: "transparent",
              lg: hovered ? "rgba(45, 55, 72, 1)" : "transparent",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",      
            whiteSpace: "wrap",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "32px",
            letterSpacing: "3%",
            textTransform: "capitalize", 
            textAlign: "left",
            typography: { xs: "h4", lg: "h5" },
          }}
        >
          {item.title} 
        </Typography>
        <Box
          component={"img"}
          src={icon1}
          width="40px"
          height={"40px"}
          sx={{ background: "rgba(45, 55, 72, 1)", borderRadius: "50%", display: { xs: "none", md: "block" } }}
        />
      </Stack>

      <Stack width={"100%"} sx={{ position: "relative", zIndex: 1 }} mt={3}>
        <Box
          component={"img"}
          src={item.image}
          width={"100%"}
          height={{ xs: "150px", md: "255px" }}
          sx={{ objectFit: "cover" }}
          borderRadius={"4px"}
        />
      </Stack>
    </Stack>
  );
};

export default ServiceCard;
