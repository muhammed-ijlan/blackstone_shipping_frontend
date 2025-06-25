import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ShippingMethodNode } from "src/types/graphql/types/company.types";

const SimplifyCard = ({ method }: { method: ShippingMethodNode }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        background: "rgba(45, 55, 72, 0.05)",
        border: "1px solid rgba(45, 55, 72, 0.5)",
        borderRadius: "8px",
        padding: 1,
      }}
      gap={2}
    >
      <Box
        component={"img"}
        src={method.featuredImage.node.sourceUrl}
        width={"100%"}
        height={"284px"}
        alt="method"
        borderRadius={"4px"}
      />
      <Typography variant="h6">{method.title.toUpperCase()}</Typography>
      <Box
        component="div"
        sx={{
          "& p": {
            typography: { xs: "body1", sm: "body2" },
            fontWeight: "500",
            margin: "0",
          },
        }}
        dangerouslySetInnerHTML={{
          __html: method.content,
        }}
        color="rgba(109, 110, 113, 1)"
      />
    </Stack>
  );
};

export default SimplifyCard;
