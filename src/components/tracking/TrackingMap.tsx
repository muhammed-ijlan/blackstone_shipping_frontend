import React, { useEffect, useMemo, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';

// Interface for API data leg
interface Leg {
  VesselName: string;
  Voyage: string;
  POLName: string;
  ETD: string;
  ATD: string;
  PredictiveETD: string;
  PODName: string;
  ETA: string;
  ATA: string;
  PredictiveETA: string;
  IMO: string;
  MMSI: string;
  BookingNo: string;
  BLNumber: string;
  POLPortCode: string;
  PODPortcode: string;
  ContainerNo: string;
  SealNo: string;
  ISOCode: string;
  GrossWt: string;
  GrossWtUnit: string;
  Volume: string;
  VolumeUnit: string;
  CarrierName: string;
}

// Interface for coordinates
interface Coordinate {
  lat: number;
  lng: number;
}

// Interface for route
interface Route {
  id: string;
  path: Coordinate[];
  color: string;
  vesselName: string;
  voyage: string;
}

// Custom Polyline component
const Polyline: React.FC<{
  path: Coordinate[];
  strokeColor?: string;
  strokeWeight?: number;
}> = ({ path, strokeColor = '#FF0000', strokeWeight = 2 }) => {
  const map = useMap();
  const maps = useMapsLibrary('maps');

  useEffect(() => {
    if (!map || !maps) return;

    const polyline = new maps.Polyline({
      path,
      geodesic: true,
      strokeColor,
      strokeOpacity: 1.0,
      strokeWeight,
    });

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map, maps, path, strokeColor, strokeWeight]);

  return null;
};

// Function to generate approximate maritime waypoints between two ports
const generateMaritimeWaypoints = (start: Coordinate | null, end: Coordinate | null): Coordinate[] => {
  if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
    return [start, end].filter(coord => coord && coord.lat && coord.lng) as Coordinate[];
  }

  const waypoints: Coordinate[] = [start];
  const latDiff = end.lat - start.lat;
  const lngDiff = end.lng - start.lng;
  const steps = 3; // Number of intermediate waypoints

  // Key maritime chokepoints to guide routes
  const chokepoints: Coordinate[] = [
    { lat: 30.0, lng: 32.5 }, // Suez Canal
    { lat: 36.0, lng: -5.0 }, // Strait of Gibraltar
    { lat: 50.0, lng: 0.0 }, // English Channel
    { lat: 15.0, lng: 45.0 }, // Gulf of Aden
    { lat: 15.0, lng: 65.0 }, // Arabian Sea
  ];

  // Logic to add chokepoints based on route
  const addChokepoint = (
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
    chokepoint: Coordinate
  ) => {
    const isBetween = (val: number, min: number, max: number) => val >= Math.min(min, max) && val <= Math.max(min, max);
    return (
      isBetween(chokepoint.lat, startLat, endLat) &&
      isBetween(chokepoint.lng, startLng, endLng)
    );
  };

  // Add relevant chokepoints
  chokepoints.forEach(chokepoint => {
    if (addChokepoint(start.lat, start.lng, end.lat, end.lng, chokepoint)) {
      waypoints.push(chokepoint);
    }
  });

  // Add intermediate waypoints for smoother curves
  for (let i = 1; i < steps; i++) {
    const fraction = i / steps;
    waypoints.push({
      lat: start.lat + latDiff * fraction,
      lng: start.lng + lngDiff * fraction,
    });
  }

  waypoints.push(end);
  // Sort waypoints by approximate path progression
  waypoints.sort((a, b) => {
    const distA = Math.sqrt((a.lat - start.lat) ** 2 + (a.lng - start.lng) ** 2);
    const distB = Math.sqrt((b.lat - start.lat) ** 2 + (b.lng - start.lng) ** 2);
    return distA - distB;
  });

  return waypoints.filter(coord => coord.lat && coord.lng);
};

