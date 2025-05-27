import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { SubService } from 'src/types/graphql/types/services.types'

const OtherServiceCard = ({data}:{data:SubService}) => {
  return (
    <Stack gap={2}>
        <Box
          component={"img"}
          src={data.featuredImage.node.sourceUrl}
          alt={data.title}
          sx={{
            width: "100%",
            height: "262px !important",
            objectFit: "cover",
            borderRadius: "8px 8px 0px 0px",
          }}/>
       <Typography variant='h4'>
        {data.title.toUpperCase()}
       </Typography>
       <Box
  sx={{
    '& ul': {
      paddingLeft: '1.5rem',
      marginTop: '0.5rem',
      marginBottom: '1rem',
    },
    '& li': {
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      lineHeight: 1.6,
    },
    '& p': {
      marginBottom: '1rem',
      fontSize: '0.95rem',
    },
  }}
>
  <Typography
    variant="body2"
    component="div"
    dangerouslySetInnerHTML={{ __html: data.content }}
  />
</Box>
    </Stack>
  )
}

export default OtherServiceCard