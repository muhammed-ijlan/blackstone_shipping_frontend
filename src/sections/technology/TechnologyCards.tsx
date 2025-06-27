import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import {
  GetTechnologyDetailsByURIData,
  TechnologyNode,
} from "src/types/graphql/types/technology.types";
import TechnologyCard from "./TechnologyCard";

const TechnologyCards = ({ data }: { data: TechnologyNode[] }) => {
  console.log("data", data);
  return (
    <Stack gap={3} my={5}>
      {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data.map((item: any, index: number) => (
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
              sx={{
                "& p": {
                  fontWeight:"600",
                  typography:"h4",
                  lineHeight:"34px !important",
                }
              }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </Stack>

          {item.children?.nodes.map((subItem: TechnologyNode, idx: number) => (
            <TechnologyCard key={idx} data={subItem} />
          ))}
        </Stack>
      ))}
      <Divider />
    </Stack>
  );
};

export default TechnologyCards;
