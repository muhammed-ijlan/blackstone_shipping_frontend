import { Button, Container, Grid, Stack } from '@mui/material'
import ServiceCard from 'src/components/home/ServiceCard'
import SectionHead from 'src/components/sectionHead/SectionHead'

import service from "src/assets/images/service.jpg"

const Serivces = () => {


    const services = [
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },
        {
            title:"Ocean Freight",
            image:service,
            link:"",
        },

    ];

  return (
    <Container maxWidth="lg" >
         <Stack mb={5}>

        <SectionHead title="OUR SERVICES"  />

         <Grid container rowGap={5} my={5} align="center">
          {services.map((item, index) => (
              <Grid size={{ xs: 6, md: 3 }}  key={index}>
                <ServiceCard item={item}/>
            </Grid>
          ))}
        </Grid>
        <Stack alignItems={"center"}>
            <Button size='large'  variant='outlined'>Explore More  </Button>
        </Stack>
          </Stack>
    </Container>
  )
}

export default Serivces