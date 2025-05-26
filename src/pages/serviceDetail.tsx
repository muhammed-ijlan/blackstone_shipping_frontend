import { useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router';
import Banner from 'src/components/banner/Banner';
import ContactUsCard from 'src/components/ContactUsCard';
import { GET_SERVICE_WITH_SUBSERVICES } from 'src/graphql/queries';
import OtherServices from 'src/sections/services/OtherServices';
import OtherTopics from 'src/sections/services/OtherTopics';
import { ServiceData } from 'src/types/graphql/types/services.types';

const Page = () => {
  const {serviceId } = useParams();
  const { data, loading, error } = useQuery<ServiceData>(GET_SERVICE_WITH_SUBSERVICES, {
    variables: {
      id: serviceId,
    },
  });

  return (
    <>
    {
      data &&
      <>

    <Banner bgUrl={data?.service.servicesPageBannerSection.bannerImage.node.sourceUrl} mainTitle={data?.service.servicesPageBannerSection.bannerTitle} subTitle={true} />
    <OtherServices data={data.subServices.nodes}/>
    <ContactUsCard/>
    <OtherTopics data={data?.service.servicePageOtherTopicsSection} />
      </>
    }
    </>
  )
}

export default Page