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
      height: "70vh",
    }}
  >
    <Box
      component="img"
      src={loader}
      alt="Loading..."
      sx={{ width: 100, height: 100 }}
    />
  </Box>
);


export default LoadingFallback;
