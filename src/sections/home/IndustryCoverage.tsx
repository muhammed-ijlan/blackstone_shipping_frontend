import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SectionHead from "src/components/sectionHead/SectionHead";
import icon from "src/assets/icons/icon.png";
import IndustryCoverageCard from "../../components/home/IndustryCoverageCard";

const IndustryCoverage = () => {
  const icons = [
    {
      title: "Manufacturing",
      icon,
      subTitle:"Transporting raw materials, components, machinery, equipment, and finished goods."
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
    {
      title: "Manufacturing",
      icon,
    },
  ];

  return (
    <Stack
      color={"white"}
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(114.75deg, #242E40 100%, #343D4D 0%)",
      }}
    >
      <Container maxWidth="lg">
        <SectionHead title="INDUSTRY  COVERAGE" color="white" />
        <Grid container rowGap={5} my={5} align="center">
          {icons.map((item, index) => (
            <Grid size={{ xs: 6, md: 4 }}  key={index}>
              <IndustryCoverageCard  item={item}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default IndustryCoverage;
