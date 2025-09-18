import React, { useEffect, useRef } from "react";
import { usePostsByCategory } from "src/graphql/hooks/usePostsByCategory";
import {
  Typography,
  Button,
  CircularProgress,
  Stack,
  Grid,
  Box,
  Pagination,
  PaginationItem,
  Skeleton,
} from "@mui/material";
import moment from "moment";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CustomArrowButton from "../CustomArrowButton";
import { useRouter } from "src/routes/hooks";

interface Props {
  slug: string;
  count?: number;
  search: string;
}

const PostsByCategory: React.FC<Props> = ({ slug, count = 3, search }) => {
  const {
    posts,
    loading,
    error,
    currentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    hasNextPage,
    totalPages,
  } = usePostsByCategory(slug, count, search);

  const router = useRouter();

  const postsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (postsContainerRef.current) {
      const yOffset = -300;
      const y =
        postsContainerRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [currentPage]);



  if (loading && posts.length === 0) {
    return (
      <Grid container spacing={3}>
        {[...Array(count)].map((_, i) => (
          <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
            <Stack
              sx={{ maxWidth: { xs: "100%", md: "400px" } }}
              direction={{ xs: "row", md: "column" }}
              gap={{ xs: 1, md: 0 }}
            >
              <Box
                sx={{
                  width: { xs: "150px", md: "100%" },
                  height: { xs: "92px", md: "283px" },
                  flexShrink: 0,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: "8px" }}
                />
              </Box>
              <Stack
                sx={{ height: "100%", width: "100%" }}
                justifyContent="space-between"
                flex={1}
              >
                <Stack gap={{ xs: 0.5, md: 1 }} direction="column">
                  <Skeleton width="40%" height={20} />
                  <Skeleton width="100%" height={28} />
                  <Skeleton width="90%" height={20} sx={{ display: { xs: "none", md: "block" } }} />
                  <Skeleton width="95%" height={20} sx={{ display: { xs: "none", md: "block" } }} />
                  <Skeleton width="85%" height={20} sx={{ display: { xs: "none", md: "block" } }} />
                </Stack>
                <Stack
                  alignItems="flex-end"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <Skeleton variant="rectangular" width={100} height={36} />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  }


  if (error) return <p>Error: {error.message}</p>;

  const renderPageNumbers = () => (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(e, value) => goToPage(value)}
      showFirstButton={false}
      showLastButton={false}
      siblingCount={1}
      boundaryCount={1}
      renderItem={(item) => {
        if (item.type === "page") {
          return (
            <PaginationItem
              {...item}
              sx={{
                border: "1px solid rgba(109, 110, 113, 0.1)",
                color: "rgba(109, 110, 113, 1)",
                "&:hover": {
                  backgroundColor: "rgba(11, 19, 40, 0.1)",
                },
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "rgba(11, 19, 40, 0.9)",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(11, 19, 40, 0.8)",
                    fontWeight: "bold",
                    color: "white",
                  },
                },
              }}
            />
          );
        }
        return null;
      }}
      shape="rounded"
    />
  );

  return (
    <Stack ref={postsContainerRef}>
      <Grid
        container
        // justifyContent={"space-between"}
        justifyItems={"center"}
        spacing={3}
      >
        {posts?.map((post) => (
          <Grid

            size={{ xs: 12, md: 6, lg: 4 }}
            // spacing={5}
            key={post.id || post.title}
          >
            <Stack sx={{ maxWidth: { xs: "100%", md: "400px" } }} direction={{ xs: "row", md: "column" }} gap={{ xs: 1, md: 0 }}
              onClick={() => router.push(`/resources/news/${post.id}`)}>
              <Box
                component={"img"}
                alt={post?.title}
                src={post.featuredImage?.node?.sourceUrl}
                width={{ xs: "150px", md: "100%" }}
                height={{ xs: "92px", md: "283px" }}
                sx={{ objectFit: "cover" }}
                borderRadius={"8px"}
              />
              <Stack sx={{ height: "100%" }} justifyContent={"space-between"}>
                <Stack gap={{ xs: 0, md: 1 }} direction={{ xs: "column-reverse", md: "column" }}>
                  <Typography
                    mt={1}
                    variant="caption"
                    fontWeight={"600"}
                    color="text.secondary"
                  >
                    {moment(post.date).format("DD MMM YYYY")}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "left !important",
                      display: { xs: "unset", md: "-webkit-box" },
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: { xs: 2, md: 2 },
                      overflow: { xs: "unset", md: "hidden" },
                      height: { xs: "unset", md: "60px" },
                    }}
                    variant="h4"
                    fontWeight={"bold"}
                    color="rgba(45, 55, 72, 1)"
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={1}
                    mb={2}
                    color="rgba(45, 55, 72, 1)"
                    sx={{

                      display: { xs: "none", md: "-webkit-box" },
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      "& p": {
                        m: 0,
                        fontWeight: "600",
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </Stack>
                <Stack height={"100%"} alignItems={"flex-end"} sx={{ display: { xs: "none", md: "flex" } }}>
                  <CustomArrowButton
                    name="Read More"
                    sx={{ border: "none" }}
                    onClick={() => router.push(`/resources/news/${post.id}`)}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>


      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={6}
        sx={{ width: "100%" }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          sx={{
            color: "rgba(11, 19, 40, 1)",
            borderColor: "rgba(109, 110, 113, 0.3)",
            fontWeight: "bold",
            minWidth: 80,
            "&:hover": {
              backgroundColor: "rgba(11, 19, 40, 0.15)",
              borderColor: "rgba(11, 19, 40, 0.5)",
            },
          }}
        >
          Prev
        </Button>

        {renderPageNumbers()}

        <Button
          variant="outlined"
          endIcon={<ArrowForward />}
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          sx={{
            color: "rgba(11, 19, 40, 1)",
            borderColor: "rgba(109, 110, 113, 0.3)",
            fontWeight: "bold",
            minWidth: 80,
            "&:hover": {
              backgroundColor: "rgba(11, 19, 40, 0.15)",
              borderColor: "rgba(11, 19, 40, 0.5)",
            },
          }}
        >
          Next
        </Button>
      </Stack>

    </Stack>
  );
};

export default PostsByCategory;
