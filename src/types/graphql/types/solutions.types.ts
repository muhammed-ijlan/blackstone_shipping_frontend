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

export interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface UriNode {
  uri: string;
}

export interface SolutionChild {
  id: string;
  title: string;
  content: string;
  uri: string;
  featuredImage: ImageNode | null;
}

export interface GetSolutionsWithSubSolutionsData {
  solution: {
    id: string;
    title: string;
    solutionsSinglePageBannerSection: {
      bannerImage: ImageNode;
      bannerTitle: string;
    };
    solutionsPageOtherTopicsSection: {
      otherTopicsMainTitle: string;

      topic1Title: string;
      topic1Image: ImageNode;
      topic1Link: { nodes: UriNode[] };

      topic2Title: string;
      topic2Image: ImageNode;
      topic2Link: { nodes: UriNode[] };

      topic3Title: string;
      topic3Image: ImageNode;
      topic3Link: { nodes: UriNode[] };
    };
    children: {
      nodes: SolutionChild[];
    };
  };
}

export interface GetSolutionsWithSubSolutionsVars {
  uri: string;
}
