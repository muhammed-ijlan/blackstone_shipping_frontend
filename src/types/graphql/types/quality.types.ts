interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface QualityNode {
  title: string;
  content: string;
  featuredImage: ImageNode | null;
}

export interface SustainabilityNode {
  title: string;
  featuredImage: ImageNode | null;
}

export interface GetQualityAndSustainabilityPageData {
  pageBy: {
    title: string;
    qualityandsustainabilityPageBannerSection: {
      bannerImage: ImageNode;
      bannerTitle: string;
    };
    qualitySustainabilityPageQualitySections: {
      qualitySectionMainTitle: string;
      qualitySectionSubTitle1: string;
      qualitySectionContent1: string;
      qualitySectionImage1: ImageNode;
      qualitySectionSubTitle2: string;
      qualitySectionContent2: string;
      qualitySectionImage2: ImageNode;
      qualitySectionBottomContent: string;
      qualitySection2Title: string;
      qualitySection3Title: string;
      qualitySection3ListPoints: string;
    };
    qualitySustainabilityPageSustainabilitySection: {
      sustainabilitySectionMainTitle: string;
      sustainabilitySectionSubTitle1: string;
      sustainabilitySectionContent1: string;
      sustainabilitySectionImage1: ImageNode;
      sustainabilitySectionSubTitle2: string;
      sustainabilitySectionContent2: string;
      sustainabilitySectionImage2: ImageNode;
    };
    qualitySustainabilityPageAreasofCommitment: {
      areasOfCommitmentSectionMainTitle: string;
      areasOfCommitmentSectionSubTitle1: string;
      areasOfCommitmentSectionContent1: string;
      areasOfCommitmentSection1MainImage: ImageNode;
      areasOfCommitmentSectionSubImage1: ImageNode;
      areasOfCommitmentSection1SubImage2: ImageNode;
      areasOfCommitmentSection1SubImage3: ImageNode;
      areasOfCommitmentSection1SubImage4: ImageNode;
      areasOfCommitmentSection2SubTitle: string;
      areasOfCommitmentSection2Content: string;
      areasOfCommitmentSection2MainImage: ImageNode;
      areasOfCommitmentSection2SubImage1: ImageNode;
      areasOfCommitmentSection2SubImage2: ImageNode;
      areasOfCommitmentSection2SubImage3: ImageNode;
      areasOfCommitmentSection2SubImage4: ImageNode;
      areasOfCommitmentSection3SubTitle: string;
      areasOfCommitmentSection3Content: string;
      areasOfCommitmentSection3MainImage: ImageNode;
      areasOfCommitmentSection3SubImage1: ImageNode;
      areasOfCommitmentSection3SubImage2: ImageNode;
      areasOfCommitmentSection3SubImage3: ImageNode;
      areasOfCommitmentSection3SubImage4: ImageNode;
      areasOfCommitmentSection4SubTitle: string;
      areasOfCommitmentSection4Content: string;
      areasOfCommitmentSection4MainImage: ImageNode;
    };
    qualitySustainabilityPageCalculatorSection: {
      calculatorSectionTitle: string;
      calculatorSectionImage: ImageNode;
      calculatorSectionContent: string;
    };
    qualitySustainabilityPageOurReportingSection: {
      ourReportingSectionTitle: string;
      ourReportingSectionContent: string;
      ourReportingSectionImage: ImageNode;
    };
    qualitySustainabilityPageEsgCodeOfConductSection: {
      codeOfConductTitle: string;
      codeOfConductContent: string;
      codeOfConductImage: ImageNode;
    };
  };
  qualities: {
    nodes: QualityNode[];
  };
  sustainabilities: {
    nodes: SustainabilityNode[];
  };
}



export interface CsrYearNode {
  id: string;
  name: string;
  slug: string;
}

export interface GetCsrYearsData {
  csrYears: {
    nodes: CsrYearNode[];
  };
}


export interface CSRImageNode {
  node: {
    sourceUrl: string;
  };
}

export interface CSRNode {
  title: string;
  content: string;
  featuredImage: CSRImageNode | null;
}

export interface GetCSRByYearData {
  csrs: {
    nodes: CSRNode[];
  };
}

export interface GetCSRByYearVars {
  yearSlug: string[];
}
