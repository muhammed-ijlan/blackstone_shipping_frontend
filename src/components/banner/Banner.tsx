import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "src/routes/hooks";

interface BannerPropsTypes {
  bgUrl: string;
  subTitle?: string;
  mainTitle: string;
}

const Banner = ({ bgUrl, subTitle = "", mainTitle }: BannerPropsTypes) => {
  const router = useRouter();
  return (
    <Stack
    sx={{
      backgroundImage: `url(${bgUrl || "/default.jpg"})`,
      height: { xs: 500, sm: "664px" },
      width: "100%",
      backgroundSize: "cover", 
      backgroundPosition: "center 0%",
      backgroundRepeat: "no-repeat",
      position: "relative",
    }}
    >
      <Stack
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
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
            flexDirection: { xs: "column", md: "column" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: { xs: "center", md: "flex-end" },
            gap: 3,
            py: { xs: "20px", md: "80px" },
          }}
        >
          {subTitle && (
            <Typography
              onClick={() => router.push(`/${subTitle.toLowerCase()}`)}
              variant="body1"
              sx={{
                fontWeight: "700",
                color: "white !important",
                // position: { xs: "unset", lg: "absolute" },
                // bottom: "180px",
                marginTop: "50px",
                cursor: "pointer",
              }}
            >
              {subTitle && subTitle}
            </Typography>
          )}
          <Typography
            sx={{
              maxWidth: "100%",
              fontSize: { xs: "40px", lg: "6rem !important" },
              fontWeight: "700",
              color: "white !important",
              // position: { xs: "unset", lg: "absolute" },
              top: { xs: "0", sm: "380px" },
              lineHeight: { xs: "50px !important", lg: "110px !important" },
              textWrap: "wrap",
              textAlign: { xs: "center", md: "left" },
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