// Function to fetch port coordinates using a port database or fallback to Google Maps
const fetchPortCoordinates = async (portCode: string, portName: string): Promise<Coordinate | null> => {
  console.log(`Fetching coordinates for port: ${portCode} (${portName})`);

  // Step 1: Try a port database API (e.g., MarineTraffic or SeaRates)
  try {
    // Placeholder for a real port database API
    const response = await fetch(
      `https://api.example-port-database.com/port/${portCode}?api_key=YOUR_PORT_API_KEY`
    );
    const data = await response.json();
    if (data && data.latitude && data.longitude) {
      console.log(`Coordinates found for ${portCode} via port database:`, data);
      return { lat: data.latitude, lng: data.longitude };
    }
  } catch (error) {
    console.warn(`Port database API failed for ${portCode}:`, error);
  }

  // Step 2: Fallback to Google Maps Geocoding API using portName
  try {
    const cleanedPortName = portName.split(',')[0].trim(); // Extract city name (e.g., "Antwerpen" from "Antwerpen, VAN (BEANR), BELGIUM")
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cleanedPortName)}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );
    const data = await response.json();
    console.log(`Geocoding response for ${portCode} (${cleanedPortName}):`, data);
    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
    console.warn(`No coordinates found for port code: ${portCode} (${cleanedPortName})`);
    return null;
  } catch (error) {
    console.error(`Error fetching coordinates for ${portCode} (${portName}):`, error);
    return null;
  }
};

// Component to handle bounds calculation and route rendering
const MapContent: React.FC<{ apiData: Leg[] }> = ({ apiData }) => {
  const map = useMap();
  const maps = useMapsLibrary('maps');
  const [portCoordinates, setPortCoordinates] = useState<Record<string, Coordinate | null>>({});

  // Fetch coordinates for all unique ports
  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords: Record<string, Coordinate | null> = {};
      const uniquePorts = new Set<string>();
      const portNames: Record<string, string> = {};

      // Collect unique port codes and their names
      apiData.forEach(leg => {
        uniquePorts.add(leg.POLPortCode);
        uniquePorts.add(leg.PODPortcode);
        portNames[leg.POLPortCode] = leg.POLName;
        portNames[leg.PODPortcode] = leg.PODName;
      });

      // Fetch coordinates for each port
      for (const portCode of uniquePorts) {
        if (!coords[portCode]) {
          const coord = await fetchPortCoordinates(portCode, portNames[portCode] || portCode);
          coords[portCode] = coord;
        }
      }

      setPortCoordinates(coords);
    };

    if (apiData && apiData.length > 0) {
      fetchCoordinates();
    }
  }, [apiData]);

  // Sort API data by ATD or ETD for chronological order
  const sortedApiData = useMemo(() => {
    if (!apiData) return [];
    return [...apiData].sort((a, b) => {
      const dateA = a.ATD || a.ETD;
      const dateB = b.ATD || b.ETD;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  }, [apiData]);

  // Generate shipping routes dynamically
  const shippingRoutes = useMemo(() => {
    if (!Object.keys(portCoordinates).length) return [];

    return sortedApiData.map((leg, index) => {
      const start = portCoordinates[leg.POLPortCode];
      const end = portCoordinates[leg.PODPortcode];
      if (!start || !end) return null; // Skip invalid routes
      return {
        id: `${leg.POLPortCode}-${leg.PODPortcode}-${index}`,
        path: generateMaritimeWaypoints(start, end),
        color: '#FF0000', // Single color for simplicity
        vesselName: leg.VesselName,
        voyage: leg.Voyage,
      };
    }).filter((route): route is Route => route !== null);
  }, [sortedApiData, portCoordinates]);

  // Calculate bounds to fit all routes
  useEffect(() => {
    if (!map || !maps || !window.google || !shippingRoutes.length) return;

    const bounds = new window.google.maps.LatLngBounds();
    shippingRoutes.forEach(route => {
      route.path.forEach(coord => {
        bounds.extend(coord);
      });
    });
    map.fitBounds(bounds);
  }, [map, maps, shippingRoutes]);

  return (
    <>
      {shippingRoutes.map(route => (
        <Polyline
          key={route.id}
          path={route.path}
          strokeColor={route.color}
          strokeWeight={4}
        />
      ))}
    </>
  );
};

const TrackingMap: React.FC<{ apiData: Leg[] }> = ({ apiData }) => {
  return (
    <Box component="div" sx={{ height: {xs: "50vh", md: "80vh"}, width: '100%' }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Map
          defaultZoom={3}
          defaultCenter={{ lat: 0, lng: 0 }}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          style={{ width: '100%', height: '100%' }}
        >
          <MapContent apiData={apiData || []} />
        </Map>
      </APIProvider>
    </Box>
  );
};

export default TrackingMap;