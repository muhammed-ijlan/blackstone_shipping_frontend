import { Box, Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import {  GetPostDetailsByIDData, GetRelatedPostsByIDData, GetRelatedPostsByIDVariables } from 'src/types/graphql/types/resourses.types'
import {capitalCase} from "change-case"
import { useQuery } from '@apollo/client'
import { GET_RELATED_POSTS_BY_ID } from 'src/graphql/queries'
import { useParams } from 'react-router'
import MoreNews from 'src/components/resourses/MoreNews'

const NewsDetail = ({data}:{data:GetPostDetailsByIDData}) => {

  const { postId} = useParams();

   const { data:morePostData, loading, error } = useQuery<GetRelatedPostsByIDData, GetRelatedPostsByIDVariables>(
    GET_RELATED_POSTS_BY_ID,
    {
      variables: {
        categorySlug: data.post?.categories.nodes[0].slug ?? "",
        excludePostId: postId ?? '',
      },
    }
  );

  return (
    <Stack gap={2}>
        <Stack direction={"row"}>
        <Typography color='rgba(109, 110, 113, 1)'>Resourses / &nbsp;</Typography>
        <Typography>{data.post?.categories.nodes[0].name}</Typography>
        </Stack>
        <Stack gap={1}>
          <Box component={"img"} src={data.post?.featuredImage?.node?.sourceUrl} sx={{width:"100%",height:"595px",objectFit:"cover"}}/>
          <Typography color='rgba(109, 110, 113, 1)'>{moment(data.post?.date).format("DD MMMM yyyy")}</Typography>
          <Typography sx={{textTransform:"unset !important",fontWeight:"600 !important"}} variant='h1' color='rgba(45, 55, 72, 1)'>{capitalCase(data?.post?.title.toLowerCase() ?? '')}</Typography>
          <Box component={"div"} dangerouslySetInnerHTML={{__html: data.post?.content ?? ''}}/>
        </Stack>
          <Stack gap={3}>
            <Divider/>
           {morePostData && <MoreNews data={morePostData}/>}  
            <Divider/>
          </Stack>
    </Stack>
  )
}

export default NewsDetail