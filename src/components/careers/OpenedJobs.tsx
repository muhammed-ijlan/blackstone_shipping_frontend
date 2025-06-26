import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import search from "src/assets/icons/searchWhite.png";
import {
  GetCareersPageData,
  JobOpeningsResponse,
} from "src/types/graphql/types/careers.types";
import JobCard from "./JobCard";
import { useQuery } from "@apollo/client";
import { GET_JOB_OPENINGS } from "src/graphql/queries";

type FormState = {
  category: string;
  location: string;
  job: string;
};

const OpenedJobs = ({ data }: { data: GetCareersPageData }) => {
  const { data: jobOpeningsData } =
    useQuery<JobOpeningsResponse>(GET_JOB_OPENINGS);

  const [formState, setFormState] = useState<FormState>({
    category: "",
    location: "",
    job: "",
  });

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <Stack gap={4}>
      <Grid container spacing={{ xs: 1.5, md: 3 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                height: "60px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px !important",
                fontWeight: "600 !important",
              },
            }}
            fullWidth
            label="Jobs"
            value={formState.job}
            onChange={handleChange("job")}
          />
        </Grid>
        <Grid size={{ xs: 6, lg: 2 }}>
          <TextField
            select
            fullWidth
            label="Category"
            value={formState.category}
            onChange={handleChange("category")}
          >
            {data?.jobCategories?.nodes?.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, lg: 3.5 }}>
          <TextField
            select
            fullWidth
            label="Location"
            value={formState.location}
            onChange={handleChange("location")}
          >
            {data?.jobLocations?.nodes?.map((location) => (
              <MenuItem key={location.name} value={location.name}>
                {location.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, lg: 2.5 }}>
          <Button
            sx={{
              height: { xs: "50px", md: "100%" },
              // fontSize: "18px !important",
              typography: "h4",
              fontWeight: "600 !important",
              letterSpacing: "3% !important",
              background:"rgba(26, 86, 219, 1)",
              "&:hover": {
                background:"rgba(26, 86, 219, 0.9)",
              },  

            }}
            fullWidth
            variant="contained"
            startIcon={
              <Box
                component={"img"}
                sx={{ width: "24px" }}
                src={search}
                alt="img"
              />
            }
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Stack
        sx={{
          borderRadius: "8px",
          border:{xs:"none",sm: "1px solid rgba(206, 208, 212, 1)"},
          padding: {xs:0,sm:3},
        }}
        gap={3}
      >
        {jobOpeningsData?.jobOpenings.nodes.map((jobCard, index) => (
          <React.Fragment key={index}>
            <JobCard data={jobCard} />
            {index !== jobOpeningsData?.jobOpenings.nodes.length - 1 && (
              <Divider sx={{   borderColor: "rgba(206, 208, 212, 1)",display:{xs:"none",sm:"block"} }} />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default OpenedJobs;
