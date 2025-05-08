import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import CustomSlider from 'src/components/customSlider/CustomSlider'
import SectionHead from 'src/components/sectionHead/SectionHead'

import offer1 from "src/assets/images/work.jpg"

const WhatWeOffer = () => {
  const offers = [
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
    {
      title:"Freight Forwarding",
      image:offer1
    },
  ]
  return (
    <Container maxWidth="lg" sx={{ padding: '3rem 0' }}> 
  <SectionHead/>
  <CustomSlider >
    {
      offers.map((card,index) =>(
        <Stack width={"500px"} position={"relative"} sx={{
          minWidth: "400px",
          maxWidth: "400px",
          borderRadius: "5px",
          mb: 3,
          height: "auto"
      }}>
          <Typography bottom={40} left={40} color='white' variant='h4' fontWeight={600} position={"absolute"}>{card.title}</Typography>
          <Box component={"img"} src={card.image} width={"100%"} borderRadius={"7px"}/>
        </Stack>
      ))
    }
  </CustomSlider>
    </Container>
  )
}

export default WhatWeOffer