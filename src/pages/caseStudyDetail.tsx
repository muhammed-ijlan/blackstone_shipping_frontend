import { useQuery } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_SINGLE_CASE_STUDY } from "src/graphql/queries";
import CaseStudyDetail from "src/sections/newsDetails/CaseStudyDetail";
import {
  GetCaseStudyResponse,
  GetCaseStudyVars,
} from "src/types/graphql/types/resourses.types";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<GetCaseStudyResponse, GetCaseStudyVars>(
    GET_SINGLE_CASE_STUDY,
    {
      skip: !id,
      variables: { slug: id ?? "" },
    }
  );

  if (loading) return <LoadingFallback />;

  if (error) {
    return (
      <Container maxWidth="xl">
        <Typography color="error">
          Failed to load case study: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!data?.caseStudy) {
    return (
      <Container maxWidth="xl">
        <Typography>No case study found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <CaseStudyDetail data={data} />
    </Container>
  );
};

export default Page;
