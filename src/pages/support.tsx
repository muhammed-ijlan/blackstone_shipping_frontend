import { useQuery } from "@apollo/client";
import { Container, Divider, Stack } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import BannerBottom from "src/components/banner/BannerBottom";
import OfficeLocation from "src/components/support/OfficeLocation";
import {
  GET_COMPANY_GLOBAL_NETWORK,
  GET_OFFICE_LOCATIONS,
  GET_SUPPORT_PAGE,
} from "src/graphql/queries";
import OurNetwork from "src/sections/company/OurNetwork";
import SupportBannerContent from "src/sections/support/SupportBannerContent";
import SupportFormSection from "src/sections/support/SupportFormSection";
import { GetCompanyGlobalNetworkResponse } from "src/types/graphql/types/company.types";
import {
  OfficeLocationsData,
  OfficeLocationsVars,
  SupportPageData,
} from "src/types/graphql/types/support.types";
import Location from "src/components/company/Location";
import LoadingFallback from "src/components/LoadingFallback";
import ScrollToHash from "src/components/ScrollToHash";

const Page = () => {
  const { data, loading } = useQuery<SupportPageData>(GET_SUPPORT_PAGE);
  // const { data:locationData, loading, error, fetchMore } = useQuery<OfficeLocationsData, OfficeLocationsVars>(
  //   GET_OFFICE_LOCATIONS,
  //   {
  //     variables: {
  //       count: 3,
  //       after: null,
  //       search: "",
  //     },
  //   }
  // );

  if (loading) return <LoadingFallback />;

  return (
    <>
      <ScrollToHash deps={[data]} offset={150} />
      {data && (
        <Stack>
          <Banner
            bgUrl={
              data?.page.supportPageBannerSection.bannerImage.node.sourceUrl
            }
            mainTitle={data?.page.supportPageBannerSection.bannerTitle}
          />
          <Container maxWidth="xl">
            <BannerBottom>
              <SupportBannerContent data={data} />
            </BannerBottom>
            <Divider />
            <div id="contactform">
            <SupportFormSection />
            </div>
          </Container>
          <div id="officelocations">
          <OfficeLocation />
          </div>
          <Container maxWidth="xl" sx={{ my: 7 }}>
            <Location  />
          </Container>
        </Stack>
      )}
    </>
  );
};

export default Page;
