import { useQuery } from "@apollo/client";
import { Container, Divider } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import LoadingFallback from "src/components/LoadingFallback";
import ScrollToHash from "src/components/ScrollToHash";
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
      <ScrollToHash deps={[data]} offset={150} />
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
            <div id="shipmentManagement">
            <ShipmentManagement data={data.pageBy.shipmentManagementSection} />
            </div>
            <Divider />
            <div id="controltower">
            <ControlTower data={data.pageBy.controlTowerSection} />
            </div>
            <div id="shipmentvisibility">

            <ShipmentVisiblity
              data={data.pageBy.shipmentVisibilitySection}
              featuredContent={data.shipmentVisibilities.nodes}
              />
              </div>
            <Divider />
            <div id="e-docs">
            <Edocs data={data.pageBy.eDocsSection} />
            </div>
            <Divider sx={{my:4}}/>
            <div id="supplychainintegrations">
            <SupplyChain
              data={data.pageBy.supplyChainIntegrationSection}
              frightIndex={data.freightIndexTrends.nodes}
              tools={data.toolsReports.nodes}
              fitSection={data.pageBy.freightIndexTrendsSection}
              traSection={data.pageBy.toolsReportsAnalyticsSection}
              />
              </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
