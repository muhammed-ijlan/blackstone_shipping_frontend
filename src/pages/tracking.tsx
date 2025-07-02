import { Container } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import bannerImg from "src/assets/images/trackBanner.png";
// import TrackingSection from "src/sections/tracking/TrackingSection";

const Page = () => {
  return (
    <>
      <Banner mainTitle="tracking" bgUrl={bannerImg} />
      {/* <TrackingSection /> */}
    </>
  );
};

export default Page;
