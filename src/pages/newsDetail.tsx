import { useQuery } from '@apollo/client';
import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router';
import { GET_NEWS_DETAIL } from 'src/graphql/queries';
import { usePathname, useRouter } from 'src/routes/hooks';
import NewsDetail from 'src/sections/newsDetails/NewsDetail';
import { GetPostDetailsByIDData, GetPostDetailsByIDVariables } from 'src/types/graphql/types/resourses.types';

const Page = () => {
    const { postId } = useParams<{ postId: string }>();

    const { data, loading, error } = useQuery<GetPostDetailsByIDData, GetPostDetailsByIDVariables>(
      GET_NEWS_DETAIL,
      {
        skip: !postId,
        variables: { id: postId ?? '' },
      }
    );
  return (
    <Container maxWidth="xl">
       {data && <NewsDetail data={data}/>} 
    </Container>
  )
}

export default Page