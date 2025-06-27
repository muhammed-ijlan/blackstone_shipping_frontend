import { useQuery } from "@apollo/client";
import { Container, Divider } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_MY_BLACKBOX_FREIGHT_PAGE } from "src/graphql/queries";
import ControlTower from "src/sections/myBbx/ControlTower";
import Edocs from "src/sections/myBbx/Edocs";
import ShipmentManagement from "src/sections/myBbx/ShipmentManagement";
import ShipmentVisiblity from "src/sections/myBbx/ShipmentVisiblity";
import SupplyChain from "src/sections/myBbx/SupplyChain";
import { GetMyBlackboxFreightPageData } from "src/types/graphql/types/myBbx.types";

const Page = () => {
  const { data, loading } = useQuery<GetMyBlackboxFreightPageData>(
    GET_MY_BLACKBOX_FREIGHT_PAGE
  );
  if (loading) return <LoadingFallback />;
  return (
    <>
      {data && (
        <>
          <Banner
            bgUrl={
              data.pageBy.blackboxFreightPageBannerSection.bannerImage.node
                .sourceUrl
            }
            mainTitle={data.pageBy.blackboxFreightPageBannerSection.bannerTitle}
          />
          <Container maxWidth="xl">
            <ShipmentManagement data={data.pageBy.shipmentManagementSection} />
            <Divider />
            <ControlTower data={data.pageBy.controlTowerSection} />
            <ShipmentVisiblity
              data={data.pageBy.shipmentVisibilitySection}
              featuredContent={data.shipmentVisibilities.nodes}
            />
            <Divider />
            <Edocs data={data.pageBy.eDocsSection} />
            <Divider sx={{my:4}}/>
            <SupplyChain
              data={data.pageBy.supplyChainIntegrationSection}
              frightIndex={data.freightIndexTrends.nodes}
              tools={data.toolsReports.nodes}
              fitSection={data.pageBy.freightIndexTrendsSection}
              traSection={data.pageBy.toolsReportsAnalyticsSection}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
