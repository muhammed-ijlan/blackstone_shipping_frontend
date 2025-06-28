import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Divider,
  LinearProgress,
  useTheme,
  StepConnector,
  StepIconProps,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackingInput from "src/components/tracking/TrackingInput";
import MapIcon from "@mui/icons-material/Map";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import calander from "src/assets/icons/calander.png";
import location from "src/assets/icons/location-track.png";
import { DirectionsBoatFilled } from "@mui/icons-material";

interface VesselData {
  departure: string;
  arrival: string;
  from: string;
  to: string;
}

const CustomModal = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ModalContent = styled("div")({
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  position: "relative",
  width: "90%",
  maxWidth: "900px",
  maxHeight: "90vh",
  overflowY: "auto",
});

const TrackingSection = () => {
  const [containerNo, setContainerNo] = useState<string>("");
  const [from, setFrom] = useState<string>("Mundra Port, Mundra");
  const [to, setTo] = useState<string>("Antwerpen");
  const [estimatedArrival, setEstimatedArrival] =
    useState<string>("09/07/2025");
  const [lastLocation, setLastLocation] = useState<string>(
    "Vessel Departure Mundra, GJ (INMUN), INDIA Rr 26/05/2025"
  );
  const [vesselData, setVesselData] = useState<VesselData[]>([
    {
      departure: "28/05/2025",
      arrival: "03/07/2025",
      from: "Mundra, GJ (INMUN), INDIA",
      to: "Rotterdam, ZH (NLRTM), NETHERLANDS",
    },
    {
      departure: "03/07/2025",
      arrival: "09/07/2025",
      from: "Rotterdam, ZH (NLRTM), NETHERLANDS",
      to: "Antwerpen, VAN (BEANR), BELGIUM",
    },
  ]);
  const [iframeSrc, setIframeSrc] = useState<string>("about:blank");
  const [showMapButton, setShowMapButton] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [vesselName, setVesselName] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("search");
    if (myParam) {
      setContainerNo(myParam);
      fetchData(myParam);
    }
  }, []);

  const fetchData = async (container: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.blackstoneshipping.com/master-api/Tracking/Enquiry_02?pType=5&pContainerNo=${container}`
      );
      const data = response.data;
      console.log(data.result, "data");
      if (data.result.Table[0].htmlmaersk) {
        setIframeSrc(data.result.Table[0].TrackingURL || "");
        setFrom(data.result.Table[0].from || "Mundra Port, Mundra");
        setTo(data.result.Table[0].to || "Antwerpen");
        setEstimatedArrival(
          data.result.Table[0].estimatedArrival || "09/07/2025"
        );
        setLastLocation(
          data.result.Table[0].lastLocation ||
          "Vessel Departure Mundra, GJ (INMUN), INDIA Rr 26/05/2025"
        );
        setVesselData(
          data.result.Table[0].vesselData || [
            {
              departure: "28/05/2025",
              arrival: "03/07/2025",
              from: "Mundra, GJ (INMUN), INDIA",
              to: "Rotterdam, ZH (NLRTM), NETHERLANDS",
            },
            {
              departure: "03/07/2025",
              arrival: "09/07/2025",
              from: "Rotterdam, ZH (NLRTM), NETHERLANDS",
              to: "Antwerpen, VAN (BEANR), BELGIUM",
            },
          ]
        );
        try {
          if (
            data.result.Table1[0].LAT &&
            data.result.Table1[0].LAT !== "" &&
            data.result.Table1[0].LAT !== null
          ) {
            setLat(data.result.Table1[0].LAT);
            setLon(data.result.Table1[0].LON);
            setVesselName(data.result.Table1[0].VesselName);
            setTimestamp(data.result.Table1[0].TimeStamp);
            setSpeed(data.result.Table1[0].Speed);
            setShowMapButton(true);
          } else {
            setShowMapButton(false);
          }
        } catch (err) {
          setShowMapButton(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = () => {
    if (containerNo) {
      fetchData(containerNo);
    }
  };
  const ports = [
    {
      date: "26/05/2025",
      label: "Vessel Departure",
      location: "Mundra, GJ (INMUN), INDIA",
      completed: true,
    },
    {
      date: "03/07/2025",
      label: "Vessel Arrival",
      location: "Rotterdam, ZH (NLRTM), NETHERLANDS",
      completed: true,
    },
    {
      date: "03/07/2025",
      label: "Vessel Departure",
      location: "",
      completed: false,
    },
    {
      date: "09/07/2025",
      label: "Vessel Arrival",
      location: "Antwerpen, VAN (BEANR), BELGIUM",
      completed: false,
    },
  ];

  const handleMapView = () => {
    const mapUrl = `https://vzone.in:2637/tracklivemap.html?LAT=${lat}&LON=${lon}&VesselName=${vesselName}&TIMESTAMP=${timestamp}&Speed=${speed}`;
    setModalOpen(true);
    const iframe = document.getElementsByName("iFrameName")[0] as
      | HTMLIFrameElement
      | undefined;
    if (iframe) iframe.src = mapUrl;
  };


  const CustomConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
      height: 4,
      border: 0,
      backgroundColor: theme.palette.grey[300],
      borderRadius: 1,
    },
  }));

  // Custom Step Icon
  const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed } = props;
    return (
      <DirectionsBoatFilled
        sx={{
          color: completed || active ? "#0052CC" : "#B0B0B0",
          fontSize: 28,
        }}
      />
    );
  };


  const handleCloseModal = () => setModalOpen(false);
  const theme = useTheme();
  return (
    <Stack>
      <TrackingInput
        value={containerNo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContainerNo(e.target.value)
        }
        onClick={handleTrack}
      />

      <Container maxWidth="xl" sx={{ my: 6, gap: 4 }}>
        <Stack gap={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                ml={0.5}
                sx={{
                  textAlign: "left",
                  color: "rgba(109, 110, 113, 1)",
                  fontWeight: 500,
                }}
              >
                Container Number
              </Typography>
              <TextField
                fullWidth
                disabled
                value={containerNo}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "60px",
                    borderRadius: "8px",
                    typography: "body1",
                    "& fieldset": { borderColor: "rgba(45, 55, 72, 0.2)" },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(45, 55, 72, 1)",
                    opacity: 1,
                    background: "white",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                ml={0.5}
                sx={{
                  textAlign: "left",
                  color: "rgba(109, 110, 113, 1)",
                  fontWeight: 500,
                }}
              >
                From
              </Typography>
              <TextField
                disabled
                fullWidth
                value={from}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(249, 250, 251, 1)",
                    height: "60px",
                    borderRadius: "8px",
                    typography: "body1",
                    "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(45, 55, 72, 1)",
                    opacity: 1,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                ml={0.5}
                sx={{
                  textAlign: "left",
                  color: "rgba(109, 110, 113, 1)",
                  fontWeight: 500,
                }}
              >
                To
              </Typography>
              <TextField
                disabled
                fullWidth
                value={to}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(249, 250, 251, 1)",
                    height: "60px",
                    borderRadius: "8px",
                    typography: "body1",
                    "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(45, 55, 72, 1)",
                    opacity: 1,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Stack
            sx={{
              border: "1px solid rgba(45, 55, 72, 0.2)",
              borderRadius: "8px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                py: 1,
                px: 3,
                borderRadius: "8px 8px 0 0",
                bgcolor: "rgba(54, 66, 86, 1)",
              }}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h4" color="white">
                FDCU0343247 | 40' Highcube
              </Typography>
              <Typography variant="body1" color="white">
                Emission 2.50613
              </Typography>
            </Stack>

            <Stack p={3} gap={3}>
              <Stack direction={"row"} justifyContent={"space-between"} >
                <Stack gap={1}>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Box width={"24px"} height={"24px"} component={"img"} src={calander} alt="location" />
                    <Typography variant="body1" sx={{ fontWeight: "600 !important" }} color="rgba(109, 110, 113, 1)">
                      Estimated arrival date
                    </Typography>
                  </Stack>
                  <Typography variant="h4"  >09/07/2025</Typography>
                </Stack>

                <Stack gap={1}>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Box width={"24px"} height={"24px"} component={"img"} src={location} alt="location" />
                    <Typography variant="body1" sx={{ fontWeight: "600 !important" }} color="rgba(109, 110, 113, 1)">
                      Last location
                    </Typography>
                  </Stack>
                  <Typography variant="h4"  >Vessel Departure Mundra, GJ (INMUN), INDIA
                    rr26/05/2025</Typography>
                </Stack>
                <Button variant="contained" sx={{ borderRadius: "8px", background: "rgba(26, 86, 219, 1)", typography: "body1", height: "42px" }}>Hide</Button>
              </Stack>
              <Divider sx={{ borderColor: "rgba(206, 208, 212, 1)" }} />

              <Box
                sx={{
                  p: 2,
                  border: "1px solid #E0E0E0",
                  borderRadius: 2,
                  bgcolor: "#FAFAFA",
                }}
              >
                <Stepper
                sx={{
                  
                }}
                  alternativeLabel
                  // activeStep={activeStep}
                  connector={<CustomConnector />}
                >
                  {ports.map((port, index) => (
                    <Step key={index} completed={port.completed}>
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        test
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        {/* <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography
              ml={0.5}
              sx={{ textAlign: "left", color: "#2D3748", fontWeight: 600 }}
            >
              Estimated Arrival Date
            </Typography>
            <TextField
              disabled
              fullWidth
              value={estimatedArrival}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(249, 250, 251, 1)",
                  height: "60px",
                  borderRadius: "8px",
                  typography: "body1",
                  "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(45, 55, 72, 1)",
                  opacity: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              ml={0.5}
              sx={{ textAlign: "left", color: "#2D3748", fontWeight: 600 }}
            >
              Last Location
            </Typography>
            <TextField
              disabled
              fullWidth
              value={lastLocation}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(249, 250, 251, 1)",
                  height: "60px",
                  borderRadius: "8px",
                  typography: "body1",
                  "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgba(45, 55, 72, 1)",
                  opacity: 1,
                },
              }}
            />
          </Grid>
        </Grid> */}
        {/* <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography
              ml={0.5}
              sx={{ textAlign: "left", color: "#2D3748", fontWeight: 600 }}
            >
              Vessel Journey
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              {vesselData.map((data, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography sx={{ color: "#2D3748" }}>
                    {data.departure} - {data.arrival}
                  </Typography>
                  <Typography sx={{ color: "#6D6E71" }}>
                    {data.from} → {data.to}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid> */}
        {/* {showMapButton && (
          <Button
            variant="contained"
            startIcon={<MapIcon />}
            sx={{
              mt: 3,
              backgroundColor: "#2DC26B",
              "&:hover": { backgroundColor: "#25B160" },
            }}
            onClick={handleMapView}
          >
            View in Map
          </Button>
        )}
        <iframe
          id="ifrmurl"
          src={iframeSrc}
          width="100%"
          height="450"
          frameBorder="0"
          scrolling="no"
          style={{
            visibility: iframeSrc ? "visible" : "hidden",
            marginTop: "20px",
          }}
        />
        {modalOpen && (
          <CustomModal>
            <ModalContent>
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  cursor: "pointer",
                }}
                onClick={handleCloseModal}
              />
              <iframe
                name="iFrameName"
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
              />
            </ModalContent>
          </CustomModal>
        )} */}
      </Container>
    </Stack>
  );
};

export default TrackingSection;
