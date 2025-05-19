import { useQuery } from "@apollo/client";
import React from "react";
import Banner from "src/components/banner/Banner";
import BannerBottom from "src/components/banner/BannerBottom";
import {
  GET_COMPANY_ABOUT,
  GET_COMPANY_BANNER,
  GET_COMPANY_GLOBAL_NETWORK,
  GET_COMPANY_HISTORY,
  GET_COMPANY_KEY_FACTS,
  GET_COMPANY_OUR_VALUES,
  GET_COMPANY_SIMPLIFY_SHIPPING,
  GET_COMPANY_VISION,
  GET_COMPANY_WHO_WE_ARE,
} from "src/graphql/queries";
import ConnectingWorld from "src/sections/company/ConnectingWorld";
import History from "src/sections/company/History";
import KeyFacts from "src/sections/company/KeyFacts";
import OurNetwork from "src/sections/company/OurNetwork";
import OurValues from "src/sections/company/OurValues";
import SimplifyShipping from "src/sections/company/SimplifyShipping";
import Vision from "src/sections/company/Vision";
import WhoWeAre from "src/sections/company/WhoWeAre";
import {
  GetCompanyAboutResponse,
  GetCompanyGlobalNetworkResponse,
  GetCompanyHistoryResponse,
  GetCompanyKeyFactsResponse,
  GetCompanyPageResponse,
  GetCompanyShippingResponse,
  GetCompanyVisionResponse,
  GetCompanyWhoWeAreResponse,
  OurValuesSectionData,
} from "src/types/graphql/types/company.types";

const Page = () => {
  const {
    data: companyBannerData,
    error: companyBannerError,
    loading: companyBannerLoading,
  } = useQuery<GetCompanyPageResponse>(GET_COMPANY_BANNER);
  const {
    data: aboutData,
    loading: aboutLoading,
    error: aboutError,
  } = useQuery<GetCompanyAboutResponse>(GET_COMPANY_ABOUT);

  const { data: companyHistoryData } =
    useQuery<GetCompanyHistoryResponse>(GET_COMPANY_HISTORY);

  const {
    data: visionData,
    loading: visionLoading,
    error: visionError,
  } = useQuery<GetCompanyVisionResponse>(GET_COMPANY_VISION);

  const {
    data: simplifyShippingData,
  } = useQuery<GetCompanyShippingResponse>(GET_COMPANY_SIMPLIFY_SHIPPING);

  const {
    data:whoWeAreData 
  } = useQuery<GetCompanyWhoWeAreResponse>(GET_COMPANY_WHO_WE_ARE)
  const {
    data:ourValueData 
  } = useQuery<OurValuesSectionData>(GET_COMPANY_OUR_VALUES)
  const {
    data:keyFactsData 
  } = useQuery<GetCompanyKeyFactsResponse>(GET_COMPANY_KEY_FACTS)
  const {
    data:ourNetworkData 
  } = useQuery<GetCompanyGlobalNetworkResponse>(GET_COMPANY_GLOBAL_NETWORK)

  return (
    <>
      {companyBannerData && <Banner data={companyBannerData} />}
      <BannerBottom>
        {aboutData && <ConnectingWorld data={aboutData} />}
      </BannerBottom>
      {companyHistoryData && <History data={companyHistoryData} />}
      {visionData && (
        <Vision 
          data={visionData}/>
      )}
    {simplifyShippingData && (<SimplifyShipping data={simplifyShippingData}/>)}
    {whoWeAreData&&(<WhoWeAre data={whoWeAreData}/>) }
    {ourValueData && <OurValues data={ourValueData} />}
    {keyFactsData && <KeyFacts data={keyFactsData}/>}
    {ourNetworkData && <OurNetwork data={ourNetworkData}/>}
    </>
  );
};

export default Page;
