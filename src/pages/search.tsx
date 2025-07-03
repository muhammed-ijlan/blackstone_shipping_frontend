import { useQuery } from '@apollo/client';
import { Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GLOBAL_SEARCH } from 'src/graphql/queries';
import SearchSection from 'src/sections/search/SearchSection';
import { GlobalSearchResponse } from 'src/types/graphql/types/common.types';

const Page = () => {


  return (
    <Container maxWidth="xl" sx={{ my: "100px" }}>
     <SearchSection/>
    </Container>
  )
}

export default Page