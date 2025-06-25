import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useRouter } from "src/routes/hooks";
import {
  GetRelatedPostsByIDData,
  RelatedPost,
} from "src/types/graphql/types/resourses.types";

const MoreNews = ({ data }: { data: GetRelatedPostsByIDData }) => {
  const router = useRouter();
  return (
    <Stack gap={3}>
      <Typography
        variant="h2"
        sx={{
          textTransform: "unset !important",
          color: "rgba(11, 19, 40, 1)",
          fontWeight: "700",
        }}
      >
        More News
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={4}
        alignItems={"center"}
        justifyItems={"center"}
      >
        {data.posts.nodes.map((item, idx) => (
          <Stack
            onClick={() => router.push(`/resources/news${item.uri}`)}
            sx={{ cursor: "pointer", width: { xs: "100%", sm: "231px" } }}
            direction={{ xs: "row", sm: "column" }}
            gap={{ xs: 1, sm: 0 }}
          >
            <Box
              component={"img"}
              src={item.featuredImage?.node?.sourceUrl}
              alt={item.title}
              sx={{
                maxWidth: { xs: "150px", sm: "100%" },
                objectFit: "cover",
                height: { xs: "auto", sm: "167px" },
                borderRadius: "8px",
              }}
            />
            <Stack p={0.5}>
              {/* <Typography>{moment(item.date)}</Typography> */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "700",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: { xs: 3, sm: 2 },
                  overflow: "hidden",
                }}
              >
                {item.title}
              </Typography>
              {/* <Box component={"div"} dangerouslySetInnerHTML={{__html:item.expert}}/> */}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default MoreNews;
