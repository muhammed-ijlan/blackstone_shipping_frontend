export interface GetCompanyPageResponse {
  page: {
    companyPageBannerSection: {
      bannerImage: {
        node: {
          sourceUrl: string;
        };
      };
      bannerTitle: string;
    };
  };
};

 export interface GetCompanyAboutResponse {
  page: {
    companyPageAboutSection: {
      aboutUsImage: {
        node: {
          sourceUrl: string;
        };
      };
      aboutUsTitle: string;
      aboutUsContent: string;
    };
  };
}

export interface GetCompanyHistoryResponse {
  page: {
    companyPageHistorySection: {
      historySectionMainTitle: string;
      historySectionSubTitle: string;
      historySectionContent: string;
    };
  };
}