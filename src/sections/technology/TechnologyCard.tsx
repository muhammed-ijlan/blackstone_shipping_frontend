import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { TechnologyChildNode } from "src/types/graphql/types/technology.types";

const TechnologyCard = ({ data }: { data: TechnologyChildNode }) => {
  return (
    <Stack gap={3} sx={{pt:3}}>
     <Divider/>
      <Typography
        variant="h2"
        sx={{
          textTransform: "capitalize !important",
          color: "rgba(11, 19, 40, 0.5)",
          fontWeight: 600,
        }}
      >
        {data.title}
      </Typography>
      <Stack direction={{xs:"column",md:"row"}} gap={4}>
        <Box
          sx={{ maxWidth: {xs:"100%",md:"400px"}, borderRadius: "8px",objectFit:"cover" }}
          component={"img"}
          src={data.featuredImage?.node.sourceUrl}
          alt={data.title}
        />
        <Stack gap={2}>
          <Typography variant="h3" color="black" sx={{textTransform:"uppercase !important"}}>
            {data.technologySinglePageOptions?.subTitle}
          </Typography>
          <Box
            component={"div"}
            sx={{textAlign:{xs:"left !important"}}}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TechnologyCard;
