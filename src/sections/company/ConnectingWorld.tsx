import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { GetCompanyAboutResponse } from 'src/types/graphql/types/company.types'


const ConnectingWorld = ({data}:{data:GetCompanyAboutResponse}) => {
  return (
    <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}  >
        <Box component={"img"} alt='about' width={"402px"} borderRadius={"8px"} height={"421px"} src={data.page.companyPageAboutSection.aboutUsImage.node.sourceUrl}/>
        <Stack spacing={4} sx={{ maxWidth: "62%" }} >
          <Typography variant='h2'>{data.page.companyPageAboutSection.aboutUsTitle}</Typography>
          <Typography variant='body1'>{data.page.companyPageAboutSection.aboutUsContent}</Typography>
            </Stack>
    </Stack>
  )
}

export default ConnectingWorld