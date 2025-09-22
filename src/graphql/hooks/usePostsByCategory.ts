import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_NEWS_BY_CATEGORY } from "../queries";
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
  catId: string,
  count: number = 6,
  search: string = ""
) => {
  const client = useApolloClient();

  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsByPage, setPostsByPage] = useState<Record<number, Post[]>>({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const isAll = slug === "";

  const fetchPage = async (page: number) => {
    try {
      setLoading(true);
      const after = page === 1 ? null : pageCursors[page - 1] || null;

      const { data } = await client.query({
        query: GET_NEWS_BY_CATEGORY,
        variables: { slug, catId, count, after, search, isAll },
        fetchPolicy: "network-only",
      });

      const newPosts: Post[] = isAll
        ? data?.allPosts?.nodes || []
        : data?.posts?.nodes || [];

      const nextCursor: string | null = isAll
        ? data?.allPosts?.pageInfo?.endCursor || null
        : data?.posts?.pageInfo?.endCursor || null;

      const nextHasNextPage: boolean = isAll
        ? data?.allPosts?.pageInfo?.hasNextPage || false
        : data?.posts?.pageInfo?.hasNextPage || false;

      setPostsByPage((prev) => ({ ...prev, [page]: newPosts }));
      setHasNextPage(nextHasNextPage);

      const total =
        isAll ? data?.allPostsCount || 0 : data?.category?.totalCount || 0;
      setTotalCount(total);

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
    setTotalCount(0);
    fetchPage(1);
  }, [slug, search, catId]);

  useEffect(() => {
    if (currentPage !== 1 && !postsByPage[currentPage]) {
      fetchPage(currentPage);
    } else {
      const prevPageCursor = pageCursors[currentPage] || null;
      setHasNextPage(prevPageCursor !== null);
    }
  }, [currentPage]);


  const totalPages = Math.ceil(totalCount / count);

  const goToNextPage = () => {
    if (hasNextPage && currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
