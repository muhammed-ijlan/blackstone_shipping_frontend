export interface FooterMenuItem {
    id: string;
    label: string;
    url: string;
    uri: string;
    parentId: string | null;
    order: number;
}

export interface GetFooterMenuItemsData {
    menu: {
        id: string;
        name: string;
        menuItems: {
            nodes: FooterMenuItem[];
        };
    };
}

export interface ImageNode {
    node: {
        sourceUrl: string;
    };
}

export interface GetGeneralPagesData {
    pageBy: {
        title: string;
        content: string;
        blackboxFreightPageBannerSection: {
            bannerImage: ImageNode;
            bannerTitle: string;
        };
    };
}

export interface GetGeneralPagesVars {
    uri: string;
}


export interface GlobalSearchResponse {
    posts: { nodes: SearchNode[] };
    pages: { nodes: SearchNode[] };
    services: { nodes: SearchNode[] };
    solutions: { nodes: SearchNode[] };
    caseStudies: { nodes: SearchNode[] };
    technologies: { nodes: SearchNode[] };
  }
  
  export interface SearchNode {
    id: string;
    title: string;
    uri: string;
  }