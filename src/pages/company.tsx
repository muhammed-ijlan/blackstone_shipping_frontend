import { useQuery } from "@apollo/client";
import React from "react";
import Banner from "src/components/banner/Banner";
import BannerBottom from "src/components/banner/BannerBottom";
import {
  GET_COMPANY_ABOUT,
  GET_COMPANY_BANNER,
  GET_COMPANY_HISTORY,
} from "src/graphql/queries";
import ConnectingWorld from "src/sections/company/ConnectingWorld";
import History from "src/sections/company/History";
import {
  GetCompanyAboutResponse,
  GetCompanyHistoryResponse,
  GetCompanyPageResponse,
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

  return (
    <>
      {companyBannerData && <Banner data={companyBannerData} />}
      <BannerBottom>
        {aboutData && <ConnectingWorld data={aboutData} />}
      </BannerBottom>
      {companyHistoryData && <History data={companyHistoryData} />}
    </>
  );
};

export default Page;
