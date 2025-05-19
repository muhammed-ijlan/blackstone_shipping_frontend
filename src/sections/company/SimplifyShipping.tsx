import { Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SimplifyCard from 'src/components/company/SimplifyCard'
import { GetCompanyShippingResponse } from 'src/types/graphql/types/company.types'

const SimplifyShipping = ({data}:{data:GetCompanyShippingResponse}) => {
  return (
    <Container maxWidth="xl" sx={{my:10}}>
<Stack gap={4}>
    <Typography variant='h3'>{data.page.companyPageSimply.simplifyShippingTitle}</Typography>
    <Grid container justifyContent={"space-between"} spacing={5}>
        {
            data.shippingMethods.nodes.map((method, index) => (
                <Grid key={index} size={{xs:4}}>
                    <SimplifyCard method={method} />
                </Grid>
            ))
        }
    </Grid>
</Stack>
    </Container>
  )
}

export default SimplifyShipping