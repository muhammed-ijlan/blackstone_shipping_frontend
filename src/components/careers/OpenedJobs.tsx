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
import React, { useEffect, useState } from "react";
import search from "src/assets/icons/searchWhite.png";
import {
  GetJobCategoriesResponse,
  GetJobLocationsResponse,
  GetJobOpeningsResponse,
} from "src/types/graphql/types/careers.types";
import JobCard from "./JobCard";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_JOB_CATEGORIES,
  GET_JOB_LOCATIONS,
  GET_ALL_JOB_OPENINGS,
  GET_JOB_OPENINGS_BY_CATEGORY,
  GET_JOB_OPENINGS_BY_LOCATION,
  GET_JOB_OPENINGS_BY_BOTH,
} from "src/graphql/queries";

type FormState = {
  category: string;
  location: string;
  job: string;
};

const OpenedJobs = () => {
  const [formState, setFormState] = useState<FormState>({
    category: "",
    location: "",
    job: "",
  });

  const { data: jobCategoryData } = useQuery<GetJobCategoriesResponse>(GET_JOB_CATEGORIES);
  const { data: jobLocationData } = useQuery<GetJobLocationsResponse>(GET_JOB_LOCATIONS);

  const [fetchJobs, { data, loading }] = useLazyQuery<GetJobOpeningsResponse>(GET_ALL_JOB_OPENINGS);

  const handleChange =
    (field: keyof FormState) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      };

  const handleSearch = () => {
    const { job, category, location } = formState;

    let query = GET_ALL_JOB_OPENINGS;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variables: any = { search: job || "" };

    if (category && location) {
      query = GET_JOB_OPENINGS_BY_BOTH;
      variables.categorySlug = category;
      variables.locationSlug = location;
    } else if (category) {
      query = GET_JOB_OPENINGS_BY_CATEGORY;
      variables.categorySlug = category;
    } else if (location) {
      query = GET_JOB_OPENINGS_BY_LOCATION;
      variables.locationSlug = location;
    }

    fetchJobs({ query, variables });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Stack gap={4}>
      <Grid container spacing={{ xs: 1.5, md: 3 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TextField
            sx={{
              "& .MuiInputBase-root": { height: "60px" },
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
            <MenuItem value="">All Categories</MenuItem>
            {jobCategoryData?.jobCategories?.nodes?.map((category) => (
              <MenuItem key={category.name} value={category.slug}>
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
            <MenuItem value="">All Locations</MenuItem>
            {jobLocationData?.jobLocations?.nodes?.map((location) => (
              <MenuItem key={location.name} value={location.slug}>
                {location.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, lg: 2.5 }}>
          <Button
            sx={{
              height: { xs: "50px", md: "100%" },
              typography: "h4",
              fontWeight: "600 !important",
              letterSpacing: "3% !important",
              background: "rgba(26, 86, 219, 1)",
              "&:hover": {
                background: "rgba(26, 86, 219, 0.9)",
              },
            }}
            fullWidth
            variant="contained"
            startIcon={
              <Box component="img" sx={{ width: "24px" }} src={search} alt="img" />
            }
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Stack
        sx={{
          borderRadius: "8px",
          border: { xs: "none", sm: "1px solid rgba(206, 208, 212, 1)" },
          padding: { xs: 0, sm: 3 },
        }}
        gap={3}
      >
        {loading ? (
          <Typography>Loading jobs...</Typography>
        ) : data?.jobOpenings?.nodes?.length ? (
          data.jobOpenings.nodes.map((jobCard, index) => (
            <React.Fragment key={index}>
              <JobCard data={jobCard} />
              {index !== data.jobOpenings.nodes.length - 1 && (
                <Divider
                  sx={{
                    borderColor: "rgba(206, 208, 212, 1)",
                    display: { xs: "none", sm: "block" },
                  }}
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <Typography>No jobs found</Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default OpenedJobs;
