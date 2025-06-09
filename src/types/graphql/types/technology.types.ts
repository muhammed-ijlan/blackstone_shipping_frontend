
export interface GetTechnologyPageResponse {
  page: {
    technologyPageBannerSection: {
      bannerImage: {
        node: {
          sourceUrl: string;
        };
      };
      bannerTitle: string;
      pageContent: string;
    };
    technologyPageOtherTopicsSection: {
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
  technologies: {
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


export interface Media {
  node: {
    sourceUrl: string;
  };
}

export interface TechnologyPageBanner {
  bannerImage: Media | null;
  bannerTitle: string | null;
}

export interface TechnologyOptions {
  subTitle: string | null;
}

export interface TechnologyChildNode {
  id: string;
  title: string;
  content: string;
  technologySinglePageOptions: TechnologyOptions | null;
  featuredImage?: Media | null;
}

export interface TechnologyNode {
  id: string;
  title: string;
  content: string;
  technologySinglePageOptions: TechnologyOptions | null;
  children: {
    nodes: TechnologyChildNode[];
  };
}

export interface TechnologyData {
  technology: {
    title: string;
    content: string;
    technologySinglePageBannerSection: TechnologyPageBanner | null;
    technologySinglePageOptions: TechnologyOptions | null;
    children: {
      nodes: TechnologyNode[];
    };
  };
}

export interface TechnologyVars {
  id: string;
}
