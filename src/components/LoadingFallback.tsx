import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import loader from "src/assets/logo/loadingIcon.svg"

const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
      height:{xs: "70vh", md: "80vh"},
      width: "100%",
    }}
  >
    <Box
      component="img"
      src={loader}
      alt="Loading..."
      sx={{ width: {xs: 70, md: 100}, height: {xs: 70, md: 100} }}
    />
  </Box>
);


export default LoadingFallback;
