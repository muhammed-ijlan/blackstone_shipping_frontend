export interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface LinkNode {
  uri: string;
}

export interface TopicLink {
  nodes: LinkNode[];
}

export interface BannerSection {
  bannerImage: ImageNode;
  bannerTitle: string;
  pageContent: string;
}

export interface OtherTopicsSection {
  otherTopicsMainTitle: string;
  topic1Title: string;
  topic1Image: ImageNode;
  topic1Link: TopicLink;
  topic2Title: string;
  topic2Image: ImageNode;
  topic2Link: TopicLink;
  topic3Title: string;
  topic3Image: ImageNode;
  topic3Link: TopicLink;
}

export interface ServiceNode {
  title: string;
  content: string;
  featuredImage: ImageNode;
  uri: string;
  id: string;
}

export interface GetServicePageData {
  page: {
    servicesPageBannerSection: BannerSection;
    servicePageOtherTopicsSection: OtherTopicsSection;
  };
  services: {
    nodes: ServiceNode[];
  };
}

export interface GetServicePageResponse {
  data: GetServicePageData;
}

// 


export interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface LinkNode {
  uri: string;
}

export interface OtherTopicsSection {
  otherTopicsMainTitle: string;
  topic1Title: string;
  topic1Image: ImageNode;
  topic1Link: {
    nodes: LinkNode[];
  };
  topic2Title: string;
  topic2Image: ImageNode;
  topic2Link: {
    nodes: LinkNode[];
  };
  topic3Title: string;
  topic3Image: ImageNode;
  topic3Link: {
    nodes: LinkNode[];
  };
}

export interface ServicesPageBannerSection {
  bannerImage: ImageNode;
  bannerTitle: string;
}

export interface ServiceData {
  service: {
    title: string;
    servicesPageBannerSection: ServicesPageBannerSection;
    servicePageOtherTopicsSection: OtherTopicsSection;
  };
  subServices: {
    nodes: SubService[];
  };
}

export interface SubService {
  title: string;
  content: string;
  featuredImage: ImageNode;
}
