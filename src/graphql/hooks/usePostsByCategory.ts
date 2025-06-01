import { useEffect, useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { GET_NEWS_BY_CATEGORY } from '../queries';

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

export const usePostsByCategory = (
  slug: string,
  count: number = 3,
  search: string = ""
) => {
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
      const after = page === 1 ? null : pageCursors[page - 1] || null;

      const { data } = await client.query({
        query: GET_NEWS_BY_CATEGORY,
        variables: { slug, count, after, search },
        fetchPolicy: "network-only",
      });

      const newPosts: Post[] = data?.posts?.nodes || [];
      const nextCursor: string | null = data?.posts?.pageInfo?.endCursor || null;
      const nextHasNextPage: boolean = data?.posts?.pageInfo?.hasNextPage || false;

      setPostsByPage((prev) => ({ ...prev, [page]: newPosts }));
      setHasNextPage(nextHasNextPage);

      if (newPosts.length > 0) {
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
    setPostsByPage({});
    setCurrentPage(1);
    setHasNextPage(false);
    setError(null);
    fetchPage(1);
  }, [slug, search]);

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
    const loadedPages = Object.keys(postsByPage).length;
    const lastLoadedPagePosts = postsByPage[loadedPages] || [];

    if (lastLoadedPagePosts.length < count) {
      return loadedPages;
    }

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
