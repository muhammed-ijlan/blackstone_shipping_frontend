import { Box, Stack } from "@mui/material";
import React from "react";

interface ImageNode {
  node: {
    sourceUrl: string;
  };
}

interface AreasOfSubImagesProps {
  images: ImageNode[];
}

const AreasOfSubImages: React.FC<AreasOfSubImagesProps> = ({ images }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: "wrap" }}>
      {images?.map((img, idx) => (
        <Box
          component="img"
          key={idx}
          src={img?.node?.sourceUrl}
          alt={`sub image ${idx + 1}`}
          width={{ xs: "80px", sm: "115px" }}
          height={"auto"}
          style={{ borderRadius: 8 }}
        />
      ))}
    </Stack>
  );
};

export default AreasOfSubImages;
