import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_OFFICE_LOCATIONS } from '../queries';

interface CountryNode {
  name: string;
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
  officeLocationsOptions: {
    country: {
      nodes: CountryNode[];
    };
    address?: string;
    phoneNumber?: string;
    emailAddress?: string;
  };
}

export const useOfficeLocations = () => {
  const [locations, setLocations] = useState<OfficeLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const client = useApolloClient();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_OFFICE_LOCATIONS,
        variables: { count: 9999, after: null, search: '' },
        fetchPolicy: 'network-only',
      });

      const allLocations: OfficeLocation[] = data?.officeLocations?.nodes || [];
      setLocations(allLocations);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { locations, loading, error };
};
