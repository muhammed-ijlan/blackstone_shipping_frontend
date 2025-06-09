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
