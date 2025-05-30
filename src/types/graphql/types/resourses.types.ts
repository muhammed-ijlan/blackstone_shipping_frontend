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
