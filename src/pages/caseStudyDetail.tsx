import { useQuery } from '@apollo/client';
import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router';
import { GET_NEWS_DETAIL, GET_SINGLE_CASE_STUDY } from 'src/graphql/queries';
import { usePathname, useRouter } from 'src/routes/hooks';
import CaseStudyDetail from 'src/sections/newsDetails/CaseStudyDetail';
import NewsDetail from 'src/sections/newsDetails/NewsDetail';
import { CaseStudyData, CaseStudyVars, GetPostDetailsByIDData, GetPostDetailsByIDVariables } from 'src/types/graphql/types/resourses.types';

const Page = () => {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useQuery<CaseStudyData, CaseStudyVars>(
      GET_SINGLE_CASE_STUDY,
      {
        skip: !id,
        variables: { id: id ?? '' },
      }
    );
  return (
    <Container maxWidth="xl">
       {data && <CaseStudyDetail data={data}/>} 
    </Container>
  )
}

export default Page