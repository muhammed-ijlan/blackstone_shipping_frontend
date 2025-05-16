import { Container, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { GetCompanyHistoryResponse } from 'src/types/graphql/types/company.types'

const History = ({data}:{data:GetCompanyHistoryResponse}) => {
  return (
   <Container maxWidth={"xl"} sx={{ pb:5 }}>
        <Stack gap={3}>
            <Typography variant='h2'>{data.page.companyPageHistorySection.historySectionMainTitle}</Typography>
            <Divider />
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"flex-start"} sx={{ mt: 1 }} >
                <Typography flex={0.4} variant='h3'pt={2}>{data.page.companyPageHistorySection.historySectionSubTitle}</Typography>
                <p style={{ flex: 1, textAlign: "justify" }}
                  dangerouslySetInnerHTML={{
                    __html: data.page.companyPageHistorySection.historySectionContent
                  }}
                />
            </Stack>
        </Stack>
   </Container>
  )
}

export default History