import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import SectionHead from "src/components/sectionHead/SectionHead";

const Contact = () => {
  return (
    <Container maxWidth="xl" sx={{mb:10}}>
      <Stack direction={"row"} gap={8}>
        <SectionHead
          title="Contact  Us  "
          subTitle="Contact us for quick and reliable support!"
          color="rgba(109, 110, 113, 1)"
          content="We’re here to assist you! Fill out the form, and our team will get back to you as soon as possible. Let’s work together to find the perfect solution for your business needs."
        />
        <Stack mt={10} width={"100%"}>
          <Grid container rowGap={2} columnSpacing={3}>
            <Grid size={{ xs: 6, md: 12 }}  >
              <TextField variant="outlined" label="Name" size="medium"  fullWidth/>
            </Grid>
            <Grid  size={{ xs: 12, md: 6 }}>
              <TextField variant="outlined" label="Email" size="medium" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField variant="outlined" label="Phone Number" size="medium" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField multiline minRows={3} variant="outlined" label="Message" size="medium" fullWidth />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Button size="large" fullWidth variant="contained">Submit</Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Contact;
