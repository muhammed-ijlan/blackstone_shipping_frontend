import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { GetTechnologyDetailsByURIData } from "src/types/graphql/types/technology.types";
import TechnologyCard from "./TechnologyCard";

const TechnologyCards = ({ data }: { data: GetTechnologyDetailsByURIData }) => {
  return (
    <Stack gap={3} my={3}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data.technology.children.nodes.map((item: any, index: number) => (
        <Stack key={index} gap={3}>
          <Divider />

          <Stack>
            <Typography
              variant="h2"
              sx={{
                textTransform: "capitalize !important",
                color: "rgba(26, 86, 219, 1)",
                fontWeight: 600,
              }}
            >
              {item.title}
            </Typography>
            <Box
              component={"div"}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </Stack>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {item.children.nodes.map((subItem: any, idx: number) => (
            <TechnologyCard key={idx} data={subItem} />
          ))}
        </Stack>
      ))}
      <Divider />
    </Stack>
  );
};

export default TechnologyCards;
