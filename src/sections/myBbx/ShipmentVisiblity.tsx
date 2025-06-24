import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { FeaturedContent } from "src/types/graphql/types/myBbx.types";

interface Data {
  svTitle: string;
  svContent: string;
}

const ShipmentVisiblity = ({
  data,
  featuredContent,
}: {
  data: Data;
  featuredContent: FeaturedContent[];
}) => {
  return (
    <Stack
      sx={{
        background: "linear-gradient(360deg, #2D3748 0%, #1A202C 100%)",
        borderRadius: "8px",
        py: 6,
        px: 3,
        color: "white",
      }}
      gap={5}
      mb={5}
      py={5}
    >
      <Stack gap={1}>
        <Typography sx={{ textAlign: "center !important" }} variant="h2">
          {data.svTitle}
        </Typography>
        <Box
          component={"div"}
          sx={{
            "& p": {
              textAlign: "center",
              m: "0",
            },
          }}
          dangerouslySetInnerHTML={{ __html: data.svContent }}
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} flexWrap={"wrap"} gap={3}>
        {featuredContent.map((item, index) => {
          const borderStyles: Record<number, React.CSSProperties> = {
            0: {
              borderRight: "1px solid rgba(65, 78, 99, 1)",
            },
            1: {
              borderLeft: "1px solid rgba(65, 78, 99, 1)",
              borderRight: "1px solid rgba(65, 78, 99, 1)",
            },
            2: { borderLeft: "1px solid rgba(65, 78, 99, 1)" },
          };
          return (
            <Stack
              flex={1}
              gap={2}
              sx={{
                px: 3,
                ...(borderStyles[index] || {}),
                width: "100% ",
                maxWidth: "400px",
              }}
            >
              <Stack
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  bgcolor: "white",
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box
                  component={"img"}
                  src={item.featuredImage?.node.sourceUrl}
                  alt={`featured-image-${index}`}
                  sx={{ width: "32px" }}
                />
              </Stack>
              <Typography
                mt={1}
                variant="h6"
                sx={{ textTransform: "capitalize !important" }}
              >
                {item.title}
              </Typography>
              <Box
                component={"div"}
                sx={{
                  "& p": {
                    m: "0",
                    color: "rgba(217, 217, 217, 1)",
                    fontWeight: "500",
                    textWrap: "wrap",
                    width: "100%",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ShipmentVisiblity;
