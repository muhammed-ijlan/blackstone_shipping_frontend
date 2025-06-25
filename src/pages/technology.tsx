import { useQuery } from "@apollo/client";
import { Outlet } from "react-router";
import Banner from "src/components/banner/Banner";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_TECHNOLOGY_PAGE } from "src/graphql/queries";
import BannerContent from "src/sections/services/BannerContent";
import OtherTopics from "src/sections/services/OtherTopics";
import ServiceCards from "src/sections/services/ServiceCards";
import { GetTechnologyPageResponse } from "src/types/graphql/types/technology.types";

const Page = () => {
  const { data: technologyData, loading } =
    useQuery<GetTechnologyPageResponse>(GET_TECHNOLOGY_PAGE);
  if (loading) return <LoadingFallback />;
  return (
    <>
      {technologyData && (
        <>
          <Banner
            bgUrl={
              technologyData?.page?.technologyPageBannerSection?.bannerImage
                ?.node?.sourceUrl
            }
            mainTitle={
              technologyData?.page?.technologyPageBannerSection?.bannerTitle
            }
          />
          <BannerContent
            content={
              technologyData?.page?.technologyPageBannerSection?.pageContent
            }
          />
          <ServiceCards data={technologyData?.technologies.nodes} />
          <OtherTopics
            data={technologyData.page.technologyPageOtherTopicsSection}
          />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Page;
