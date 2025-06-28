import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import arrow from "src/assets/icons/arrow.png";

type CustomArrowButtonProps = {
  name: string;
  onClick?: () => void;
  sx?: object;
  textColor?: string;
};

const CustomArrowButton: React.FC<CustomArrowButtonProps> = ({
  name,
  onClick,
  sx,
  textColor,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(32, 189, 103, 1)",
        borderRadius: "4px",
        color: "rgba(45, 55, 72, 1)",
        gap: 1,
      }}
    >
      <Typography
        variant="body1"
        fontSize={"16px"}
        fontWeight={700}
        color={textColor}
      >
        {name}
      </Typography>
      <Box
        component={"img"}
        alt="arrow"
        width={"24px"}
        height={"24px"}
        src={arrow}
      />
    </Button>
  );
};

export default CustomArrowButton;
