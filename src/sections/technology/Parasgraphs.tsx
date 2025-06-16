import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { TechnologyData } from 'src/types/graphql/types/technology.types'

const Parasgraphs = ({data}:{data:TechnologyData}) => {
  return (
    <Stack sx={{my:5}}>
        <Typography variant='h1'sx={{textTransform:"capitalize !important"}}>{data.technology.title} : {data.technology.technologySinglePageOptions?.subTitle}</Typography>
       <Box component={"div"} dangerouslySetInnerHTML={{__html:data.technology.content}}/>
    </Stack>
  )
}

export default Parasgraphs