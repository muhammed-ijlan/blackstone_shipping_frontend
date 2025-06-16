import { Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import JobCategoryCard from 'src/components/careers/JobCategoryCard'
import { GetCareersPageData } from 'src/types/graphql/types/careers.types'

const AllJobjsSection = ({data}:{data:GetCareersPageData}) => {
  return (
   <Stack gap={4} my={5}>
    <Divider/>
    <Stack gap={3}>
        <Typography variant='h2' sx={{color:"rgba(45, 55, 72, 1)"}}>{data.page.careersPageJobsSection.jobSectionMainTitle}</Typography>
        <Typography variant='h4' sx={{color:"rgba(45, 55, 72, 1)",fontWeight:"700 !important"}}>{data.page.careersPageJobsSection.jobSectionSubTitle}</Typography>

        <Grid container rowGap={4} columnSpacing={4} sx={{mt:2}}>
          {
            data.jobCategories.nodes.map((category,index) =>(
              <Grid size={{xs:12,md:3}}>
              <JobCategoryCard data={category}/>
              </Grid>
            ))
          }
        </Grid>

        <Typography variant='h4' sx={{color:"rgba(11, 19, 40, 0.5)",fontWeight:"700 !important"}}>{data.page.careersPageJobsSection.jobSectionBottomContent}</Typography>
    </Stack>
    <Divider/>
   </Stack>
  )
}

export default AllJobjsSection