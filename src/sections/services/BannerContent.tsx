import { Container, Typography } from '@mui/material'
import React from 'react'

const BannerContent = ({content}:{content:string;}) => {
  return (
    <Container maxWidth="xl" sx={{my:3}}>
        <Typography variant='h3'sx={{textTransform:"capitalize !important",color:"rgba(45, 55, 72, 1) !important"}}   dangerouslySetInnerHTML={{__html: content}}></Typography>
    </Container>
  )
}

export default BannerContent