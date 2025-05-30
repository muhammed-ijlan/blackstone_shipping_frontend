import { Container, Stack, Typography } from "@mui/material";
import React from "react";

interface BannerPropsTypes {
  bgUrl: string;
  subTitle?: string;
  mainTitle: string;
}

const Banner = ({ bgUrl, subTitle = "", mainTitle }: BannerPropsTypes) => {
  return (
    <Stack
      sx={{
        backgroundImage: `url(${bgUrl})`,
        height: 600,
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: {xs:"column",md:'column'},
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: { xs: "center", md: "flex-end" },
            gap: 3,
            py: { xs: "20px", md: "80px" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "700",
              color: "white !important",
              // position: { xs: "unset", lg: "absolute" },
              // bottom: "180px",
              marginTop:"50px"
            }}
          >
            {subTitle && subTitle}
          </Typography>
          <Typography
            sx={{
              maxWidth:"800px",
              fontSize: { xs: "40px", lg: "6rem !important" },
              fontWeight: "700",
              color: "white !important",
              // position: { xs: "unset", lg: "absolute" },
              top: "380px",
              lineHeight:{xs:"50px !important",lg:"110px !important"},
              textWrap:"wrap"
            }}
          >
            {mainTitle?.toUpperCase()}
          </Typography>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Banner;
