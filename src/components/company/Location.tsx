import React, { useState, useRef } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_OFFICE_LOCATIONS } from 'src/graphql/queries';
import { GetOfficeLocationsResponse } from 'src/types/graphql/types/company.types';
import { useRouter } from 'src/routes/hooks';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SelectedLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  countryId: string;
}


const LocationMap = () => {

  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mobileInfoRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery<GetOfficeLocationsResponse>(GET_OFFICE_LOCATIONS, {
    variables: {
      count: 0,
      after: null,
      search: "",
    },
  });


  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  const firstNode = data?.officeLocations.nodes[0]?.officeLocationsOptions;
  const defaultLat = parseFloat(firstNode?.latitude ?? '0');
  const defaultLng = parseFloat(firstNode?.longitude ?? '0');

  const defaultCenter = {
    lat: isNaN(defaultLat) ? 0 : defaultLat,
    lng: isNaN(defaultLng) ? 0 : defaultLng,
  };

  return (
    <Stack>

      <Typography variant="h6" my={{ xs: 1, md: 4 }}>
        OFFICE LOCATIONS
      </Typography>

      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Box component={"div"} sx={{ height: { xs: "60vh", md: '90vh' }, width: '100%', position: "relative" }}>
          <Map
            defaultZoom={2}
            defaultCenter={defaultCenter}
            gestureHandling="cooperative"
            disableDefaultUI
            zoomControl
            streetViewControl={false}
            mapTypeControl={false} 
            fullscreenControl
          >
            {data?.officeLocations.nodes.map((location, index) => {
              const {
                latitude,
                longitude,
                address,
                phoneNumber,
                emailAddress,
              } = location.officeLocationsOptions;

              const lat = parseFloat(latitude);
              const lng = parseFloat(longitude);

              if (isNaN(lat) || isNaN(lng)) return null;

              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  title={location.title}
                  onClick={() => {
                    setSelectedLocation({
                      lat,
                      lng,
                      name: location.title,
                      address,
                      phone: phoneNumber,
                      email: emailAddress,
                      image: location.officeLocationsOptions.country.nodes[0].countriesOptions?.countryFlag?.node?.sourceUrl ?? "",
                      countryId: location.officeLocationsOptions.country.nodes[0]?.id ?? ""
                    });

                    if (isMobile && mobileInfoRef.current) {
                      setTimeout(() => {
                        const yOffset = -150;
                        const ref = mobileInfoRef.current;
                        if (ref) {
                          const y = ref.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                />
              );
            })}

            {selectedLocation && (
              <Stack
                display={{ xs: "none", md: "flex" }}
                className="custom-info-window"
                onClick={() => {
                  if (selectedLocation?.countryId) {
                    router.push(`/support/${selectedLocation.countryId}`);
                  }
                }}
                sx={{ cursor: "pointer" }}
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <Box sx={{ borderRadius: "4px" }} width={"48px"} component={"img"} src={selectedLocation.image} alt={selectedLocation.name} />
                  <Typography color='rgba(11, 19, 40, 1)' variant="h4" sx={{ fontWeight: "600 !important" }} width={"60%"}>
                    {selectedLocation.address.split("\r\n")[0]}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" gutterBottom>
                  {selectedLocation.address}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  <strong>Phone:</strong> {selectedLocation.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedLocation.email}
                </Typography>
              </Stack>
            )}
          </Map>
        </Box>
      </APIProvider>
      <Stack  ref={mobileInfoRef}>

      {selectedLocation && (
        <Stack
         
          display={{ xs: "flex", md: "none" }}
          className="custom-info-window"
          sx={{ cursor: "pointer", paddingTop: 2 }} // optional spacing
          onClick={() => {
            if (selectedLocation?.countryId) {
              router.push(`/support/${selectedLocation.countryId}`);
            }
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Box sx={{ borderRadius: "4px" }} width={"48px"} component={"img"} src={selectedLocation.image} alt={selectedLocation.name} />
            <Typography color='rgba(11, 19, 40, 1)' variant="h4" sx={{ fontWeight: "600 !important" }} width={"60%"}>
              {selectedLocation.address.split("\r\n")[0]}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" gutterBottom>
            {selectedLocation.address}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            <strong>Phone:</strong> {selectedLocation.phone}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {selectedLocation.email}
          </Typography>
        </Stack>
      )}
      </Stack>
    </Stack>
  );
};

export default LocationMap;
