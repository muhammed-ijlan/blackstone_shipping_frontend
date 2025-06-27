import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { SupportPageData } from 'src/types/graphql/types/support.types'

const SupportBannerContent = ({data}:{data:SupportPageData}) => {
  return (
    <Stack direction={{xs:"column",md:"row"}} gap={3} sx={{alignItems:"center"}} textAlign={"left"}>
        <Stack width={"100%"}>
            <Typography variant='h1' sx={{textTransform:"capitalize !important",textAlign:"left !important"}}  color="rgba(45, 55, 72, 1)">{data.page.supportPageContentSection.mainTitle.split("<br/>")[0]}</Typography>
            <Typography variant='h1' sx={{textTransform:"capitalize !important",textAlign:"left !important"}} color="rgba(45, 55, 72, 1)">{data.page.supportPageContentSection.mainTitle.split("<br/>")[1]}</Typography>
            <Box component={"div"} sx={{
              typography:"h4"
            }} dangerouslySetInnerHTML={{__html:data.page.supportPageContentSection.content}}/>
        </Stack>
        <Box width={"100%"} component={"img"} sx={{maxWidth:"450px",borderRadius:"8px",objectFit:"cover"}} src={data.page.supportPageContentSection.image.node.sourceUrl}/>
    </Stack>
  )
}

export default SupportBannerContent 