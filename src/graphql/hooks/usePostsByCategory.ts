import { useEffect, useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';

const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategorySlug($slug: String!, $count: Int!, $after: String) {
    posts(
      first: $count
      after: $after
      where: { categoryName: $slug, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        excerpt
        uri
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

interface FeaturedImage {
  node: { sourceUrl: string };
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  uri: string;
  date: string;
  featuredImage: FeaturedImage | null;
}

export const usePostsByCategory = (slug: string, count: number = 3) => {
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsByPage, setPostsByPage] = useState<Record<number, Post[]>>({});
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const client = useApolloClient();

  const fetchPage = async (page: number) => {
    try {
      setLoading(true);

      // For page 1, always after = null (reset)
      // For page > 1, get cursor from pageCursors
      const after = page === 1 ? null : pageCursors[page - 1] || null;

      const { data } = await client.query({
        query: GET_POSTS_BY_CATEGORY,
        variables: { slug, count, after },
        fetchPolicy: 'network-only',
      });

      const newPosts: Post[] = data?.posts?.nodes || [];
      const nextCursor: string | null = data?.posts?.pageInfo?.endCursor || null;
      const nextHasNextPage: boolean = data?.posts?.pageInfo?.hasNextPage || false;

      setPostsByPage((prev) => ({ ...prev, [page]: newPosts }));
      setHasNextPage(nextHasNextPage);

      // Only update cursor for next page, if we got posts and nextCursor is new
      if (newPosts.length > 0) {
        setPageCursors((prev) => {
          const updated = [...prev];
          // Set cursor for next page index (page)
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
    // Reset everything when slug changes
    setPageCursors([null]);
    setPostsByPage({});
    setCurrentPage(1);
    setHasNextPage(false);
    setError(null);

    // Fetch first page right away for new slug
    fetchPage(1);
  }, [slug]);

  useEffect(() => {
    // On page change, fetch page if not first page (first page fetched in slug effect)
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
    const loadedPages = Object.keys(postsByPage).length;
    const lastLoadedPagePosts = postsByPage[loadedPages] || [];

    // If last page has fewer posts than count, it's the last page
    if (lastLoadedPagePosts.length < count) {
      return loadedPages;
    }

    // If last page is full and backend says more pages exist, add 1
    if (lastLoadedPagePosts.length === count && hasNextPage) {
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

  const posts = postsByPage[currentPage] || [];

  return {
    posts,
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
