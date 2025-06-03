import { Box, Stack, Typography } from "@mui/material";
import { capitalCase } from "change-case";
import {
  CaseStudyData
} from "src/types/graphql/types/resourses.types";

const CaseStudyDetail = ({ data }: { data: CaseStudyData }) => {
  return (
    <Stack gap={2} sx={{textAlign:"left !important"}}>
      <Stack direction={"row"}>
        <Typography color="rgba(109, 110, 113, 1)">
          Resourses / &nbsp;
        </Typography>
        <Typography>Case Study</Typography>
      </Stack>
      <Stack gap={1}>
        <Box
          component={"img"}
          src={data.caseStudy.featuredImage?.node.sourceUrl}
          sx={{ width: "100%", height: "595px", objectFit: "cover" }}
        />
        <Typography
          sx={{
            textTransform: "unset !important",
            fontWeight: "600 !important",
          }}
          variant="h1"
          color="rgba(45, 55, 72, 1)"
        >
          {capitalCase(data?.caseStudy?.title.toLowerCase() ?? "")}
        </Typography>
        <Box
          component={"div"}
          dangerouslySetInnerHTML={{ __html: data.caseStudy?.content ?? "" }}
        />

        <Stack gap={3}>
          <Stack gap={2}>
            <Typography
              variant="h5"
              sx={{ textDecoration: "underline !important" }}
            >
              Company
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={3}>
              <Box
                component={"img"}
                src={
                  data.caseStudy.caseStudiesOptions?.companyLogo?.node.sourceUrl
                }
                alt={
                  data.caseStudy.caseStudiesOptions?.companyName ?? undefined
                }
                sx={{ width: "80px", height: "80px" }}
              />
              <Stack>
                <Typography variant="h5">
                  {data.caseStudy.caseStudiesOptions?.companyName}
                </Typography>
                <Typography color="rgba(109, 110, 113, 1)">
                  {data.caseStudy.caseStudiesOptions?.companyLocation}
                </Typography>
              </Stack>
            </Stack>
            <Box
              component={"div"}
              dangerouslySetInnerHTML={{
                __html:
                  data.caseStudy.caseStudiesOptions?.companyDescription ?? "",
              }}
            />
          </Stack>

          <Stack gap={2}>
            <Typography
              variant="h5"
              sx={{ textDecoration: "underline !important" }}
            >
              The Challenge
            </Typography>
            <Box
              component="div"
              sx={{
                "& ul": {
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  margin: 0,
                },
                "& li": {
                  marginBottom: "0.5rem",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: data.caseStudy.caseStudiesOptions?.challenges ?? "",
              }}
            />
          </Stack>
          <Stack gap={2}>
            <Typography
              variant="h5"
              sx={{ textDecoration: "underline !important" }}
            >
              Solutions
            </Typography>
            <Box
              component="div"
              sx={{
                "& ul": {
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  margin: 0,
                },
                "& li": {
                  marginBottom: "0.5rem",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: data.caseStudy.caseStudiesOptions?.solutions ?? "",
              }}
            />
          </Stack>
          <Stack gap={2}>
            <Typography
              variant="h5"
              sx={{ textDecoration: "underline !important" }}
            >
              Results
            </Typography>
            <Box
              component="div"
              sx={{
                "& ul": {
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  margin: 0,
                },
                "& li": {
                  marginBottom: "0.5rem",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: data.caseStudy.caseStudiesOptions?.results ?? "",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CaseStudyDetail;
