import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const coordinates = [
  { lat: 9.9312, lng: 76.2673, name: 'Kochi' },
  { lat: 13.008422, lng: 77.651924, name: 'Blackstone Shipping' },
  { lat: 13.004262, lng: 80.227443, name: 'Blackstone Shipping' },
];

const LocationMap = () => {
  const apiKey = 'AIzaSyCKalsabfN93i-SdYJU16XRJrGqd2pYeH4';

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          center={{ lat: 13.008422, lng: 77.651924 }}
          zoom={6}
        //   mapId="1fc10bb30e5b0c2663caab87 "
          gestureHandling="greedy" 
          disableDefaultUI={false}
          zoomControl={true}
          streetViewControl={true}
          mapTypeControl={true}
          fullscreenControl={true}
        >
          {coordinates.map((coord, index) => (
            <Marker
              key={index}
              position={{ lat: coord.lat, lng: coord.lng }}
              title={coord.name}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default LocationMap;
