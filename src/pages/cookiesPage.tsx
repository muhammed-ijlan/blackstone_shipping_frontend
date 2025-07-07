import { Box, Container } from '@mui/material'
import React from 'react'
import cookiesContent from 'src/sections/termsContent/cookiesContent'

const Page = () => {
  return (
    <Container maxWidth="xl" sx={{my:3}}>
     <Box component={"div"} dangerouslySetInnerHTML={{__html:cookiesContent}}/>
    </Container>
  )
}

export default Page