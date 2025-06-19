import { useQuery } from "@apollo/client";
import { ArrowOutward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { GET_RECENT_NEWS } from "src/graphql/queries";
import { RecentPostsData } from "src/types/graphql/types/resourses.types";
import moment from "moment";
import CustomArrowButton from "src/components/CustomArrowButton";
import { useRouter } from "src/routes/hooks";

const RecentNews = () => {
  const { data } = useQuery<RecentPostsData>(GET_RECENT_NEWS);
  const posts = data?.posts?.nodes || [];

  const router = useRouter();

  return (
    <Stack gap={3}>
      <Typography variant="h2">Recently Added</Typography>
      <Grid container spacing={3}>
        {posts[2] && (
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack gap={1}>
              <Box
                component={"img"}
                alt={posts[2].title}
                src={posts[2].featuredImage?.node?.sourceUrl}
                maxWidth={"100%"}
                height={"300px"}
                sx={{ objectFit: "cover" }}
                borderRadius={"8px"}
              />
              <Typography
                mt={1}
                variant="caption"
                fontWeight={"600"}
                color="text.secondary"
              >
                {moment(posts[2].date).format("DD MMM YYYY")}
              </Typography>
              <Typography
                sx={{ textAlign: "left !important" }}
                variant="h4"
                fontWeight={"bold"}
              >
                {posts[2].title}
              </Typography>
              <Typography
                variant="body2"
                mt={1}
                mb={2}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  overflow: "hidden",
                  "& p": {
                    m: 0,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: posts[2].excerpt }}
              />
              <Stack alignItems={"flex-end"}>
                <CustomArrowButton
                  name="Read More"
                  sx={{ border: "none !important" }}
                  onClick={() => router.push(`/resources/news/${posts[2].id}`)}
                />
              </Stack>
            </Stack>
          </Grid>
        )}

        {/* Right: 2 Smaller Posts */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Grid container direction="column" spacing={3}>
            {[1, 0].map(
              (i) =>
                posts[i] && (
                  <Grid key={posts[i].id}>
                    <Stack gap={1} direction={{ xs: "column", md: "row" }}>
                      <Box
                        component={"img"}
                        alt={posts[i].title}
                        src={posts[i].featuredImage?.node?.sourceUrl}
                        width={{ xs: "100%", md: "306px" }}
                        borderRadius={"8px"}
                      />
                      <Stack
                        sx={{ height: "100%" }}
                        justifyContent={"space-between"}
                      >
                        <Stack>
                          <Typography
                            mt={1}
                            variant="caption"
                            fontWeight={"600"}
                            color="text.secondary"
                          >
                            {moment(posts[i].date).format("DD MMM YYYY")}
                          </Typography>
                          <Typography
                            sx={{ textAlign: "left !important" }}
                            variant="h4"
                            fontWeight={"bold"}
                          >
                            {posts[i].title}
                          </Typography>
                          <Typography
                            variant="body2"
                            mt={1}
                            mb={2}
                            sx={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: "3",
                              overflow: "hidden",
                              "& p": {
                                m: 0,
                              },
                            }}
                            dangerouslySetInnerHTML={{
                              __html: posts[i].excerpt,
                            }}
                          />
                        </Stack>
                        <Stack height={"100%"} alignItems={"flex-end"}>
                          <CustomArrowButton
                            name="Read More"
                            sx={{ border: "none !important" }}
                            onClick={() =>
                              router.push(`/resources/news/${posts[i].id}`)
                            }
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RecentNews;
