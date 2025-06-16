import { Stack, Typography } from '@mui/material'
import React from 'react'
import OpenedJobs from 'src/components/careers/OpenedJobs'
import { GetCareersPageData } from 'src/types/graphql/types/careers.types'

const OpenPositions = ({data}:{data:GetCareersPageData}) => {

  return (
   <Stack gap={2} my={3}>
    <Typography variant='h2' color="rgba(45, 55, 72, 1)">{data.page.careersPageFind.openPositionTitle}</Typography>
    <OpenedJobs data={data}/>
   </Stack>
  )
}

export default OpenPositions