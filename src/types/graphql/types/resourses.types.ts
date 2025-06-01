export interface ResourcesPageData {
  page: {
    resourcesPageBannerSection: {
      bannerImage: {
        node: {
          sourceUrl: string;
        };
      };
      bannerTitle: string;
    };
    resourcesPageNewsSection: {
      newsSectionTitle: string;
      newsSectionContent: string;
    };
    resourcesPageCaseStudyFAQSections: {
      caseStudiesTitle: string;
      faqTitle: string;
    };
    resourcesPageDownloadsSection: {
      downloadsSectionTitle: string;
      downloadSectionContent: string;
      brochureTitle: string;
      brochureContent: string;
      brochureFile: {
        node: {
          sourceUrl: string;
        };
      };
      serviceGuidesTitle: string;
      serviceGuidesContent: string;
      serviceGuidesFile: {
        node: {
          sourceUrl: string;
        };
      };
      whitePapersTitle: string;
      whitePapersContent: string;
      whitePapersFile: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
}

export interface RecentPostsData {
  posts: {
    nodes: {
      id: string;
      title: string;
      excerpt: string;
      date: string;
      uri: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      } | null;
    }[];
  };
}

export interface RecentPostsVars {
  count: number;
}

export interface NewsCategoriesData {
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
      uri: string;
      description: string;
    }[];
  };
}


export interface PostNode {
  id: string;
  title: string;
  excerpt: string;
  uri: string;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    } | null;
  } | null;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GetPostsByCategorySlugData {
  posts: {
    pageInfo: PageInfo;
    nodes: PostNode[];
  };
}

export interface GetPostsByCategorySlugVars {
  slug: string;
  count: number;
  after?: string | null;
}


export interface CaseStudiesData {
  caseStudies: {
    nodes: CaseStudy[];
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
  content?:string;
  caseStudiesOptions: {
    companyDescription:string;
    caseStudyPersonName: string;
    caseStudyPersonDesignation: string;
    caseStudyPersonImage: {
      node: {
        sourceUrl: string;
      };
    } | null;
  } | null;
}


export interface Faq {
  title: string;
  content: string;
}

export interface FaqsData {
  faqs: {
    nodes: Faq[];
  };
}

export interface FaqsVariables {
  search: string;
}

export interface GetNewsByCategoryVariables {
  slug: string;
  count: number;
  after?: string | null;
  search?: string;
}