import { useQuery } from "@apollo/client";
import { Container, Divider } from "@mui/material";
import React from "react";
import Banner from "src/components/banner/Banner";
import LoadingFallback from "src/components/LoadingFallback";
import {
  GET_CSR_YEARS,
  GET_QUALITY_AND_SUSTAINABILITY_PAGE,
} from "src/graphql/queries";
import AreasOfCommitments from "src/sections/quality/AreasOfCommitments";
import AreasOfCommitmentSection from "src/sections/quality/AreasOfCommitmentSection";
import CarbonCalculator from "src/sections/quality/CarbonCalculator";
import CsrSection from "src/sections/quality/CsrSection";
import PageContentSection from "src/sections/quality/PageContentSection";
import QualitiesList from "src/sections/quality/QualitiesList";
import SustainablityList from "src/sections/quality/SustainablityList";
import {
  GetCsrYearsData,
  GetQualityAndSustainabilityPageData,
} from "src/types/graphql/types/quality.types";

const QualitySustainablity = () => {
  const { data, loading } = useQuery<GetQualityAndSustainabilityPageData>(
    GET_QUALITY_AND_SUSTAINABILITY_PAGE
  );

  if (loading) return <LoadingFallback />;

  return (
    <>
      {data && (
        <>
          <Banner
            bgUrl={
              data.pageBy.qualityandsustainabilityPageBannerSection.bannerImage
                .node.sourceUrl
            }
            mainTitle={
              data.pageBy.qualityandsustainabilityPageBannerSection.bannerTitle
            }
          />

          <Container maxWidth="xl">
            <PageContentSection
              data={{
                mainTitle:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionMainTitle,
                subTitle1:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionSubTitle1,
                content1:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionContent1,
                image1:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionImage1,
                subTitle2:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionSubTitle2,
                content2:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionContent2,
                image2:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionImage2,
                bottomContent:
                  data.pageBy.qualitySustainabilityPageQualitySections
                    .qualitySectionBottomContent,
              }}
            />
            <Divider />
            <QualitiesList
              title1={
                data.pageBy.qualitySustainabilityPageQualitySections
                  .qualitySection2Title
              }
              title2={
                data.pageBy.qualitySustainabilityPageQualitySections
                  .qualitySection3Title
              }
              listPoints={
                data.pageBy.qualitySustainabilityPageQualitySections
                  .qualitySection3ListPoints
              }
              qualities={data.qualities.nodes}
            />
            <Divider />

            <PageContentSection
              data={{
                mainTitle:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionMainTitle,
                subTitle1:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionSubTitle1,
                content1:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionContent1,
                image1:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionImage1,
                subTitle2:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionSubTitle2,
                content2:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionContent2,
                image2:
                  data.pageBy.qualitySustainabilityPageSustainabilitySection
                    .sustainabilitySectionImage2,
              }}
            />

            <Divider />
            <SustainablityList data={data.sustainabilities.nodes} />
            <AreasOfCommitments
              data={data.pageBy.qualitySustainabilityPageAreasofCommitment}
            />
            <Divider />
            <CarbonCalculator
              data={data.pageBy.qualitySustainabilityPageCalculatorSection}
            />
            <Divider />

            <AreasOfCommitmentSection
              subTitle={
                data.pageBy.qualitySustainabilityPageOurReportingSection
                  .ourReportingSectionTitle
              }
              content={
                data.pageBy.qualitySustainabilityPageOurReportingSection
                  .ourReportingSectionContent
              }
              mainImage={
                data.pageBy.qualitySustainabilityPageOurReportingSection
                  .ourReportingSectionImage
              }
              subImages={[]}
            />

            <Divider />
            <AreasOfCommitmentSection
              subTitle={
                data.pageBy.qualitySustainabilityPageEsgCodeOfConductSection
                  .codeOfConductTitle
              }
              content={
                data.pageBy.qualitySustainabilityPageEsgCodeOfConductSection
                  .codeOfConductContent
              }
              mainImage={
                data.pageBy.qualitySustainabilityPageEsgCodeOfConductSection
                  .codeOfConductImage
              }
              subImages={[]}
            />
            <Divider />
            <CsrSection />
          </Container>
        </>
      )}
    </>
  );
};

export default QualitySustainablity;
