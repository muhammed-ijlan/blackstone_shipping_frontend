import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { TechnologyData } from "src/types/graphql/types/technology.types";
import TechnologyCard from "./TechnologyCard";

const TechnologyCards = ({ data }: { data: TechnologyData }) => {
  return (
    <Stack gap={3} my={3}>
      {data.technology.children.nodes.map((item, index) => (
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
          {item.children.nodes.map((subItem, idx) => (
            <TechnologyCard key={idx} data={subItem} />
          ))}
        </Stack>
      ))}
      <Divider />
    </Stack>
  );
};

export default TechnologyCards;
