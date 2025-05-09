import React from 'react'
import HomeBanner from 'src/components/home/homeBanner'
import Contact from 'src/sections/home/Contact'
import IndustryCoverage from 'src/sections/home/IndustryCoverage'
import Serivces from 'src/sections/home/Serivces'
import Sustainablity from 'src/sections/home/Sustainablity'
import Testimonial from 'src/sections/home/Testimonial'
import WhatWeOffer from 'src/sections/home/WhatWeOffer'

const Page = () => {
  return (
    <div>
      <HomeBanner/>
      <WhatWeOffer/>
      <IndustryCoverage/>
      <Serivces/>
      <Sustainablity/>
      <Testimonial/>
      <Contact/>
    </div>
  )
}

export default Page 