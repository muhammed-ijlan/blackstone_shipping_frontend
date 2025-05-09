import { Stack, Typography } from '@mui/material'
import React from 'react'

interface SectionHeadProps {
    title: string;
    subTitle?: string;
    color?:string;
}

const SectionHead: React.FC<SectionHeadProps> = ({ title, subTitle ,color = "rgba(33, 52, 72, 1)"}) => {
    return (
        <Stack gap={3} mt={10} >
            <Typography variant='h3' fontWeight={600} color={color}>{title}</Typography>
            <Typography maxWidth={900} variant='h2' fontWeight={600} color={color}>{subTitle}</Typography>
        </Stack>
    )
}

export default SectionHead