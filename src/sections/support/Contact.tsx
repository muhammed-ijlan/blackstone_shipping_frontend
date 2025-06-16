import { Stack, Typography } from '@mui/material'
import React from 'react'
import { CountryPageData } from 'src/types/graphql/types/support.types'

const Contact = ({data}:{data:CountryPageData}) => {
  return (
    <Stack gap={2} sx={{background:"rgba(45, 55, 72, 1)",borderRadius:"8px",padding:3,marginTop:"20px",}}>
        <Typography sx={{textAlign:"left !important"}} variant='h2'color='rgba(255, 255, 255, 0.6)'>
            Contact
        </Typography>

         <Stack direction={"row"} gap={2} flexWrap={"wrap"} >
            <Stack flex={1} sx={{bgcolor:"rgba(255, 255, 255, 1)",borderRadius:"8px",padding:2}} gap={1}>
                    <Typography variant='body1' sx={{textDecoration:"underline !important"}}>Address</Typography>
                    <Typography variant='h4' color="rgba(45, 55, 72, 1)">
                        {data.country.countriesOptions?.countryMainAddress}
                    </Typography>
            </Stack>
            <Stack gap={2} flex={1}>
                   <Stack sx={{bgcolor:"rgba(255, 255, 255, 1)",borderRadius:"8px",padding:2}} gap={1}>
                    <Typography variant='body1' sx={{textDecoration:"underline !important"}}>Email</Typography>
                    <Typography variant='h4' color="rgba(45, 55, 72, 1)">
                        {data.country.countriesOptions?.countryMainEmailAddress}    
                    </Typography>
                   </Stack>
                   <Stack sx={{bgcolor:"rgba(255, 255, 255, 1)",borderRadius:"8px",padding:2}} gap={1}>
                    <Typography variant='body1' sx={{textDecoration:"underline !important"}}>Phone Number</Typography>
                    <Typography variant='h4' color="rgba(45, 55, 72, 1)">
                        {data.country.countriesOptions?.countryMainPhoneNumber}    
                    </Typography>
                   </Stack>
                  
            </Stack>
         </Stack>
    </Stack>
  )
}

export default Contact