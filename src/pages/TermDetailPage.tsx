import { useParams } from "react-router-dom"; // or next/router
import { Container, Typography, Box } from "@mui/material";
import { termsData } from "src/sections/termsContent";

const TermDetailPage = () => {
  const { slug } = useParams();
  const content = termsData[slug as string];

  if (!content) {
    return <Typography>Content not found.</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Box
      sx={{
        textTransform:"none !important"
      }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Container>
  );
};

export default TermDetailPage;
