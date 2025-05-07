import React from 'react'
import { Stack } from '@mui/material'
import bannerImage from 'src/assets/images/container.png'

const HomeBanner = () => {
  return (
    <Stack sx={{
      backgroundImage: `url(${bannerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '2rem',
    }}>


      test
    </Stack>
  )
}

export default HomeBanner