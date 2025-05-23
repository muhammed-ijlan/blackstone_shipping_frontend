import { Button, Container, Stack,Grid } from '@mui/material';
import ServiceCard from 'src/components/home/ServiceCard';
import SectionHead from 'src/components/sectionHead/SectionHead';
import { useQuery } from '@apollo/client';
import { GET_SERVICES } from 'src/graphql/queries';
import CustomArrowButton from 'src/components/CustomArrowButton';

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
    <Container maxWidth="xl">
      <Stack mb={5}>
        <SectionHead title={heading} titleColor='rgba(26, 32, 44, 1)'/>

        <Grid container rowGap={4}  mb={5} columnSpacing={2.3}  justifyContent={""}  sx={{height: "auto" }} >
          {services.map((item, index) => (
            <Grid size={{xs: 12, sm: 6, md: 3}} key={index} p={0} sx={{width:{xs:"100%",sm:"295px !important"}}}>
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
         <CustomArrowButton name='Explore More' sx={{py:"15px",px:"24px"}}/>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Serivces;
