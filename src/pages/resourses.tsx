import { useQuery } from '@apollo/client'
import React from 'react'
import Banner from 'src/components/banner/Banner'
import { GET_RESOURSES_PAGE } from 'src/graphql/queries'
import NewsSection from 'src/sections/resourses/NewsSection'
import { ResourcesPageData } from 'src/types/graphql/types/resourses.types'

const Page = () => {
    const {data:pageData,loading:pageLoading,} = useQuery<ResourcesPageData>(GET_RESOURSES_PAGE)
  return (
   <>
   {pageData && (
    <>
   <Banner bgUrl={pageData?.page.resourcesPageBannerSection.bannerImage.node.sourceUrl} mainTitle={pageData?.page.resourcesPageBannerSection.bannerTitle}  />
   <NewsSection data={pageData.page.resourcesPageNewsSection}/>
    </>
   )}
   </>
  )
}

export default Page