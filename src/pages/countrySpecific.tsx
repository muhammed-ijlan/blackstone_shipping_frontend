import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import LoadingFallback from "src/components/LoadingFallback";
import { GET_COUNTRY_PAGE } from "src/graphql/queries";
import Contact from "src/sections/support/Contact";
import CountrySpecificBanner from "src/sections/support/CountrySpecificBanner";
import GlobalOffices from "src/sections/support/GlobalOffices";
import Services from "src/sections/support/Services";
import {
  CountryPageData,
  CountryPageVars,
} from "src/types/graphql/types/support.types";

const Page = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<CountryPageData, CountryPageVars>(
    GET_COUNTRY_PAGE,
    {
      variables: { uri: id ?? "" },
      skip: !id,
    }
  );

  if (loading) return <LoadingFallback />;

  return (
    <Container maxWidth="xl">
      {data && (
        <>
          <CountrySpecificBanner data={data} />
          <Services data={data} />
          <Contact data={data} />
          <GlobalOffices data={data} /> 
        </>
      )}
    </Container>
  );
};

export default Page;
