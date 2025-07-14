import { Box, Stack } from "@mui/material";
import React from "react";

interface ImageNode {
  node?: {
    sourceUrl?: string;
  };
}

interface AreasOfSubImagesProps {
  images: (ImageNode | null)[];
}

const AreasOfSubImages: React.FC<AreasOfSubImagesProps> = ({ images }) => {
  const validImages = images?.filter(
    (img): img is ImageNode =>
      !!img?.node?.sourceUrl
  );

  if (!validImages || validImages.length === 0) return null;

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: "wrap" }}>
      {validImages.map((img, idx) => (
        <Box
          component="img"
          key={idx}
          src={img.node!.sourceUrl}
          alt={`sub image ${idx + 1}`}
          width={{ xs: "80px", sm: "115px" }}
          height="auto"
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Stack>
  );
};

export default AreasOfSubImages;
