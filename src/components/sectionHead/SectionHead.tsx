import { Stack, Typography } from '@mui/material'
import React from 'react'

const SectionHead = () => {
    return (
        <Stack gap={3}>
            <Typography variant='h3' fontWeight={600} color='rgba(45, 55, 72, 1)'>{"What We Offer".toUpperCase()}</Typography>
            <Typography maxWidth={900} variant='h2' fontWeight={600} color="rgba(45, 55, 72, 1)">A Complete Suite of Logistics, Freight, and Supply Chain Solutions, Customized to Meet Global Business Needs 
            </Typography>
        </Stack>
    )
}

export default SectionHead