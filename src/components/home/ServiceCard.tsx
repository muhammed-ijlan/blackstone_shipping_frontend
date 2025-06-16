import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import icon1 from "src/assets/icons/icon1.png";

const ServiceCard = ({
  item,
}: {
  item: { title: string; image: string; link: string };
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Stack
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        border: "1px solid rgba(45, 55, 72, 1)",
        width: "295px",
        height: "100%",
        borderRadius: "8px",
        p: 3,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "rgba(45, 55, 72, 1)",
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
            color: hovered ? "rgba(45, 55, 72, 1)" : "white",
            transition: hovered
              ? "color 0.8s ease-in-out, text-decoration-color 0.3s ease-in-out 0.3s"
              : "color 0.8s ease-in-out, text-decoration-color 0.3s ease-in-out",

            textDecoration: "underline",
            textDecorationColor: hovered
              ? "rgba(45, 55, 72, 1)"
              : "transparent",

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "wrap",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "32px",
            letterSpacing: "3%",
            textTransform: "capitalize",
            textAlign:"left",
            typography:{xs:"h4",lg:"h5"}
          }}
        >
          {item.title}
        </Typography>
        <Box
          component={"img"}
          src={icon1}
          width="40px"
          height={"40px"}
          sx={{ background: "rgba(45, 55, 72, 1)", borderRadius: "50%" }}
        />
      </Stack>

      <Stack width={"100%"} sx={{ position: "relative", zIndex: 1 }} mt={3}>
        <Box
          component={"img"}
          src={item.image}
          width={"100%"}
          height={"255px"}
          sx={{ objectFit: "cover" }}
          borderRadius={"4px"}
        />
      </Stack>
    </Stack>
  );
};

export default ServiceCard;
