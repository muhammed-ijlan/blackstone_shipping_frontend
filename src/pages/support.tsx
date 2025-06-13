import { useQuery } from '@apollo/client'
import { Container, Divider, Stack } from '@mui/material'
import React from 'react'
import Banner from 'src/components/banner/Banner'
import BannerBottom from 'src/components/banner/BannerBottom'
import OfficeLocation from 'src/components/support/OfficeLocation'
import { GET_OFFICE_LOCATIONS, GET_SUPPORT_PAGE } from 'src/graphql/queries'
import SupportBannerContent from 'src/sections/support/SupportBannerContent'
import SupportFormSection from 'src/sections/support/SupportFormSection'
import { OfficeLocationsData, OfficeLocationsVars, SupportPageData } from 'src/types/graphql/types/support.types'

const Page = () => {
  const {data} = useQuery<SupportPageData>(GET_SUPPORT_PAGE);
  const { data:locationData, loading, error, fetchMore } = useQuery<OfficeLocationsData, OfficeLocationsVars>(
    GET_OFFICE_LOCATIONS,
    {
      variables: {
        count: 3,
        after: null,
        search: "",
      },
    }
  );

  return (
    <>
    {data && 
    <Stack>
      <Banner bgUrl={data?.page.supportPageBannerSection.bannerImage.node.sourceUrl} mainTitle={data?.page.supportPageBannerSection.bannerTitle} />
      <Container maxWidth="xl">
      <BannerBottom>
        <SupportBannerContent data={data}/>
      </BannerBottom>
      <Divider/>
      <SupportFormSection/>
      </Container>
       {locationData && <OfficeLocation data={locationData} />}
    </Stack>
    }
    </>
  )
}

export default Page