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

export interface GetCompanyVisionResponse {
  page: {
    companyPageVisionSection: {
      visionTitle: string;
      visionContent: string; 
    };
  };
  visions: {
    nodes: VisionNode[];
  };
}

export interface VisionNode {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string; 
}


export interface GetCompanyShippingResponse {
  page: {
    companyPageSimply: {
      simplifyShippingTitle: string;
    };
  };
  shippingMethods: {
    nodes: ShippingMethodNode[];
  };
}

export interface ShippingMethodNode {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string; 
}

export interface GetCompanyWhoWeAreResponse {
  page: {
    companyPageWhoWeAreSection: {
      whoWeAreTitle: string;
      whoWeAreContent: string;
      ourPurposeTitle: string;
      ourPurposeIcon: {
        node: {
          sourceUrl: string;
        };
      };
      ourPurposeContent: string;
      ourVisionTitle: string;
      ourVisionIcon: {
        node: {
          sourceUrl: string;
        };
      };
      ourVisionContent: string;
    };
  };
}

export interface OurValuesSectionData {
  page: {
    companyPageOurValuesSection: {
      ourValuesTitle: string;
      ourValuesImage1: {
        node: {
          sourceUrl: string;
        };
      };
      ourValuesImage2: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
  values: {
    nodes: OurValueItem[];
  };
}

export interface OurValueItem {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string; 
}

export interface GetCompanyKeyFactsResponse {
  page: {
    companyPageKeyFactsSection: {
      keyFactsTitle: string;
      keyFactsBackgroundImage: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
  keyFacts: {
    nodes: {
      title: string;
      content: string; 
    }[];
  };
}


export interface GetCompanyGlobalNetworkResponse {
  page: {
    companyPageOurGlobalNetworkSection: {
      ourGlobalNetworkTitle: string;
      ourGlobalNetworkContent: string;
      ourGlobalNetworkBox1Text1: string;
      ourGlobalNetworkBox1Text2: string;
      ourGlobalNetworkBox2Text1: string;
      ourGlobalNetworkBox2Text2: string;
      ourGlobalNetworkBox3Text1: string | null;
      ourGlobalNetworkBox3Text2: string;
    };
  };
}

export interface GetCompanyOfficeLocationResponse {
  page: {
    companyPageOfficeLocationSection: {
      officeLocationsTitle: string;
      officeLocationMapUrl: string;
    };
  };
}
export interface GetCompanyCertificationsResponse {
  page: {
    companyPageCertifications: {
      certificationMainTitle: string;
      certificationSubTitle1: string;
      certificationContent1: string;
      certificationSubTitle2: string;
      certificationContent2: string;
      certificationSubTitle3: string;
      certificationContent3: string;
    };
  };
  certifications: {
    nodes: {
      title: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
  partners: {
    nodes: {
      title: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
  };
}


export interface OfficeLocationSection {
  officeLocationsTitle: string;
  officeLocationMapUrl?: string;
}

export interface GetOfficeLocationsResponse {
  officeLocations: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    nodes: OfficeLocationNode[];
  };
}

export interface OfficeLocationNode {
  id: string;
  title: string;
  officeLocationsOptions: {
    address: string;
    phoneNumber: string;
    emailAddress: string;
    latitude: string;
    longitude: string;
    country: {
      nodes: CountryNode[];
    };
  };
}

export interface CountryNode {
  id: string;
  name: string;
  countriesOptions?: {
    countryFlag?: {
      node?: {
        sourceUrl: string;
      };
    };
  };
}
