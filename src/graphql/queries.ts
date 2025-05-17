import { gql } from "@apollo/client";

export const GET_SLIDERS = gql`
query {
  sliders {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      sliderFields {
        sliderMainHeading
        subtitle
        shortDescription
        button1Text
        button1Link
        button2Text
        button2Link
      }
    }
  }
}
`;

export const GET_HEADER_MENU = gql`
  query GetHeaderMenu {
  menu(id: "Main Navigation", idType: NAME) {
    menuItems(where: { parentId: null }) {
      nodes {
        id
        label
        url
        childItems {
          nodes {
            id
            label
            url
            childItems {
              nodes {
                id
                label
                url
              }
            }
          }
        }
      }
    }
  }
}
`;


export const GET_WHAT_WE_OFFER = gql`
query {
  page(id: "home", idType: URI) {
    title
    homePageFieldsWhatWeOffer {
      whatWeOffersubHeading
      whatWeOfferMainHeading
    }
  }

  whatWeOffers {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
      uri
    }
  }
}
`;

export const GET_INDUSTRY_COVERAGE = gql`
 query GetIndustryCoverage {
  page(id: "home", idType: URI) {
    title
    homePageFieldsIndustryCoverage {
      industryCoverageMainHeading
    }
  }
  industries {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
      uri
      industriesFieldOptions {
        colorCode
      }
    }
  }
 }
 `

 export const GET_SERVICES = gql`
  query {
    page(id: "home", idType: URI) {
      title
      homePageFieldsOurServices {
        ourServicesMainHeading
      }
    }

    services {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
        uri
      }
    }
  }
`;
export const GET_SUSTAINABILITY = gql`
  query GetSustainability {
    page(id: "home", idType: URI) {
      title
      homePageFieldsSustainabilityCommitment {
        sustainabilityCommitmentSubHeading
        sustainabilityCommitmentMainHeading
      }
    }
    sustainabilityCommitments {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
        uri
      }
    }
  }
`;

export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    page(id: "home", idType: URI) {
      title
      homePageFieldsTestimonials {
        testimonialsSubHeading
        testimonialsMainHeading
      }
    }
    testimonials {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
        uri
        testimonialsFieldOptions {
          testimonialAuthorDesignation
        }
      }
    }
  }
`;

export const GET_COMPANY_BANNER = gql`
query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageBannerSection {
      bannerImage {
        node {
          sourceUrl
        }
      }
      bannerTitle
    }
  }
}
`;

export const GET_COMPANY_ABOUT = gql`
  query GetCompanyPage {
    page(id: "company", idType: URI) {
      companyPageAboutSection {
        aboutUsImage {
          node {
            sourceUrl
          }
        }
        aboutUsTitle
        aboutUsContent
      }
    }
  }
`;


export const GET_COMPANY_HISTORY = gql`
  query GetCompanyHistorySection {
  page(id: "company", idType: URI) {
    companyPageHistorySection {
      historySectionMainTitle
      historySectionSubTitle
      historySectionContent
    }
  }
}
`;
