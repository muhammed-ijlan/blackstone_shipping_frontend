import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { GetJobPostDetailsResponse } from 'src/types/graphql/types/careers.types'

const JobDetails = ({data}:{data:GetJobPostDetailsResponse}) => {
  return (
    <Stack direction={"row"} gap={4} flexWrap={"wrap"}>
        <Stack width={"100%"} sx={{border:"1px solid rgba(206, 208, 212, 1)", borderRadius:"8px",padding:3}} gap={2}>
            <Typography variant='h3' sx={{textTransform:"uppercase",textDecoration:"underline"}}>Key Responsibilities:</Typography>
           <Box
              component="div"
              sx={{
                "& ul": {
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  margin: 0,
                },
                "& li": {
                  marginBottom: "1em",
                },
                textAlign:"left !important",
                color:"rgba(109, 110, 113, 1)"
              }}
              dangerouslySetInnerHTML={{
                __html: data.jobOpening.jobOpeningsOptions.keyResponsibilities ?? "",
              }}
            />
        </Stack>
        <Stack width={"100%"} sx={{border:"1px solid rgba(206, 208, 212, 1)", borderRadius:"8px",padding:3}} gap={2}>
            <Typography variant='h3' sx={{textTransform:"uppercase",textDecoration:"underline"}}>Requirements:</Typography>
           <Box
              component="div"
              sx={{
                "& ul": {
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  margin: 0,
                },
                "& li": {
                  marginBottom: "1em",
                },
                textAlign:"left !important",
                color:"rgba(109, 110, 113, 1)"
              }}
              dangerouslySetInnerHTML={{
                __html: data.jobOpening.jobOpeningsOptions.requirements ?? "",
              }}
            />
        </Stack>
    </Stack>
  )
}

export default JobDetails