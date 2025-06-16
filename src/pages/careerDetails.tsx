import { useQuery } from "@apollo/client";
import { Container, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import Banner from "src/components/banner/Banner";
import ApplyNowForm from "src/components/careers/ApplyNowForm";
import CareerBanner from "src/components/careers/CareerBanner";
import JobDetails from "src/components/careers/JobDetails";
import { GET_JOB_POST_DETAILS_BY_ID } from "src/graphql/queries";
import {
  GetJobPostDetailsResponse,
  GetJobPostDetailsVariables,
} from "src/types/graphql/types/careers.types";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<
    GetJobPostDetailsResponse,
    GetJobPostDetailsVariables
  >(GET_JOB_POST_DETAILS_BY_ID, {
    variables: { id: id ?? "" },
    skip: !id,
  });

  if (!id) {
    return null;
  }

  return (
    <Container maxWidth={"xl"} >
      {data && (
        <Stack gap={6}>
          <CareerBanner data={data} />
          <JobDetails data={data}/>
          <ApplyNowForm/>
        </Stack>
      )}
    </Container>
  );
};

export default Page;
