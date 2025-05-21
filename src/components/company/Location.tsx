import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_LOCATION } from 'src/graphql/queries';
import { GetCompanyOfficeLocationsResponse } from 'src/types/graphql/types/company.types';

const LocationMap = () => {
  const apiKey = 'AIzaSyCKalsabfN93i-SdYJU16XRJrGqd2pYeH4';
  const { data } = useQuery<GetCompanyOfficeLocationsResponse>(GET_COMPANY_LOCATION);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
    address: string;
    phone: string;
    email: string;
  } | null>(null);

  // const defaultCenter = {
  //   lat: parseFloat(data?.locations.nodes[0].locationsOptions.latitude ?? '0'), 
  //   lng: parseFloat(data?.locations.nodes[0].locationsOptions.longitude ?? '0'),
  // };
  // console.log(defaultCenter)

  return (
    <Stack>
      <Typography variant="h3" my={4}>
        {data?.page.companyPageOfficeLocationSection.officeLocationsTitle.toUpperCase()}
      </Typography>

      <APIProvider apiKey={apiKey}>
        <div style={{ height: '100vh', width: '100%' }}>
          <Map
            // defaultCenter={defaultCenter}
            defaultZoom={3}
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
              <InfoWindow
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {selectedLocation.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {selectedLocation.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {selectedLocation.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedLocation.email}
                  </Typography>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </Stack>
  );
};

export default LocationMap;
