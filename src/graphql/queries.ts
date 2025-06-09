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

export const GET_COMPANY_VISION = gql`
query GetCompanyPage {
    page(id: "company", idType: URI) {
      companyPageVisionSection {
        visionTitle
        visionContent
      }
    }
    visions(where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
      }
    }
  }
`;

export const GET_COMPANY_SIMPLIFY_SHIPPING = gql`
query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageSimply {
      simplifyShippingTitle
    }
  }
  shippingMethods(where: { orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
    }
  }
}
`;

export const GET_COMPANY_WHO_WE_ARE = gql`
query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageWhoWeAreSection {
      whoWeAreTitle
      whoWeAreContent
      ourPurposeTitle
      ourPurposeIcon {
        node {
          sourceUrl
        }
      }
      ourPurposeContent
      ourVisionTitle
      ourVisionIcon {
        node {
          sourceUrl
        }
      }
      ourVisionContent
    }
  }
}
`;

export const GET_COMPANY_OUR_VALUES = gql`query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageOurValuesSection {
      ourValuesTitle
      ourValuesImage1 {
        node {
          sourceUrl
        }
      }
      ourValuesImage2 {
        node {
          sourceUrl
        }
      }
    }
  }
  values(where: { orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      content
    }
  }
}
`;

export const GET_COMPANY_KEY_FACTS = gql`query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageKeyFactsSection {
      keyFactsTitle
      keyFactsBackgroundImage {
        node {
          sourceUrl
        }
      }
    }
  }
  keyFacts(where: { orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      content
    }
  }
}
`;  

export const GET_COMPANY_GLOBAL_NETWORK = gql`
query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageOurGlobalNetworkSection {
      ourGlobalNetworkTitle
      ourGlobalNetworkContent
      ourGlobalNetworkBox1Text1
      ourGlobalNetworkBox1Text2
      ourGlobalNetworkBox2Text1
      ourGlobalNetworkBox2Text2
      ourGlobalNetworkBox3Text1
      ourGlobalNetworkBox3Text2
    }
  }
}
`;

