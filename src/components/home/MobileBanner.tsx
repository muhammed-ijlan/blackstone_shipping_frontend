import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import searchIcon from "src/assets/icons/search.png";
import trackingIcon from "src/assets/icons/track.png";
import myBBXIcon from "src/assets/icons/box.png";
import contactIcon from "src/assets/icons/mail.png";

const MobileBanner = () => {
  return (
    <Stack spacing={2} mb={3} sx={{ display: { xs: "block", sm: "none" } }}>
      <Divider />

      <Grid container rowGap={2} columnSpacing={2}>
        <Grid size={6}>
          <IconButton
            size="small"
            sx={{
              border: "1px solid rgba(109, 110, 113, 0.2)",
              borderRadius: 1,
              gap: 0.5,
              p: "10px 16px",
              width: "100%",
            }}
          >
            <Box component={"img"} width={"16px"} src={searchIcon} />
            <Typography
              fontWeight={500}
              variant="body2"
              sx={{ ml: 0.5 }}
              color="rgba(45, 55, 72, 1)"
              fontSize={14}
            >
              Search
            </Typography>
          </IconButton>
        </Grid>
        <Grid size={6}>
          <IconButton
            size="small"
            sx={{
              border: "1px solid rgba(109, 110, 113, 0.2)",
              borderRadius: 1,
              p: "10px 16px",
              gap: 0.5,
              width: "100%",
            }}
          >
            <Box component={"img"} width={"16px"} src={trackingIcon} />

            <Typography
              variant="body2"
              fontSize={14}
              fontWeight={500}
              sx={{ ml: 0.5 }}
              color="rgba(45, 55, 72, 1)"
            >
              Tracking
            </Typography>
          </IconButton>
        </Grid>
        <Grid size={6}>
          <IconButton
            size="small"
            sx={{
              border: "1px solid rgba(109, 110, 113, 0.2)",
              borderRadius: 1,
              p: "10px 16px",
              width: "100%",
              gap: 0.5,
            }}
          >
            <Box component={"img"} width={"16px"} src={myBBXIcon} />

            <Typography
              fontSize={14}
              fontWeight={500}
              variant="body2"
              sx={{ ml: 0.5 }}
              color="rgba(45, 55, 72, 1)"
            >
              My BBX
            </Typography>
          </IconButton>
        </Grid>
        <Grid size={6}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="success"
            sx={{ textTransform: "none", p: "10px 16px",height:"100%" }}
            startIcon={
              <Box component={"img"} width={"16px"} src={contactIcon} />
            }
          >
            Contact
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Stack>
  );
};

export default MobileBanner;
