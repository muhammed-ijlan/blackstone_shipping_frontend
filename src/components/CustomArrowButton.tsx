import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import arrow from "src/assets/icons/arrow.png";
import { useRouter } from 'src/routes/hooks';

type CustomArrowButtonProps = {
  name: string;
  onClick?: () => void;
  sx?: object;
};

const CustomArrowButton: React.FC<CustomArrowButtonProps> = ({ name, onClick,sx }) => {
  
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
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderColor: "rgba(32, 189, 103, 1)",
        borderRadius: "4px",
        color: "rgba(45, 55, 72, 1)",
        gap:1
      }}
    >
      {/* <Stack gap={1} direction="row" alignItems="center" justifyContent={"center"}> */}
        <Typography variant="body1" fontSize={"16px"} fontWeight={700} color="rgba(45, 55, 72, 1)" >
          {name}
        </Typography>
        <Box component={"img"} alt='arrow' width={"24px"} height={"24px"} src={arrow} />
      {/* </Stack> */}
    </Button>
  );
};

export default CustomArrowButton