import { Container, Divider, Typography } from '@mui/material'
import React from 'react'

const BannerContent = ({ content }: { content: string; }) => {
  const cleanedContent = content
    .replace(/\n/g, "")
    .replace(/<p>&nbsp;<\/p>/g, "");
  return (
    <Container maxWidth="xl" sx={{ my: 5 }} >
      <Typography
        sx={{
          color: "rgba(45, 55, 72, 1) !important",
          fontWeight: "500 !important",
          typography: "h3",
          "& h3": { my: "10px !important" },
          "& p": {
            my: "10px !important",
            typography: "h4",
            fontWeight: 500,
            "& strong": { my: "10px !important", },
          },
          mb: 5,
        }}
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
      />
      <Divider />
    </Container>
  )
}

export default BannerContent