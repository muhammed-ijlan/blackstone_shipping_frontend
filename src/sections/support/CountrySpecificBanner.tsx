import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import shape from "src/assets/icons/shape.png";
import { useParams } from "react-router";
import { CountryPageData } from "src/types/graphql/types/support.types";


const   CountrySpecificBanner = ({ data }: { data: CountryPageData }) => {
  const bannerImage =
    data.country?.countriesOptions?.countryBannerImage?.node?.sourceUrl ?? "";
  const countryName = data.country?.name ?? "Country";

  const { id } = useParams<{ id: string }>();

const matchedCities = data.officeLocations?.nodes
  ?.filter(location =>
    location.countries?.nodes?.some(country => country.id === id)
  )
  ?.map(loc => loc.title)
  ?.join(", ") || "City";


  return (
    <Box
      sx={{
        position: "relative",
         borderRadius: "0px 8px 8px 8px",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "300px", md: "643px" },
          objectFit:"cover",
          filter: "brightness(0.6)",
        }}
      />

      {/* Support Tab */}
      <Box component={"img"} src={shape} width={200} sx={{position:"absolute",top:-62,left:35}}/>
      <Box component={"img"} src={shape} width={200} sx={{position:"absolute",top:-13,left:-85}}/>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 120,
          height: 50,
          backgroundColor: "#fff",
          color: "#6B6B6B",
          fontWeight: 600,
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0px 0px 8px 0",
          zIndex: 5,
        }}
      >
        <Typography>Support</Typography>
      </Box>

      {/* Country Card */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "60px", md: "80px" },
          left: { xs: "20px", md: "30px" },
          backgroundColor: "rgba(255, 255, 255, 0.24)",
          color: "#fff",
          px: 3,
          py: 2,
          borderRadius: "6px",
          zIndex: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: 700, fontSize: "48px", lineHeight: "48px" }}
        >
          {countryName}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <LocationOnIcon sx={{ fontSize: 22 }} />
          <Typography variant="h3" sx={{textTransform:"capitalize !important"}}>
            {matchedCities}
          </Typography>
        </Stack>
      </Box>

      {/* Bottom Right Arabic Text */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 20, md: 45 },
          right: { xs: 20, md: 45 },
          textAlign: "right",
          color: "#fff",
          zIndex: 4,
          // maxWidth:"600px"
        }}
      >
        <Typography variant="h2" sx={{fontWeight:"500 !important",textAlign:{xs:"center !important",md:"left !important"}}} >
         {data.country?.countriesOptions?.countryBannerCaption || ""}   
        </Typography>
      </Box>
    </Box>
  );
};

export default CountrySpecificBanner;
