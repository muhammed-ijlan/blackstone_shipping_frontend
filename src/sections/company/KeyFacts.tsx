import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCompanyKeyFactsResponse } from "src/types/graphql/types/company.types";

const KeyFacts = ({ data }: { data: GetCompanyKeyFactsResponse }) => {
  return (
    <Stack
      sx={{
        backgroundImage: `url(${data.page.companyPageKeyFactsSection.keyFactsBackgroundImage.node.sourceUrl})`,
        backgroundSize: "cover",
        color: "white",
      }}
      py={10}
    >
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{textAlign:"center !important"}} mb={5}>
          {data.page.companyPageKeyFactsSection.keyFactsTitle.toUpperCase()}
        </Typography>


        <Grid container spacing={4} justifyContent={"center"}>
            {
                data.keyFacts.nodes.map((item,index) =>(
                    <Grid  size={{xs:12,sm:6,lg:4}} key={index} sx={{width:"295px !important  ",height:'184px',}}>
                        <Stack sx={{width:"295px",height:'184px',color:"rgba(33, 52, 72, 1)",background:"white",borderRadius:"8px",p:3}}>
                            <Typography variant="h3">{item.title.toUpperCase()}</Typography>
                            <Typography variant="body1" fontWeight={500} dangerouslySetInnerHTML={{__html: item.content}} color="rgba(109, 110, 113, 1)"/>
                        </Stack>
                    </Grid>
                ))
            }
        </Grid>
      </Container>
    </Stack>
  );
};

export default KeyFacts;
