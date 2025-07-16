import { ArrowForward, Download } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { CountryPageData } from "src/types/graphql/types/support.types";

const Contact = ({ data }: { data: CountryPageData }) => {

  const handleDownload = async () => {
    const fileUrl = data.country?.countriesOptions?.countryflyer?.node?.sourceUrl;
    if (!fileUrl  ) { 
      alert("No file available");
      return;
    }

    try {
      const response = await fetch(fileUrl, { mode: "cors" });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      // Try to extract file name from URL
      const fileName = fileUrl.split("/").pop() || "flyer";

      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed.");
    }
  };

  return (
    <Stack
      gap={2}
      sx={{
        background: "rgba(45, 55, 72, 1)",
        borderRadius: "8px",
        padding: 3,
        marginTop: "20px",
      }}
    >
      <Typography
        sx={{ textAlign: "left !important" }}
        variant="h2"
        color="rgba(255, 255, 255, 0.6)"
      >
        Contact
      </Typography>

      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        <Stack
          flex={1}
          sx={{
            bgcolor: "rgba(255, 255, 255, 1)",
            borderRadius: "8px",
            padding: 2,
          }}
          gap={1}
        >
          <Typography
            variant="body1"
            sx={{ textDecoration: "underline !important" }}
          >
            Address
          </Typography>
          <Box  component={"div"}sx={{typography:"h4"}} dangerouslySetInnerHTML={{__html:data.country?.countriesOptions?.countryMainAddress ?? ""}}/>
           
        </Stack>
        <Stack gap={2} flex={1}>
          <Stack
            sx={{
              bgcolor: "rgba(255, 255, 255, 1)",
              borderRadius: "8px",
              padding: 2,
              height:"100%"
            }}
            gap={1}
          >
            <Typography
              variant="body1"
              sx={{ textDecoration: "underline !important" }}
            >
              Email
            </Typography>
            <Typography variant="h4" color="rgba(45, 55, 72, 1)">
              {data.country?.countriesOptions?.countryMainEmailAddress}
            </Typography>
          </Stack>
          <Stack
            sx={{
              bgcolor: "rgba(255, 255, 255, 1)",
              borderRadius: "8px",
              padding: 2,
               height:"100%"
            }}
            gap={1}
          >
            <Typography
              variant="body1"
              sx={{ textDecoration: "underline !important" }}
            >
              Phone Number
            </Typography>
            <Typography variant="h4" color="rgba(45, 55, 72, 1)">
              {data.country?.countriesOptions?.countryMainPhoneNumber}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} mt={2}>
      <Button
  sx={{
    background: "rgba(255, 255, 255, 1)",
    color: "rgba(45, 55, 72, 1)",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    textTransform: "none",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.9)",
    },  
    typography:"body1",
    fontWeight:"600 !important"
  }}
  size="large"
  href={data.country?.countriesOptions?.countryflyer?.node?.sourceUrl ?? ""}
  target="_blank"
  rel="noopener noreferrer"
  download 
  endIcon={<Download />}
>
  Download Flyer
</Button>
      </Stack>
    </Stack>
  );
};

export default Contact;
