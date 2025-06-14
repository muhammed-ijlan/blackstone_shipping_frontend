import { useEffect, useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
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
  officeLocationsOptions: {
    country: {
      nodes: CountryNode[];
    };
    address?: string;
    phoneNumber?: string;
    emailAddress?: string;
  };
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export const useOfficeLocations = (count: number = 3, search: string = '') => {
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsByPage, setLocationsByPage] = useState<Record<number, OfficeLocation[]>>({});
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const client = useApolloClient();

  const fetchPage = async (page: number) => {
    try {
      setLoading(true);
      const after = page === 1 ? null : pageCursors[page - 1] || null;

      const { data } = await client.query({
        query: GET_OFFICE_LOCATIONS,
        variables: { count, after, search },
        fetchPolicy: 'network-only',
      });

      const newLocations: OfficeLocation[] = data?.officeLocations?.nodes || [];
      const nextCursor: string | null = data?.officeLocations?.pageInfo?.endCursor || null;
      const nextHasNextPage: boolean = data?.officeLocations?.pageInfo?.hasNextPage || false;

      setLocationsByPage((prev) => ({ ...prev, [page]: newLocations }));
      setHasNextPage(nextHasNextPage);

      if (newLocations.length > 0) {
        setPageCursors((prev) => {
          const updated = [...prev];
          if (updated[page] !== nextCursor) {
            updated[page] = nextCursor;
          }
          return updated;
        });
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageCursors([null]);
    setLocationsByPage({});
    setCurrentPage(1);
    setHasNextPage(false);
    setError(null);
    fetchPage(1);
  }, [search]);

  useEffect(() => {
    if (currentPage !== 1) {
      fetchPage(currentPage);
    }
  }, [currentPage]);

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getTotalPages = () => {
    const loadedPages = Object.keys(locationsByPage).length;
    const lastLoadedPageLocations = locationsByPage[loadedPages] || [];

    if (lastLoadedPageLocations.length < count) {
      return loadedPages;
    }

    if (lastLoadedPageLocations.length === count && hasNextPage) {
      return loadedPages + 1;
    }

    return loadedPages;
  };

  const totalPages = getTotalPages();
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const locations = locationsByPage[currentPage] || [];

  return {
    locations,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
  };
};