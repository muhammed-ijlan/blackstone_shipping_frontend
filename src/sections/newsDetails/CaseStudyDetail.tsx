import { Box, Stack, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import { GetCaseStudyResponse } from "src/types/graphql/types/resourses.types";

const CaseStudyDetail = ({ data }: { data: GetCaseStudyResponse }) => {
  return (
    <Stack gap={3} mb={6} sx={{ textAlign: "left !important" }}>
      <Stack direction="row">
        <Typography color="rgba(109, 110, 113, 1)">Resources / &nbsp;</Typography>
        <Typography fontWeight={500}>Case Study</Typography>
      </Stack>

      <Stack gap={3}>
        {data?.caseStudy?.featuredImage?.node.sourceUrl && (
          <Box
            component="img"
            src={data.caseStudy.featuredImage.node.sourceUrl}
            sx={{
              width: "100%",
              height: { xs: "320px", md: "500px" },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        )}

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            textTransform: "unset !important",
            color: "rgba(45, 55, 72, 1)",
          }}
        >
          {capitalCase(data?.caseStudy?.title.toLowerCase() ?? "")}
        </Typography>

        {/* Customer Section */}
        <Stack gap={2}>
          <Typography variant="h5" fontWeight={600} sx={{ textDecoration: "underline" }}>
            Customer
          </Typography>

          <Stack direction="row" alignItems="center" gap={3}>
            {data?.caseStudy?.caseStudiesOptions?.caseStudyImage?.node?.sourceUrl && (
              <Box
                component="img"
                src={data.caseStudy.caseStudiesOptions.caseStudyImage.node.sourceUrl}
                alt="Customer"
                sx={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
              />
            )}

            <Stack>
              <Typography variant="h4" component={"div"} dangerouslySetInnerHTML={{ __html: data?.caseStudy?.caseStudiesOptions?.customerDescription ?? "" }} />
            </Stack>
          </Stack>
        </Stack>

        {/* Location Section */}
        <Stack gap={2}>
          <Typography variant="h5" fontWeight={600} sx={{ textDecoration: "underline" }}>
            Location
          </Typography>
          <Typography color="rgba(109, 110, 113, 1)">
            {data?.caseStudy?.caseStudiesOptions?.customerLocation}
          </Typography>
        </Stack>

        {/* Intro */}
        <RichText html={data?.caseStudy?.caseStudiesOptions?.intro ?? ""} />

        {/* Challenge */}
        <Section
          title="The Challenge"
          content={data?.caseStudy?.caseStudiesOptions?.challenges ?? ""}
        />

        {/* Solutions */}
        <Section
          title="Solutions"
          content={data?.caseStudy?.caseStudiesOptions?.solutions ?? ""}
        />

        {/* Key Takeaways */}
        <Section
          title="Key Takeaways"
          content={data?.caseStudy?.caseStudiesOptions?.keytakeaways ?? ""}
        />
      </Stack>
    </Stack>
  );
};

export default CaseStudyDetail;


const RichText = ({ html }: { html: string }) => (
  <Box
    component="div"
    sx={{
      "& *": { margin: 0, padding: 0 },
      "& p": {
        margin: 0, padding: 0,
        lineHeight: 1.7,
        color: "rgba(45, 55, 72, 0.9)",
      },
      "& p:empty, & p:has(br), & p:contains('\\u00A0')": {
        display: "none",
      },
      "& strong, & b": {
        fontWeight: 600,
        color: "rgba(45, 55, 72, 1)",
      },
      "& ul, & ol": {
        paddingLeft: "1.5rem",
        marginBottom: "1rem",
      },
      "& li": {
        marginBottom: "0.5rem",
        lineHeight: 1.6,
      },
    }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);


const Section = ({ title, content }: { title: string; content: string }) => (
  <Stack gap={1.5}>
    <Typography variant="h5" fontWeight={600} sx={{ textDecoration: "underline" }}>
      {title}
    </Typography>
    <RichText html={content} />
  </Stack>
);
