import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ServiceNode } from "src/types/graphql/types/services.types";
import CustomArrowButton from "../CustomArrowButton";
import { useRouter } from "src/routes/hooks";

const ServiceCard = ({ data }: { data: ServiceNode }) => {
  const router = useRouter();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid rgba(45, 55, 72, 0.2)",
        borderRadius: "8px",
        background: "rgba(52, 61, 77, 0.02)",
      }}
    >
      <Box
        component={"img"}
        src={data.featuredImage?.node?.sourceUrl}
        alt={data.title}
        sx={{
          "& img": {
            width: "400px",
            height: "180px !important",
            objectFit: "cover",
          },
          width: "400px",
          height: "180px !important",
          objectFit: "cover",
          borderRadius: "8px 8px 0px 0px",
        }}
      />
      <Stack
        p={"15px"}
        justifyContent={"space-between"}
        sx={{ height: "100%" }}
        gap={1}
      >
        <Stack>
          <Typography
            sx={{
              color: "rgba(11, 19, 40, 1) !important",
              textAlign: { xs: "left" },
            }}
            variant="h4"
          >
            {data.title.toUpperCase()}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(45, 55, 72, 1) !important",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Stack>
        <CustomArrowButton
          onClick={() => router.push(data.uri)}
          name="Read More"
          sx={{ width: "160px", height: "50px" }}
        />
      </Stack>
    </Stack>
  );
};

export default ServiceCard;
