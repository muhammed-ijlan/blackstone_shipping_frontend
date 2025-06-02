import { Box, Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import {  CaseStudiesData, CaseStudyData, GetPostDetailsByIDData, GetRelatedPostsByIDData, GetRelatedPostsByIDVariables } from 'src/types/graphql/types/resourses.types'
import {capitalCase} from "change-case"
import { useQuery } from '@apollo/client'
import { GET_RELATED_POSTS_BY_ID } from 'src/graphql/queries'
import { useParams } from 'react-router'
import MoreNews from 'src/components/resourses/MoreNews'

const CaseStudyDetail = ({data}:{data:CaseStudyData}) => {

  return (
    <Stack gap={2}>
        <Stack direction={"row"}>
        <Typography color='rgba(109, 110, 113, 1)'>Resourses / &nbsp;</Typography>
        <Typography>Case Study</Typography>
        </Stack>
        <Stack gap={1}>
          <Box component={"img"} src={data.caseStudy.featuredImage?.node.sourceUrl} sx={{width:"100%",height:"595px",objectFit:"cover"}}/>
          <Typography sx={{textTransform:"unset !important",fontWeight:"600 !important"}} variant='h1' color='rgba(45, 55, 72, 1)'>{capitalCase(data?.caseStudy?.title.toLowerCase() ?? '')}</Typography>
          <Box component={"div"} dangerouslySetInnerHTML={{__html: data.caseStudy?.content ?? ''}}/>

          <Stack>
            <Typography></Typography>
          </Stack>
        </Stack>
      
    </Stack>
  )
}

export default CaseStudyDetail
