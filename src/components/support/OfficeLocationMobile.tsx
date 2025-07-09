import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  GET_COUNTRIES,
  GET_OFFICE_LOCATIONS_BY_COUNTRY,
  GET_OFFICE_LOCATION_BY_URI,
} from "src/graphql/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "src/routes/hooks";


interface Country {
  id: string;
  name: string;
  slug: string;
  countriesOptions?: {
    countryFlag?: {
      node?: {
        sourceUrl: string;
      };
    };
  };
}


interface OfficeLocation {
  id: string;
  title: string;
  uri: string;
}

export interface OfficeLocationDetails {
  title: string;
  officeLocationsOptions: {
    address: string;
    phoneNumber: string;
    emailAddress: string;
    country: {
      nodes: {
        id: string;
        name: string;
        countriesOptions?: {
          countryFlag?: {
            node?: {
              sourceUrl: string;
            };
          };
        };
      }[];
    };
  };
}


const OfficeLocationMobile = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUri, setSelectedUri] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<OfficeLocationDetails | null>(null);

  const router = useRouter();

  const { data: countriesData } = useQuery(GET_COUNTRIES);
  const [getCities, { data: citiesData }] = useLazyQuery(GET_OFFICE_LOCATIONS_BY_COUNTRY);
  const [getLocationDetails] = useLazyQuery(GET_OFFICE_LOCATION_BY_URI, {
    onCompleted: (data) => setSelectedLocation(data.officeLocation),
  });

  const countries: Country[] = countriesData?.countries?.nodes || [];
  const cities: OfficeLocation[] = citiesData?.officeLocations?.nodes || [];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedUri("");
    setSelectedLocation(null);
    getCities({ variables: { slug: [value] } });
  };

  const handleCityChange = (uri: string) => {
    setSelectedUri(uri);
    getLocationDetails({ variables: { uri } });
  };


  useEffect(() => {
    if (countries.length && !selectedCountry) {
      const defaultCountry = countries[0]
     
  
      if (defaultCountry) {
        setSelectedCountry(defaultCountry.slug);
  
        getCities({ variables: { slug: [defaultCountry.slug] } });
      }
    }
  }, [countries]);
  useEffect(() => {
    if (cities.length && !selectedUri) {
      const firstCity = cities[0];
      if (firstCity) {
        setSelectedUri(firstCity.uri);
        getLocationDetails({ variables: { uri: firstCity.uri } });
      }
    }
  }, [cities]);
  
  return (
    <Stack
      display={{ xs: "flex", md: "none" }}
      gap={2}
      mt={4}
      sx={{ backgroundColor: "rgba(45, 55, 72, 1)", color: "white" }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <FormControl fullWidth>
            <InputLabel sx={{
              color: "white",
              "&.Mui-focused": {
                color: "white", 
              },
            }}>Country</InputLabel>
            <Select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              label="Country"
              sx={{
                color: "white",
                borderRadius: "6px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(249, 250, 251, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(249, 250, 251, 1)",
                  color: "white",
                },
                ".MuiSvgIcon-root": {
                  color: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9CA3AF",
                },
              }}
            >
              {countries.map((country) => (
               <MenuItem key={country.id} value={country.slug}>
               <Box display="flex" alignItems="center" gap={1}>
                 <img
                   src={country.countriesOptions?.countryFlag?.node?.sourceUrl} 
                   alt={country.name}
                   style={{
                     width: 20,
                     height: 14,
                     borderRadius: 2,
                     objectFit: "cover",
                   }}
                 />
                 <Typography fontSize={14}>{country.name}</Typography>
               </Box>
             </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <FormControl fullWidth disabled={!selectedCountry}>
            <InputLabel sx={{
              color: "white",
              "&.Mui-focused": {
                color: "white", 
              },
            }}>City</InputLabel>
            <Select
              value={selectedUri}
              onChange={(e) => handleCityChange(e.target.value)}
              label="City"
              sx={{
                color: "white",
                borderRadius: "6px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(249, 250, 251, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(249, 250, 251, 1)",
                  color: "white",
                },
                ".MuiSvgIcon-root": {
                  color: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9CA3AF",
                },
              }}
            >
              {cities.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.uri}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(54, 66, 86, 0.7)",
                    },
                  }}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedLocation && (
        <Stack sx={{ gap: 2 }}>
          <Stack onClick={() => router.push(`/support/${selectedLocation.officeLocationsOptions.country.nodes[0].id}`)}>
            <Typography fontWeight={600} mb={1}>
              Address
            </Typography>
            <Stack
              sx={{
                p: 2,
                border: "1px solid rgba(249, 250, 251, 1)",
                borderRadius: "4px",
                background: "rgba(54, 66, 86, 1)",
              }}
            >
              <Typography
                fontSize={14}
                dangerouslySetInnerHTML={{
                  __html:
                    selectedLocation.officeLocationsOptions.address?.replace(
                      /\r?\n/g,
                      "<br />"
                    ) || "N/A",
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography fontWeight={600} mb={1}>
              Phone
            </Typography>
            <Stack
              sx={{
                p: 2,
                border: "1px solid rgba(249, 250, 251, 1)",
                borderRadius: "4px",
                background: "rgba(54, 66, 86, 1)",
              }}
            >
              <Typography mt={0.5}>
                {selectedLocation.officeLocationsOptions.phoneNumber || "N/A"}
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography fontWeight={600} mb={1}>
              Email
            </Typography>
            <Stack
              sx={{
                p: 2,
                border: "1px solid rgba(249, 250, 251, 1)",
                borderRadius: "4px",
                background: "rgba(54, 66, 86, 1)",
              }}
            >
              <Typography mt={0.5}>
                {selectedLocation.officeLocationsOptions.emailAddress || "N/A"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default OfficeLocationMobile;
