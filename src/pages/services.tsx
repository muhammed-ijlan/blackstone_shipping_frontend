import { useQuery } from "@apollo/client";
import React from "react";
import Banner from "src/components/banner/Banner";
import { GET_SERVICES_PAGE } from "src/graphql/queries";
import BannerContent from "src/sections/services/BannerContent";
import OtherTopics from "src/sections/services/OtherTopics";
import ServiceCards from "src/sections/services/ServiceCards";
import { GetServicePageData } from "src/types/graphql/types/services.types";

const Page = () => {
  const {
    data: serviceData,
    loading: serviceLoading,
    error: serviceError,
  } = useQuery<GetServicePageData>(GET_SERVICES_PAGE);
  return (
    <>
      {serviceData && (
        <>
          <Banner
            bgUrl={
              serviceData?.page?.servicesPageBannerSection?.bannerImage?.node
                ?.sourceUrl
            }
            mainTitle={
              serviceData?.page?.servicesPageBannerSection?.bannerTitle
            }
          />
          <BannerContent content={serviceData?.page?.servicesPageBannerSection?.pageContent} />
          <ServiceCards data={serviceData?.services.nodes}/>
          <OtherTopics data={serviceData.page.servicePageOtherTopicsSection}/>
        </>
      )}
    </>
  );
};

export default Page;
