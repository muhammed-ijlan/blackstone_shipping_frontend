import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { CountryPageData } from "src/types/graphql/types/support.types";

const GlobalOffices = ({ data }: { data: CountryPageData }) => {
  const { id } = useParams();
  const officeLocations = data.officeLocations.nodes.filter((office) =>
    office.countries.nodes.some((country) => country.id !== id)
  );
  return (
    <Stack
      gap={2}
      my={6}
      sx={{
        border: "1px solid rgba(182, 183, 184, 1)",
        borderRadius: "8px",
        p: 3,
      }}
    >
      <Typography
        sx={{ textAlign: "left !important" }}
        variant="h2"
        color="rgba(11, 19, 40, 0.6)"
      >
        Global offices
      </Typography>
      <Stack direction="row" gap={2} flexWrap={"wrap"}>
        {officeLocations.map((office) => (
          <>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                justifyContent: "center",
                padding: "17px 59px",
                border: "1px solid rgba(217, 217, 217, 1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1" color="rgba(11, 19, 40, 1)">
                {office.title}
              </Typography>
            </Box>

                 <Typography  variant="h4" sx={{display:{xs:"flex",sm:"none"},textAlign:"left !important"}}>
                              • &nbsp;&nbsp;{office.title}
                            </Typography>
          </>
        ))}
      </Stack>
    </Stack>
  );
};

export default GlobalOffices;
