import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Grid,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { ImageNode } from "src/types/graphql/types/services.types";

interface CarbonCalculatorInterface {
  calculatorSectionTitle: string;
  calculatorSectionImage: ImageNode;
  calculatorSectionContent: string;
}

const CarbonCalculator = ({ data }: { data: CarbonCalculatorInterface }) => {
  type PortOption = {
    flag: string | undefined; label: string; value: string 
};

  const [pol, setPol] = useState<PortOption | null>(null);
  const [pod, setPod] = useState<PortOption | null>(null);
  const [grossWeight, setGrossWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("KGS");
  const [mtco2e, setMtco2e] = useState("0 MTCO2e");
  const [polid, setPolid] = useState("");
  const [podid, setPodid] = useState("");

  // Simulated port data from the original script
  const availableTags = [
    { label: "IND", value: "India", flag: "https://flagcdn.com/w40/in.png" },
    { label: "CHN", value: "China", flag: "https://flagcdn.com/w40/cn.png" },
    { label: "NEP", value: "Nepal", flag: "https://flagcdn.com/w40/np.png" },
    { label: "BHU", value: "Bhutan", flag: "https://flagcdn.com/w40/bt.png" },
  ];

  // Define the type for portDistances with an index signature
  interface PortDistance {
    [key: string]: { [key: string]: number };
  }

  // Simulated distance between ports (in km) - replace with actual data or API
  const portDistances: PortDistance = {
    India: { China: 5000, Nepal: 1000, Bhutan: 800 },
    China: { India: 5000, Nepal: 3000, Bhutan: 2500 },
    Nepal: { India: 1000, China: 3000, Bhutan: 400 },
    Bhutan: { India: 800, China: 2500, Nepal: 400 },
  };

  // Emission factor (tons CO2e per ton of cargo per km)
  const emissionFactor = 0.00002;

  useEffect(() => {
    if (pol) setPolid(pol.label);
    if (pod) setPodid(pod.label);
  }, [pol, pod]);

  const handleCalculate = () => {
    if (!polid || !podid || !grossWeight) {
      alert("Please fill all fields");
      return;
    }

    let weightInTons = parseFloat(grossWeight);
    if (weightUnit === "KGS") {
      weightInTons = weightInTons / 1000;
    }

    const polCountry = availableTags.find((tag) => tag.label === polid)?.value;
    const podCountry = availableTags.find((tag) => tag.label === podid)?.value;

    if (!polCountry || !podCountry) {
      alert("Invalid port selection");
      return;
    }

    const distance = portDistances[polCountry]?.[podCountry] || 0;

    if (distance === 0) {
      alert("Invalid port combination");
      return;
    }

    const calculatedMtco2e =
      (weightInTons * distance * emissionFactor).toFixed(2) + " MTCO2e";
    setMtco2e(calculatedMtco2e);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <img
              src={data.calculatorSectionImage.node.sourceUrl}
              alt="Carbon Emissions"
              width="100%"
              height="400px"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h2" gutterBottom>
              {data.calculatorSectionTitle}
            </Typography>
            <Autocomplete
              options={availableTags}
              getOptionLabel={(option) => option.label}
              value={pol}
              onChange={(event, newValue) => setPol(newValue)}
              renderOption={(props, option) => (
                <li {...props} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img
                    src={option.flag}
                    alt={option.label}
                    width="20"
                    style={{ borderRadius: '3px' }}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={pol?.flag} alt={pol?.label} width="20" style={{ borderRadius: '3px' }} />
                      </InputAdornment>
                    ),
                  }}
                  label="Port of Loading (POL)"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Autocomplete
              options={availableTags}
              getOptionLabel={(option) => option.label}
              value={pod}
              onChange={(event, newValue) => setPod(newValue)}
              renderOption={(props, option) => (
                <li {...props} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img
                    src={option.flag}
                    alt={option.label}
                    width="20"
                    style={{ borderRadius: '3px' }}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={pod?.flag} alt={pod?.label} width="20" style={{ borderRadius: '3px' }} />
                      </InputAdornment>
                    ),
                  }}
                  label="Port of Discharge (POD)"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Grid container spacing={2} alignItems="center" marginTop={1}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Gross Weight"
                  type="number"
                  value={grossWeight}
                  onChange={(e) => setGrossWeight(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Weight Unit</InputLabel>
                  <Select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                    label="Weight Unit"
                  >
                    <MenuItem value="KGS">KGS</MenuItem>
                    <MenuItem value="TON">TON</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box
                  sx={{
                    borderBottom: "1px solid rgba(45, 55, 72, 1)",
                    padding: 1,
                  }}
                >
                  <Typography
                    variant="h3"
                    color="rgba(32, 189, 103, 1)"
                    sx={{ textAlign: "center !important" }}
                  >
                    {mtco2e}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleCalculate}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "medium italic",
              "& p": {
                fontStyle: "italic",
              },
            }}
            color="rgba(45, 55, 72, 0.5)"
            dangerouslySetInnerHTML={{
              __html: data.calculatorSectionContent,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CarbonCalculator;
