export interface SupportPageData {
  page: {
    supportPageBannerSection: {
      bannerImage: {
        node: {
          sourceUrl: string;
        };
      };
      bannerTitle: string;
    };
    supportPageContentSection: {
      mainTitle: string;
      content: string;
      image: {
        node: {
          sourceUrl: string;
        };
      };
    };
    supportPageContactFormSection: {
      generalInquiriesFormTitle: string;
      generalInquiriesFormEmail: string;
      quoteRequestFormTitle: string;
      quoteRequestFormEmail: string;
    };
  };
}



export interface OfficeLocationsData {
  officeLocations: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    nodes: {
      id: string;
      title: string;
      officeLocationsOptions: {
        address: string;
        phoneNumber: string;
        emailAddress: string;
        latitude: string;
        longitude: string;
        country: {
          nodes: {
            id: string;
            name: string;
            countriesOptions?: {
              countryFlag: {
                node: {
                  sourceUrl: string;
                };
              };
            };
          }[];
        };
      };
    }[];
  };
}

export interface OfficeLocationsVars {
  count: number;
  after?: string | null;
  search?: string;
}


export interface CountryPageData {
  officeLocation: {
    title: string;
    officeLocationsOptions?: {
      address?: string;
      phoneNumber?: string;
      emailAddress?: string;
      country?: {
        nodes: {
          name: string;
        }[];
      };
      officeLocationImage1?: {
        node?: {
          sourceUrl: string;
        };
      };
      officeLocationImage2?: {
        node?: {
          sourceUrl: string;
        };
      };
      officeLocationImage3?: {
        node?: {
          sourceUrl: string;
        };
      };
      officeLocationBannerImage?: {
        node?: {
          sourceUrl: string;
        };
      };
      officeLocationBannerCaption?: string;
      officeLocationServices?: string;
      officeLocationFlyer?: {
        node?: {
          sourceUrl: string;
        };
      };
    };
  };
  officeLocations: {
    nodes: {
      id: string;
      title: string;
      uri: string;
      countries: {
        nodes: {
          name: string;
          id: string;
        }[];
      };
    }[];
  };
}

export interface CountryPageVars {
  uri: string;
}
