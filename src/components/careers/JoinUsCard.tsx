import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface JoinUsCardInterface {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

const JoinUsCard = ({ data }: { data: JoinUsCardInterface }) => {
  return <Stack gap={1} sx={{border:"1px solid rgba(255, 255, 255, 0.5)",p:3,borderRadius:"8px",height:"100%"}} alignItems={{xs:"center",sm:"flex-start"}}>
    <Box component={"img"} width="40px" src={data.featuredImage.node.sourceUrl}/>
    <Typography variant="h4" sx={{textTransform:"uppercase !important"}}>{data.title}</Typography>
    <Box component={"div"} dangerouslySetInnerHTML={{__html:data.content}}/>
  </Stack>;
};

export default JoinUsCard;
