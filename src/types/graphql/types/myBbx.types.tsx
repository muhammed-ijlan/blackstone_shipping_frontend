export interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface FeaturedContent {
  title: string;
  content: string;
  featuredImage: ImageNode | null;
}

export interface GetMyBlackboxFreightPageData {
  pageBy: {
    title: string;
    blackboxFreightPageBannerSection: {
      bannerImage: ImageNode;
      bannerTitle: string;
    };
    shipmentManagementSection: {
      smSubTitle: string;
      smMainTitleFirstPart: string;
      smMainTitleSecondPart: string;
      smContent: string;
      smImage: ImageNode;
    };
    controlTowerSection: {
      ctTitle: string;
      ctContent: string;
    };
    shipmentVisibilitySection: {
      svTitle: string;
      svContent: string;
    };
    eDocsSection: {
      edTitle: string;
      edContent: string;
      edImage: ImageNode;
    };
    supplyChainIntegrationSection: {
      sciTitle: string;
      sciContent: string;
    };
    freightIndexTrendsSection: {
      fitTitle: string;
      fitContent: string;
      fitImage: ImageNode;
    };
    toolsReportsAnalyticsSection: {
      traTitle: string;
      traContent: string;
      traImage: ImageNode;
    };
  };
  shipmentVisibilities: {
    nodes: FeaturedContent[];
  };
  freightIndexTrends: {
    nodes: FeaturedContent[];
  };
  toolsReports: {
    nodes: FeaturedContent[];
  };
}
