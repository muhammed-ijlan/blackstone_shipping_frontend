import { useQuery } from "@apollo/client";
import { Container, Divider } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import { GET_MY_BLACKBOX_FREIGHT_PAGE } from "src/graphql/queries";
import ControlTower from "src/sections/myBbx/ControlTower";
import ShipmentManagement from "src/sections/myBbx/ShipmentManagement";
import ShipmentVisiblity from "src/sections/myBbx/ShipmentVisiblity";
import { GetMyBlackboxFreightPageData } from "src/types/graphql/types/myBbx.types";

const Page = () => {
  const { data } = useQuery<GetMyBlackboxFreightPageData>(
    GET_MY_BLACKBOX_FREIGHT_PAGE
  );
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
          </Container>
        </>
      )}
    </>
  );
};

export default Page;
