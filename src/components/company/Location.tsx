import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_LOCATION } from 'src/graphql/queries';
import { GetCompanyOfficeLocationsResponse } from 'src/types/graphql/types/company.types';

const LocationMap = ({ header = true }: { header: boolean }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const { data } = useQuery<GetCompanyOfficeLocationsResponse>(GET_COMPANY_LOCATION);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
    address: string;
    phone: string;
    email: string;
  } | null>(null);

  const defaultCenter = {
    lat: parseFloat(data?.locations.nodes[0].locationsOptions.latitude ?? '0'),
    lng: parseFloat(data?.locations.nodes[0].locationsOptions.longitude ?? '0'),
  };

  return (
    <Stack>
      {
        header &&
        <Typography variant="h6" my={4}>
          {data?.page.companyPageOfficeLocationSection.officeLocationsTitle.toUpperCase()}
        </Typography>
      }

      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <div style={{ height: '90vh', width: '100%' }}>
          <Map
            center={defaultCenter}
            defaultZoom={2}
            gestureHandling="cooperative"
            disableDefaultUI={true}
            zoomControl
            streetViewControl
            mapTypeControl
            fullscreenControl
          >
            {data?.locations.nodes.map((location, index) => {
              const {
                latitude,
                longitude,
                name,
                address,
                phoneNumber,
                emailAddress,
              } = location.locationsOptions;

              const lat = parseFloat(latitude);
              const lng = parseFloat(longitude);

              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  title={name}
                  onClick={() =>
                    setSelectedLocation({
                      lat,
                      lng,
                      name,
                      address,
                      phone: phoneNumber.toString(),
                      email: emailAddress,
                    })
                  }
                />
              );
            })}

            {selectedLocation && (
              <Stack  className="custom-info-window"  sx={{display:{xs:"none",md:"flex"},flexDirection:"column",}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {selectedLocation.name}
                </Typography>
                <Divider sx={{my:1}}/>
                <Typography variant="body2" gutterBottom color='rgba(45, 55, 72, 0.8)'>
                  {selectedLocation.address}
                </Typography>
                <Divider sx={{my:1}}/>
                <Typography variant="body2">
                  <strong>Phone:</strong> {selectedLocation.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedLocation.email}
                </Typography>
              </Stack>
            )}
        {selectedLocation && (
              <Stack  className="custom-info-window"  sx={{display:{xs:"flex",md:"none"},flexDirection:"column",}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color='rgba(11, 19, 40, 1)'>
                  {selectedLocation.name}
                </Typography>
                <Divider sx={{my:1}}/>
                <Typography variant="body2" gutterBottom color='rgba(45, 55, 72, 0.8)'>
                  {selectedLocation.address}
                </Typography>
                <Divider sx={{my:1}}/>
                <Typography variant="body2">
                  <strong>Phone:</strong> {selectedLocation.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedLocation.email}
                </Typography>
              </Stack>
            )}
          </Map>
        </div>


      </APIProvider>
    </Stack>
  );
};

export default LocationMap;
