import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const JoinOurTeam = ({ data }: { data: GetCareersPageData }) => {
  return (
    <Stack direction={{xs:"column-reverse",lg:"row"}} gap={3} my={6}>
      <Stack gap={1}>
        <Typography variant="h2">
          {data.page.careersPageSection1.mainTitle} :{" "}
          {data.page.careersPageSection1.subTitle}
        </Typography>
        <Box
          sx={{color:"rgba(109, 110, 113, 1)"}}
          component={"div"}
          dangerouslySetInnerHTML={{
            __html: data.page.careersPageSection1.content,
          }}
        />
      </Stack>
      <Box
        sx={{ maxWidth: "500px", borderRadius: "8px", objectFit: "cover" }}
        component={"img"}
        src={data.page.careersPageSection1.image.node.sourceUrl}
        alt={data.page.careersPageSection1.mainTitle}
      />
    </Stack>
  );
};

export default JoinOurTeam;
