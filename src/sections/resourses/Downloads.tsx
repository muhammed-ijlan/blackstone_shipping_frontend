import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Iconify } from "src/components/iconify";

const Downloads = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 6 }}>
      <Stack gap={3}>
        <Typography variant="h2">Downloads</Typography>
        <Typography variant="body1">
          Discover our most valuable resources to help you understand and
          leverage the full potential of Blackbox Freight.
        </Typography>

        <Grid container>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                borderRadius: "8px",
                background: "rgba(45, 55, 72, 1)",
                color: "white",
                padding: 3,
              }}
              justifyContent={"space-between"}
              gap={2}
            >
              <Stack gap={3}>
                <Stack gap={2} direction={"row"}>
                  <Box
                    component={"img"}
                    alt="img"
                    width={"21px"}
                    height="21px"
                  />
                  <Typography sx={{ fontSize: "32px !important" }}>
                    Brochure
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  Quick overviews of our services and platform capabilities.
                </Typography>
              </Stack>
              <ButtonGroup
              sx={{
                width:"100%",
                height:"60px"
              }}
              fullWidth
                variant="contained"
                aria-label="Button group with a nested menu"
              >
                <Button>Download</Button>
                <Button
                sx={{width:"60px"}}
                  size="small"
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                >
                  <Iconify icon={"charm:download"} />
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Downloads;
