export interface GetCareersPageData {
    page: {
        careersPageBannerSection: {
            bannerImage: {
                node: {
                    sourceUrl: string;
                };
            };
            bannerTitle: string;
        };
        careersPageSection1: {
            mainTitle: string;
            subTitle: string;
            content: string;
            image: {
                node: {
                    sourceUrl: string;
                };
            };
        };
        careersPageMeetOur: {
            meetOurPeopleTitle: string;
            meetOurPeopleContent: string;
        };
        careersPageJobsSection: {
            jobSectionMainTitle: string;
            jobSectionSubTitle: string;
            jobSectionBottomContent: string;
        };
        careersPageFind: {
            openPositionTitle: string;
        };
        careersPageWhyJoinUsSection: {
            whyJoinUsTitle: string;
            whyJoinUsContent: string;
        };
        careersPageWeAreLookingForSection: {
            title: string;
            number1: string;
            number2: string;
            number3: string;
            number4: string;
            number5: string;
            rightSideContent: string;
        };
    };
    peoples: {
        nodes: {
            title: string;
            content: string;
            featuredImage: {
                node: {
                    sourceUrl: string;
                };
            };
            peoplesOptions: {
                videoUrl: string;
            };
        }[];
    };
    jobCategories: {
        nodes: {
            name: string;
            description: string;
        }[];
    };
    jobLocations: {
        nodes: {
            name: string;
        }[];
    };
    careerAdvantages: {
        nodes: {
            title: string;
            content: string;
            featuredImage: {
                node: {
                    sourceUrl: string;
                };
            };
        }[];
    };
}

export interface JobOpening {
  title: string;
  id: string;
  date: string;
  jobOpeningsOptions: JobOpeningsOptions;
}

export interface JobOpeningsOptions {
  jobLocation: {
    nodes: JobLocation[];
  };
}

 export interface JobLocation {
  name: string;
}

export interface JobOpeningsResponse {
  jobOpenings: {
    nodes: JobOpening[];
  };
}



export interface JobOpeningDetails {
  title: string;
  jobOpeningsOptions: {
    bannerImage?: {
      node: {
        sourceUrl: string;
      };
    };
    jobLocation: {
      nodes: Array<{
        name: string;
      }>;
    };
    jobCategory: {
      nodes: Array<{
        name: string;
      }>;
    };
    keyResponsibilities?: string;
    requirements?: string;
    applicationEmail?: string;
  };
}

export interface GetJobPostDetailsResponse {
  jobOpening: JobOpeningDetails;
}

export interface GetJobPostDetailsVariables {
  id: string;
}


export interface GetJobCategoriesResponse {
  jobCategories: {
    nodes: JobCategoryNode[];
  };
}

export interface JobCategoryNode {
  id: string;
  name: string;
  slug: string;
}


export interface GetJobLocationsResponse {
  jobLocations: {
    nodes: JobLocationNode[];
  };
}

export interface JobLocationNode {
  id: string;
  name: string;
  slug: string;
}

export interface GetJobOpeningsResponse {
  jobOpenings: {
    nodes: JobOpeningNode[];
  };
}

export interface JobOpeningNode {
  id: string;
  title: string;
  date: string;
  jobOpeningsOptions: {
    jobLocation: {
      nodes: {
        name: string;
      }[];
    };
  };
}