export const GET_COMPANY_CERTIFICATION = gql`
query GetCompanyPage {
  page(id: "company", idType: URI) {
    companyPageCertifications {
      certificationMainTitle
      certificationSubTitle1
      certificationContent1
      certificationSubTitle2
      certificationContent2
      certificationSubTitle3
      certificationContent3
    }
  }
  certifications(where: {orderby: {field: DATE, order: ASC}}) {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
  partners(where: {orderby: {field: DATE, order: ASC}}) {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

export const GET_COMPANY_LOCATION = gql`
query GetCompanyOfficeLocations {
  page(id: "company", idType: URI) {
    companyPageOfficeLocationSection {
      officeLocationsTitle
      officeLocationMapUrl
    }
  }
  locations {
    nodes {
      title
      locationsOptions {
        latitude
        longitude
        name
        address
        phoneNumber
        emailAddress
      }
    }
  }
}
`;

export const GET_SERVICES_PAGE = gql`
query GetServicePage {
  page(id: "services", idType: URI) {
    servicesPageBannerSection {
      bannerImage {
        node {
          sourceUrl
        }
      }
      bannerTitle
      pageContent
    }
    servicePageOtherTopicsSection {
      otherTopicsMainTitle
      topic1Title
      topic1Image {
        node {
          sourceUrl
        }
      }
      topic1Link {
        nodes {
          uri
        }
      }
      topic2Title
      topic2Image {
        node {
          sourceUrl
        }
      }
      topic2Link {
        nodes {
          uri
        }
      }
      topic3Title
      topic3Image {
        node {
          sourceUrl
        }
      }
      topic3Link {
        nodes {
          uri
        }
      }
    }
  }
  services(where: { parentIn: [0], orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      uri
      id
    }
  }
}
`;


export const GET_SERVICE_WITH_SUBSERVICES = gql`
  query GetServiceWithSubServices($id: ID!) {
    service(id: $id, idType: ID) {
      title
      servicesPageBannerSection {
        bannerImage {
          node {
            sourceUrl
          }
        }
        bannerTitle
      }
      servicePageOtherTopicsSection {
        otherTopicsMainTitle
        topic1Title
        topic1Image {
          node {
            sourceUrl
          }
        }
        topic1Link {
          nodes {
            uri
          }
        }
        topic2Title
        topic2Image {
          node {
            sourceUrl
          }
        }
        topic2Link {
          nodes {
            uri
          }
        }
        topic3Title
        topic3Image {
          node {
            sourceUrl
          }
        }
        topic3Link {
          nodes {
            uri
          }
        }
      }
    }
    subServices: services(where: { parentIn: [$id] }) {
      nodes {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_SOLUTIONS_PAGE = gql`
query GetSolutionsPage {
  page(id: "solutions", idType: URI) {
    solutionsPageBannerSection {
      bannerImage {
        node {
          sourceUrl
        }
      }
      bannerTitle
      pageContent
    }
    solutionsPageOtherTopicsSection {
      otherTopicsMainTitle
      topic1Title
      topic1Image {
        node {
          sourceUrl
        }
      }
      topic1Link {
        nodes {
          uri
        }
      }
      topic2Title
      topic2Image {
        node {
          sourceUrl
        }
      }
      topic2Link {
        nodes {
          uri
        }
      }
      topic3Title
      topic3Image {
        node {
          sourceUrl
        }
      }
      topic3Link {
        nodes {
          uri
        }
      }
    }
  }
  solutions(where: { parentIn: [0], orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      uri
      id
    }
  }
}
`;

export const GET_SOLUTIONS_WITH_SUBSOLUTIONS = gql`
  query GetSolutionsWithSubSolutions($id: ID!) {
    solution(id: $id, idType: ID) {
      title
      solutionsSinglePageBannerSection {
        bannerImage {
          node {
            sourceUrl
          }
        }
        bannerTitle
      }
      solutionsPageOtherTopicsSection {
        otherTopicsMainTitle
        topic1Title
        topic1Image {
          node {
            sourceUrl
          }
        }
        topic1Link {
          nodes {
            uri
          }
        }
        topic2Title
        topic2Image {
          node {
            sourceUrl
          }
        }
        topic2Link {
          nodes {
            uri
          }
        }
        topic3Title
        topic3Image {
          node {
            sourceUrl
          }
        }
        topic3Link {
          nodes {
            uri
          }
        }
      }
    }

    subSolutions: solutions(where: { parentIn: [$id] }) {
      nodes {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        uri
        id
      }
    }
  }
`;

export const GET_RESOURSES_PAGE = gql`
query GetResourcesPage {
  page(id: "resources", idType: URI) {
    resourcesPageBannerSection {
      bannerImage {
        node {
          sourceUrl
        }
      }
      bannerTitle
    }
    resourcesPageNewsSection {
      newsSectionTitle
      newsSectionContent
    }
    resourcesPageCaseStudyFAQSections {
      caseStudiesTitle
      faqTitle
    }
    resourcesPageDownloadsSection {
      downloadsSectionTitle
      downloadSectionContent
      brochureTitle
      brochureContent
      brochureFile {
        node {
          sourceUrl
        }
      }
      serviceGuidesTitle
      serviceGuidesContent
      serviceGuidesFile {
        node {
          sourceUrl
        }
      }
      whitePapersTitle
      whitePapersContent
      whitePapersFile {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

export const GET_RECENT_NEWS = gql`
query GetRecentPosts($count: Int) {
  posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      id
      title
      excerpt
      date
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

export const GET_NEWS_CATEGORIES = gql`query GetPostCategories {
  categories {
    nodes {
      id
      name
      slug
      uri
      description
    }
  }
}
`

export const GET_NEWS_BY_CATEGORY = gql`
  query GetPostsByCategorySlug(
    $slug: String!
    $count: Int!
    $after: String
    $search: String
  ) {
    posts(
      first: $count
      after: $after
      where: {
        categoryName: $slug
        search: $search
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        excerpt
        uri
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;





export const GET_CASE_STUDIES =gql`
query GetCaseStudies($count: Int) {
  caseStudies(first: $count) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      caseStudiesOptions {
        companyDescription
        caseStudyPersonName
        caseStudyPersonDesignation
        caseStudyPersonImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

export const GET_FAQS = gql`
  query SearchFAQs($search: String!) {
    faqs(where: { search: $search }) {
      nodes {
        title
        content
      }
    }
  }
`;

export const GET_NEWS_DETAIL = gql`
query GetPostDetailsByID($id: ID!) {
  post(id: $id, idType: ID) {
    title
    content
    date
    featuredImage {
      node {
        sourceUrl
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
}
`


export const GET_RELATED_POSTS_BY_ID = gql`
  query GetRelatedPostsByID($categorySlug: String!, $excludePostId: ID!) {
    posts(
      where: {
        categoryName: $categorySlug
        notIn: [$excludePostId]
      }
      first: 3
    ) {
      nodes {
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        uri
      }
    }
  }
`;


export const GET_SINGLE_CASE_STUDY = gql`
  query GetSingleCaseStudy($id: ID!) {
    caseStudy(id: $id, idType: ID) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      caseStudiesOptions {
        caseStudyImage {
          node {
            sourceUrl
          }
        }
        companyName
        companyLogo {
          node {
            sourceUrl
          }
        }
        companyLocation
        companyDescription
        challenges
        solutions
        results
        caseStudyPersonName
        caseStudyPersonDesignation
        caseStudyPersonImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_TECHNOLOGY_PAGE = gql`
query GetTechnologyPage {
  page(id: "technology", idType: URI) {
    technologyPageBannerSection {
      bannerImage {
        node {
          sourceUrl
        }
      }
      bannerTitle
      pageContent
    }
    technologyPageOtherTopicsSection {
      otherTopicsMainTitle
      topic1Title
      topic1Image {
        node {
          sourceUrl
        }
      }
      topic1Link {
        nodes {
          uri
        }
      }
      topic2Title
      topic2Image {
        node {
          sourceUrl
        }
      }
      topic2Link {
        nodes {
          uri
        }
      }
      topic3Title
      topic3Image {
        node {
          sourceUrl
        }
      }
      topic3Link {
        nodes {
          uri
        }
      }
    }
  }
  technologies(where: { parentIn: [0], orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      uri
      id
    }
  }
}
`;

export const GET_TECHNOLOGY_DETAILS_BY_ID = gql`
  query GetTechnologyDetailsByID($id: ID!) {
    technology(id: $id, idType: ID) {
      ... on Technology {
        title
        content
        technologySinglePageBannerSection {
          bannerImage {
            node {
              sourceUrl
            }
          }
          bannerTitle
        }
        technologySinglePageOptions {
          subTitle
        }
        children {
          nodes {
            ... on Technology {
              id
              title
              content
              technologySinglePageOptions {
                subTitle
              }
              children {
                nodes {
                  ... on Technology {
                    id
                    title
                    content
                    technologySinglePageOptions {
                      subTitle
                    }
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const GET_CAREERS_PAGE = gql`
query GetCareersPage {
  page(id: "careers", idType: URI) {
    careersPageBannerSection {
      bannerImage {
        node {
          sourceUrl
        }
      }
      bannerTitle
    }
    careersPageSection1 {
      mainTitle
      subTitle
      content
      image {
        node {
          sourceUrl
        }
      }
    }
    careersPageMeetOur {
      meetOurPeopleTitle
      meetOurPeopleContent
    }
    careersPageJobsSection {
      jobSectionMainTitle
      jobSectionSubTitle
      jobSectionBottomContent
    }
    careersPageFind {
      openPositionTitle
    }
    careersPageWhyJoinUsSection {
      whyJoinUsTitle
      whyJoinUsContent
    }
    careersPageWeAreLookingForSection {
      title
      number1
      number2
      number3
      number4
      number5
      rightSideContent
    }
  }
  peoples(where: { parentIn: [0], orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      peoplesOptions {
        videoUrl
      }
    }
  }
  jobCategories {
    nodes {
      name
      description
    }
  }
  jobLocations {
    nodes {
      name
    }
  }
  careerAdvantages(where: { parentIn: [0], orderby: { field: DATE, order: ASC } }) {
    nodes {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`