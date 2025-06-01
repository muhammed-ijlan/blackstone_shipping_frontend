import React from "react";
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
} from "@mui/material";
import moment from "moment";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CustomArrowButton from "../CustomArrowButton";

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


  if (loading && posts.length === 0) return <CircularProgress />;
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
        // Render only page number buttons here
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
    <Stack >
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        justifyItems={"center"}
        spacing={3}
      >
        {posts?.map((post) => (
          <Grid
            size={{ xs: 12, lg: 4 }}
            spacing={5}
            key={post.id || post.title}
          >
            <Stack sx={{ maxWidth: {xs:"100%",md:"400px"} }}>
              <Box
                component={"img"}
                alt={post?.title}
                src={post.featuredImage?.node?.sourceUrl}
                width={"100%"}
                borderRadius={"8px"}
              />
              <Stack sx={{ height: "100%" }} justifyContent={"space-between"}>
                <Stack>
                  <Typography
                    mt={1}
                    variant="caption"
                    fontWeight={"600"}
                    color="text.secondary"
                  >
                    {moment(post.date).format("DD MMM YYYY")}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "left !important" }}
                    variant="h4"
                    fontWeight={"bold"}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={1}
                    mb={2}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </Stack>
                <Stack height={"100%"} alignItems={"flex-end"}>
                  <CustomArrowButton name="Read More" sx={{border:"none"}}/>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
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
      )}
    </Stack>
  );
};

export default PostsByCategory;
