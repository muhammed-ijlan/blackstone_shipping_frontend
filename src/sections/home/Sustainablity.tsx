import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import CustomSlider from "src/components/customSlider/CustomSlider";
import SectionHead from "src/components/sectionHead/SectionHead";
import container from "src/assets/images/container1.png"

const Sustainablity = () => {
    const cards = [
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
        {
            title:"Commitment to Our Planet",
            image:container,
            description:"At Blackstone Shipping, we are dedicated to reducing our environmental impact through concrete actions. Our initiatives include optimizing routes via Green Forwarding, implementing energy-saving and waste-reduction measures in our Eco-Offices, and collaborating with industry leaders through Green Partnerships to promote sustainable shipping. We actively address climate change and support decarbonization efforts within the transport and logistics sector."
        },
    ]
  return (
    <Stack
      color={"black"}
      sx={{
        width: "100%",
        height: "100%",
        background: "rgba(245, 247, 251, 1)",
        pb:5
      }}
    >
      <Container maxWidth="lg">
        <SectionHead title="Sustainability Commitment  " subTitle="Driving Responsible Logistics Through Impactful Practices, Global Goals, and a Vision for a Greener Future" color="rgba(109, 110, 113, 1)" />

      <CustomSlider >
    {
      cards.map((card,index) =>(
        <Stack gap={2} width={"500px"} sx={{
          minWidth: "400px",
          maxWidth: "400px",
          borderRadius: "5px",
          mb: 3,
          height: "100%",
          bgcolor:"white",
          p:3
      }}>
          <Box component={"img"} src={card.image} width={"100%"} borderRadius={"8px"}/>
          <Typography  variant='h3' fontWeight={600} sx={{borderBottom:"2px solid rgba(14, 159, 110, 1)" , pb:2}} >{card.title}</Typography>
          <Typography variant="subtitle2" color="rgba(109, 110, 113, 1)">{card.description}</Typography>
        </Stack>
      ))
    }
  </CustomSlider>

 <Stack alignItems={"center"}>
            <Button size='large'  variant='outlined'>Explore More  </Button>
        </Stack>

      </Container>
    </Stack>
  );
};

export default Sustainablity;
