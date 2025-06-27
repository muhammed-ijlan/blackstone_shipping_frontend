import { Container, Typography } from '@mui/material'
import React from 'react'

const BannerContent = ({content}:{content:string;}) => {
  return (
    <Container maxWidth="xl" sx={{my:5}}>
        <Typography variant='h3'sx={{textTransform:"capitalize !important",color:"rgba(45, 55, 72, 1) !important",fontWeight:"500 !important" ,"& p":{
          margin:"0 !important"
        }}}   dangerouslySetInnerHTML={{__html: content}} />
    </Container>
  )
}

export default BannerContent