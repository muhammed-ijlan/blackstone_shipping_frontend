import { useQuery } from "@apollo/client";
import React from "react";
import Banner from "src/components/banner/Banner";
import BannerBottom from "src/components/banner/BannerBottom";
import LoadingFallback from "src/components/LoadingFallback";
import {
  GET_COMPANY_ABOUT,
  GET_COMPANY_BANNER,
  GET_COMPANY_CERTIFICATION,
  GET_COMPANY_GLOBAL_NETWORK,
  GET_COMPANY_HISTORY,
  GET_COMPANY_KEY_FACTS,
  GET_COMPANY_OUR_VALUES,
  GET_COMPANY_SIMPLIFY_SHIPPING,
  GET_COMPANY_VISION,
  GET_COMPANY_WHO_WE_ARE,
} from "src/graphql/queries";
import Certification from "src/sections/company/Certification";
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
  GetCompanyCertificationsResponse,
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
  const { data: companyBannerData, loading: companyBannerLoading } =
    useQuery<GetCompanyPageResponse>(GET_COMPANY_BANNER);

  const { data: aboutData, loading: aboutLoading } =
    useQuery<GetCompanyAboutResponse>(GET_COMPANY_ABOUT);

  const { data: companyHistoryData, loading: historyLoading } =
    useQuery<GetCompanyHistoryResponse>(GET_COMPANY_HISTORY);

  const { data: visionData, loading: visionLoading } =
    useQuery<GetCompanyVisionResponse>(GET_COMPANY_VISION);

  const { data: simplifyShippingData, loading: simplifyShippingLoading } =
    useQuery<GetCompanyShippingResponse>(GET_COMPANY_SIMPLIFY_SHIPPING);

  const { data: whoWeAreData, loading: whoWeAreLoading } =
    useQuery<GetCompanyWhoWeAreResponse>(GET_COMPANY_WHO_WE_ARE);

  const { data: ourValueData, loading: ourValueLoading } =
    useQuery<OurValuesSectionData>(GET_COMPANY_OUR_VALUES);

  const { data: keyFactsData, loading: keyFactsLoading } =
    useQuery<GetCompanyKeyFactsResponse>(GET_COMPANY_KEY_FACTS);

  const { data: ourNetworkData, loading: ourNetworkLoading } =
    useQuery<GetCompanyGlobalNetworkResponse>(GET_COMPANY_GLOBAL_NETWORK);

  const { data: ourCertificationData, loading: ourCertificationLoading } =
    useQuery<GetCompanyCertificationsResponse>(GET_COMPANY_CERTIFICATION);

  return (
    <>
      {companyBannerLoading ? (
        <LoadingFallback />
      ) : (
        companyBannerData && (
          <Banner
            bgUrl={
              companyBannerData.page.companyPageBannerSection.bannerImage.node
                .sourceUrl
            }
            mainTitle={
              companyBannerData.page.companyPageBannerSection.bannerTitle
            }
          />
        )
      )}

      <BannerBottom>
        {aboutLoading ? (
          <LoadingFallback />
        ) : (
          aboutData && <ConnectingWorld data={aboutData} />
        )}
      </BannerBottom>

      {historyLoading ? (
        <LoadingFallback />
      ) : (
        companyHistoryData && <History data={companyHistoryData} />
      )}

      {visionLoading ? (
        <LoadingFallback />
      ) : (
        visionData && <Vision data={visionData} />
      )}

      {simplifyShippingLoading ? (
        <LoadingFallback />
      ) : (
        simplifyShippingData && <SimplifyShipping data={simplifyShippingData} />
      )}

      {whoWeAreLoading ? (
        <LoadingFallback />
      ) : (
        whoWeAreData && <WhoWeAre data={whoWeAreData} />
      )}

      {ourValueLoading ? (
        <LoadingFallback />
      ) : (
        ourValueData && <OurValues data={ourValueData} />
      )}

      {keyFactsLoading ? (
        <LoadingFallback />
      ) : (
        keyFactsData && <KeyFacts data={keyFactsData} />
      )}

      {ourNetworkLoading ? (
        <LoadingFallback />
      ) : (
        ourNetworkData && <OurNetwork data={ourNetworkData} />
      )}

      {ourCertificationLoading ? (
        <LoadingFallback />
      ) : (
        ourCertificationData && <Certification data={ourCertificationData} />
      )}
    </>
  );
};

export default Page;
