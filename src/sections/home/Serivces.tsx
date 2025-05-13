import { Button, Container, Grid, Stack } from '@mui/material';
import ServiceCard from 'src/components/home/ServiceCard';
import SectionHead from 'src/components/sectionHead/SectionHead';
import { useQuery } from '@apollo/client';
import { GET_SERVICES } from 'src/graphql/queries';

export interface ServiceItem {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string | null;
  uri: string;
}

export interface HomePageData {
  page: {
    title: string;
    homePageFieldsOurServices: {
      ourServicesMainHeading: string;
    };
  };
  services: {
    nodes: ServiceItem[];
  };
}


const Serivces = () => {
  const { data, loading, error } = useQuery<HomePageData>(GET_SERVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading services.</p>;

  const heading = data?.page?.homePageFieldsOurServices?.ourServicesMainHeading || 'Our Services';
  const services = data?.services?.nodes || [];

  return (
    <Container maxWidth="lg">
      <Stack mb={5}>
        <SectionHead title={heading} />

        <Grid container rowGap={4} mb={5} alignItems={"center"} justifyContent={"space-around"}>
          {services.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard
                item={{
                  title: item.title,
                  image: item.featuredImage?.node?.sourceUrl || '',
                  link: item.uri,
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center">
          <Button size="large" variant="outlined">Explore More</Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Serivces;
