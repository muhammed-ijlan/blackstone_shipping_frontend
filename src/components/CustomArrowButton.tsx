import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from './iconify'
import { useRouter } from 'src/routes/hooks'
import arrow from "src/assets/icons/arrow.png";

type CustomArrowButtonProps = {
  name: string;
  onClick?: () => void;
  sx?: object;
};

const CustomArrowButton: React.FC<CustomArrowButtonProps> = ({ name, onClick,sx }) => {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(`/${name}`);
  };
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        ...sx,
        alignItems:"center",
        borderColor: "rgba(32, 189, 103, 1)",
        borderRadius: "4px",
        color: "rgba(45, 55, 72, 1)",
      }}
    >
      <Stack gap={1} direction="row" alignItems="center" justifyContent={"center"}>
        <Typography variant="body1" fontSize={"16px"} fontWeight={700} color="rgba(45, 55, 72, 1)" sx={{...sx}}>
          {name}
        </Typography>
        <Box component={"img"} alt='arrow' width={"24px"} height={"24px"} src={arrow} />
      </Stack>
    </Button>
  );
};

export default CustomArrowButton