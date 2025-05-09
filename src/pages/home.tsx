import React from 'react'
import HomeBanner from 'src/components/home/homeBanner'
import IndustryCoverage from 'src/sections/home/IndustryCoverage'
import Serivces from 'src/sections/home/Serivces'
import Sustainablity from 'src/sections/home/Sustainablity'
import WhatWeOffer from 'src/sections/home/WhatWeOffer'

const Page = () => {
  return (
    <div>
      <HomeBanner/>
      <WhatWeOffer/>
      <IndustryCoverage/>
      <Serivces/>
      <Sustainablity/>
    </div>
  )
}

export default Page 