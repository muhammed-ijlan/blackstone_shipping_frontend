export interface GetSolutionsPageResponse {
  page: {
    solutionsPageBannerSection: {
      bannerImage: {
        node: {
          sourceUrl: string;
        };
      };
      bannerTitle: string;
      pageContent: string;
    };
    solutionsPageOtherTopicsSection: {
      otherTopicsMainTitle: string;
      topic1Title: string;
      topic1Image: {
        node: {
          sourceUrl: string;
        };
      };
      topic1Link: {
        nodes: {
          uri: string;
        }[];
      };
      topic2Title: string;
      topic2Image: {
        node: {
          sourceUrl: string;
        };
      };
      topic2Link: {
        nodes: {
          uri: string;
        }[];
      };
      topic3Title: string;
      topic3Image: {
        node: {
          sourceUrl: string;
        };
      };
      topic3Link: {
        nodes: {
          uri: string;
        }[];
      };
    };
  };
  solutions: {
    nodes: {
      title: string;
      content: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
      uri: string;
      id: string;
    }[];
  };
};

export interface GetSolutionsWithSubSolutionsResponse {
  solution: {
    title: string;
    solutionsSinglePageBannerSection: {
      bannerImage: {
        node: {
          sourceUrl: string;
        };
      };
      bannerTitle: string;
    };
    solutionsPageOtherTopicsSection: {
      otherTopicsMainTitle: string;
      topic1Title: string;
      topic1Image: {
        node: {
          sourceUrl: string;
        };
      };
      topic1Link: {
        nodes: {
          uri: string;
        }[];
      };
      topic2Title: string;
      topic2Image: {
        node: {
          sourceUrl: string;
        };
      };
      topic2Link: {
        nodes: {
          uri: string;
        }[];
      };
      topic3Title: string;
      topic3Image: {
        node: {
          sourceUrl: string;
        };
      };
      topic3Link: {
        nodes: {
          uri: string;
        }[];
      };
    };
  };
  subSolutions: {
    nodes: {
      title: string;
      content: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
      uri: string;
      id: string;
    }[];
  };
}
