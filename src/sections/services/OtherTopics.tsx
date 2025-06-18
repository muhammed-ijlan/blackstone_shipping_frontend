import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'src/routes/hooks'
import { OtherTopicsSection } from 'src/types/graphql/types/services.types'

const OtherTopics = ({data}:{data:OtherTopicsSection}) => {
    const router = useRouter();
  return (
    <Container maxWidth="xl" sx={{my:5}}>
        <Stack gap={4}>
            <Typography variant='h2' >
                {data?.otherTopicsMainTitle}
            </Typography>

            <Grid container size={{xs:12,lg:4}} spacing={3} justifyContent={"space-between"}>
                <Grid  width={"380px"}>
                    <Stack gap={1}  sx={{cursor:"pointer"}} onClick={()=>router.push(data.topic1Link.nodes[0].uri)}>
                    <Stack sx={{p:"10px", width:"100%",height:"400px",border:"1px solid rgba(45, 55, 72, 1)",borderRadius:"8px"}}>
                        <Box component={"img"} src={data.topic1Image.node.sourceUrl} alt={"picture"} width="100%" height={"100%"} sx={{objectFit:"cover",borderRadius:"4px"}}/>
                    </Stack>
                    <Typography p={"10px"} variant='h4' sx={{fontWeight:"700",color:"rgba(45, 55, 72, 1)"}}>{data.topic1Title}</Typography>
                    </Stack>
                </Grid>
                <Grid  width={"380px"}>
                    <Stack gap={1} sx={{cursor:"pointer"}} onClick={()=>router.push(data.topic2Link.nodes[0].uri)}>
                    <Stack sx={{p:"10px", width:"100%",height:"400px",border:"1px solid rgba(45, 55, 72, 1)",borderRadius:"8px"}}>
                        <Box component={"img"} src={data.topic2Image.node.sourceUrl} alt={"picture"} width="100%" height={"100%"} sx={{objectFit:"cover",borderRadius:"4px"}}/>
                    </Stack>
                    <Typography p={"10px"} variant='h4' sx={{fontWeight:"700",color:"rgba(45, 55, 72, 1)"}}>{data.topic2Title}</Typography>
                    </Stack>
                </Grid>
                <Grid  width={"380px"}>
                    <Stack gap={1} sx={{cursor:"pointer"}} onClick={()=>router.push(data.topic2Link.nodes[0].uri)}>
                    <Stack sx={{p:"10px", width:"100%",height:"400px",border:"1px solid rgba(45, 55, 72, 1)",borderRadius:"8px"}}>
                        <Box component={"img"} src={data.topic3Image.node.sourceUrl} alt={"picture"} width="100%" height={"100%"} sx={{objectFit:"cover",borderRadius:"4px"}}/>
                    </Stack>
                    <Typography p={"10px"} variant='h4' sx={{fontWeight:"700",color:"rgba(45, 55, 72, 1)"}}>{data.topic3Title}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    </Container>
  )
}

export default OtherTopics