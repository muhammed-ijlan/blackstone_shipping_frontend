import { Container, Stack } from '@mui/material'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const BannerBottom: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{my:10}}>
      {children}
    </Container>
  );
};

export default BannerBottom 