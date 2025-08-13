import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import Banner from "src/components/banner/Banner";
import ContactUsCard from "src/components/ContactUsCard";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_SERVICE_WITH_SUBSERVICES } from "src/graphql/queries";
import BannerContent from "src/sections/services/BannerContent";
import OtherServices from "src/sections/services/OtherServices";
import OtherTopics from "src/sections/services/OtherTopics";
import { GetServiceWithSubServicesData } from "src/types/graphql/types/services.types";

const Page = () => {
  const { serviceId } = useParams();
  const { data, loading, error } = useQuery<GetServiceWithSubServicesData>(
    GET_SERVICE_WITH_SUBSERVICES,
    {
      variables: {
        uri: `service/${serviceId}`,
      },
    }
  );

  if (loading) return <LoadingFallback />;

  return (
    <>
      {data && (
        <>
          <Banner
            bgUrl={
              data?.service?.servicesPageBannerSection.bannerImage.node
                .sourceUrl
            }
            mainTitle={data?.service?.servicesPageBannerSection.bannerTitle}
            subTitle={"Services"}
          />
           <BannerContent
            content={data?.service?.content}
          />
          <OtherServices data={data?.service.children.nodes}  />
          <ContactUsCard />
          <OtherTopics data={data?.service?.servicePageOtherTopicsSection} />
        </>
      )}
    </>
  );
};

export default Page;
