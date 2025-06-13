import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import SupportForm from 'src/components/support/SupportForm'

const SupportFormSection = () => {
  return (
    <Stack py={5} gap={2}>
        <Typography variant='h2'>Contact Form</Typography>
        <Typography color='rgba(45, 55, 72, 1)' variant='h4' sx={{textTransform:"capitalize !important"}}>Choose Enquiry Type</Typography>
        <SupportForm/>
    </Stack>
  )
}

export default SupportFormSection