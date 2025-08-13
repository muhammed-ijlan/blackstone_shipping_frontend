import { useQuery } from "@apollo/client";
import { Container, Stack } from "@mui/material";
import { useParams } from "react-router";
import ApplyNowForm from "src/components/careers/ApplyNowForm";
import CareerBanner from "src/components/careers/CareerBanner";
import JobDetails from "src/components/careers/JobDetails";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_JOB_POST_DETAILS_BY_ID } from "src/graphql/queries";
import {
  GetJobPostDetailsResponse,
  GetJobPostDetailsVariables,
} from "src/types/graphql/types/careers.types";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<
    GetJobPostDetailsResponse,
    GetJobPostDetailsVariables
  >(GET_JOB_POST_DETAILS_BY_ID, {
    variables: { id: id ?? "" },
    skip: !id,
  });

  if (loading) return <LoadingFallback />;

  if (!id) {
    return null;
  }

  return (
    <Container maxWidth={"xl"}>
      {data && (
        <Stack gap={6}>
          <CareerBanner data={data} />
          <JobDetails data={data} />
          <ApplyNowForm data={data}/>
        </Stack>
      )}
    </Container>
  );
};

export default Page;
