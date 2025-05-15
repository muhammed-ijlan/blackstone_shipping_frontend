import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from './iconify'
import { useRouter } from 'src/routes/hooks'

type CustomArrowButtonProps = {
  name: string;
  onClick?: () => void;
};

const CustomArrowButton: React.FC<CustomArrowButtonProps> = ({ name, onClick }) => {
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
        borderColor: "rgba(14, 159, 110, 1)",
        borderRadius: "4px",
        color: "black",
        py: "10px",
        px: "24px"
      }}
    >
      <Stack gap={1} direction="row" alignItems="center">
        <Typography variant="body1" fontWeight={700} color="black">
          {name}
        </Typography>
        <Iconify icon="iconamoon:arrow-top-right-1-light" color="rgba(14, 159, 110, 1)" width={"25px"} />
      </Stack>
    </Button>
  );
};

export default CustomArrowButton