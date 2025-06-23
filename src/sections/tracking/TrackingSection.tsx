// import {
//   Button,
//   Container,
//   Grid,
//   Stack,
//   TextField,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import TrackingInput from "src/components/tracking/TrackingInput";
// import MapIcon from "@mui/icons-material/Map";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";

// interface VesselData {
//   departure: string;
//   arrival: string;
//   from: string;
//   to: string;
// }

// const CustomModal = styled("div")({
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "rgba(0,0,0,0.5)",
//   zIndex: 1000,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// const ModalContent = styled("div")({
//   background: "#fff",
//   padding: "20px",
//   borderRadius: "8px",
//   position: "relative",
//   width: "90%",
//   maxWidth: "900px",
//   maxHeight: "90vh",
//   overflowY: "auto",
// });

// const TrackingSection = () => {
//   const [containerNo, setContainerNo] = useState<string>("");
//   const [from, setFrom] = useState<string>("Mundra Port, Mundra");
//   const [to, setTo] = useState<string>("Antwerpen");
//   const [estimatedArrival, setEstimatedArrival] =
//     useState<string>("09/07/2025");
//   const [lastLocation, setLastLocation] = useState<string>(
//     "Vessel Departure Mundra, GJ (INMUN), INDIA Rr 26/05/2025"
//   );
//   const [vesselData, setVesselData] = useState<VesselData[]>([
//     {
//       departure: "28/05/2025",
//       arrival: "03/07/2025",
//       from: "Mundra, GJ (INMUN), INDIA",
//       to: "Rotterdam, ZH (NLRTM), NETHERLANDS",
//     },
//     {
//       departure: "03/07/2025",
//       arrival: "09/07/2025",
//       from: "Rotterdam, ZH (NLRTM), NETHERLANDS",
//       to: "Antwerpen, VAN (BEANR), BELGIUM",
//     },
//   ]);
//   const [iframeSrc, setIframeSrc] = useState<string>("about:blank");
//   const [showMapButton, setShowMapButton] = useState<boolean>(false);
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [lat, setLat] = useState<string>("");
//   const [lon, setLon] = useState<string>("");
//   const [vesselName, setVesselName] = useState<string>("");
//   const [timestamp, setTimestamp] = useState<string>("");
//   const [speed, setSpeed] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const myParam = urlParams.get("search");
//     if (myParam) {
//       setContainerNo(myParam);
//       fetchData(myParam);
//     }
//   }, []);

//   const fetchData = async (container: string) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://api.blackstoneshipping.com/master-api/Tracking/Enquiry_02?pType=5&pContainerNo=${container}`
//       );
//       const data = response.data;
//       if (data.result.Table[0].htmlmaersk) {
//         setIframeSrc(data.result.Table[0].TrackingURL || "");
//         setFrom(data.result.Table[0].from || "Mundra Port, Mundra");
//         setTo(data.result.Table[0].to || "Antwerpen");
//         setEstimatedArrival(
//           data.result.Table[0].estimatedArrival || "09/07/2025"
//         );
//         setLastLocation(
//           data.result.Table[0].lastLocation ||
//             "Vessel Departure Mundra, GJ (INMUN), INDIA Rr 26/05/2025"
//         );
//         setVesselData(
//           data.result.Table[0].vesselData || [
//             {
//               departure: "28/05/2025",
//               arrival: "03/07/2025",
//               from: "Mundra, GJ (INMUN), INDIA",
//               to: "Rotterdam, ZH (NLRTM), NETHERLANDS",
//             },
//             {
//               departure: "03/07/2025",
//               arrival: "09/07/2025",
//               from: "Rotterdam, ZH (NLRTM), NETHERLANDS",
//               to: "Antwerpen, VAN (BEANR), BELGIUM",
//             },
//           ]
//         );
//         try {
//           if (
//             data.result.Table1[0].LAT &&
//             data.result.Table1[0].LAT !== "" &&
//             data.result.Table1[0].LAT !== null
//           ) {
//             setLat(data.result.Table1[0].LAT);
//             setLon(data.result.Table1[0].LON);
//             setVesselName(data.result.Table1[0].VesselName);
//             setTimestamp(data.result.Table1[0].TimeStamp);
//             setSpeed(data.result.Table1[0].Speed);
//             setShowMapButton(true);
//           } else {
//             setShowMapButton(false);
//           }
//         } catch (err) {
//           setShowMapButton(false);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTrack = () => {
//     if (containerNo) {
//       fetchData(containerNo);
//     }
//   };

//   const handleMapView = () => {
//     const mapUrl = `https://vzone.in:2637/tracklivemap.html?LAT=${lat}&LON=${lon}&VesselName=${vesselName}&TIMESTAMP=${timestamp}&Speed=${speed}`;
//     setModalOpen(true);
//     const iframe = document.getElementsByName("iFrameName")[0] as
//       | HTMLIFrameElement
//       | undefined;
//     if (iframe) iframe.src = mapUrl;
//   };

//   const handleCloseModal = () => setModalOpen(false);

//   return (
//     <Stack>
//       <TrackingInput
//         value={containerNo}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setContainerNo(e.target.value)
//         }
//       />

//       <Container maxWidth="xl" sx={{ my: 6 }}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={3}>
//             <Typography
//               ml={0.5}
//               sx={{
//                 textAlign: "left",
//                 color: "rgba(109, 110, 113, 1)",
//                 fontWeight: 500,
//               }}
//             >
//               Container Number
//             </Typography>
//             <TextField
//               fullWidth
//               value={containerNo}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 setContainerNo(e.target.value)
//               }
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   height: "60px",
//                   borderRadius: "8px",
//                   typography: "body1",
//                   "& fieldset": { borderColor: "rgba(45, 55, 72, 0.2)" },
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Typography
//               ml={0.5}
//               sx={{
//                 textAlign: "left",
//                 color: "rgba(109, 110, 113, 1)",
//                 fontWeight: 500,
//               }}
//             >
//               From
//             </Typography>
//             <TextField
//               disabled
//               fullWidth
//               value={from}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "rgba(249, 250, 251, 1)",
//                   height: "60px",
//                   borderRadius: "8px",
//                   typography: "body1",
//                   "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
//                 },
//                 "& .MuiInputBase-input.Mui-disabled": {
//                   WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                   opacity: 1,
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Typography
//               ml={0.5}
//               sx={{
//                 textAlign: "left",
//                 color: "rgba(109, 110, 113, 1)",
//                 fontWeight: 500,
//               }}
//             >
//               To
//             </Typography>
//             <TextField
//               disabled
//               fullWidth
//               value={to}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "rgba(249, 250, 251, 1)",
//                   height: "60px",
//                   borderRadius: "8px",
//                   typography: "body1",
//                   "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
//                 },
//                 "& .MuiInputBase-input.Mui-disabled": {
//                   WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                   opacity: 1,
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Button
//               variant="contained"
//               sx={{
//                 mt: { xs: 2, md: 0 },
//                 height: "60px",
//                 backgroundColor: "#2DC26B",
//                 "&:hover": { backgroundColor: "#25B160" },
//                 width: "100%",
//               }}
//               onClick={handleTrack}
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Track"
//               )}
//             </Button>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={12} md={6}>
//             <Typography
//               ml={0.5}
//               sx={{ textAlign: "left", color: "#2D3748", fontWeight: 600 }}
//             >
//               Estimated Arrival Date
//             </Typography>
//             <TextField
//               disabled
//               fullWidth
//               value={estimatedArrival}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "rgba(249, 250, 251, 1)",
//                   height: "60px",
//                   borderRadius: "8px",
//                   typography: "body1",
//                   "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
//                 },
//                 "& .MuiInputBase-input.Mui-disabled": {
//                   WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                   opacity: 1,
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography
//               ml={0.5}
//               sx={{ textAlign: "left", color: "#2D3748", fontWeight: 600 }}
//             >
//               Last Location
//             </Typography>
//             <TextField
//               disabled
//               fullWidth
//               value={lastLocation}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: "rgba(249, 250, 251, 1)",
//                   height: "60px",
//                   borderRadius: "8px",
//                   typography: "body1",
//                   "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
//                 },
//                 "& .MuiInputBase-input.Mui-disabled": {
//                   WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                   opacity: 1,
//                 },
//               }}
//             />
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={12}>
//             <Typography
//               ml={0.5}
//               sx={{ textAlign: "left", color: "#2D3748", fontWeight: 600 }}
//             >
//               Vessel Journey
//             </Typography>
//             <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
//               {vesselData.map((data, index) => (
//                 <Stack
//                   key={index}
//                   direction="row"
//                   alignItems="center"
//                   spacing={1}
//                 >
//                   <Typography sx={{ color: "#2D3748" }}>
//                     {data.departure} - {data.arrival}
//                   </Typography>
//                   <Typography sx={{ color: "#6D6E71" }}>
//                     {data.from} → {data.to}
//                   </Typography>
//                 </Stack>
//               ))}
//             </Stack>
//           </Grid>
//         </Grid>

//         {showMapButton && (
//           <Button
//             variant="contained"
//             startIcon={<MapIcon />}
//             sx={{
//               mt: 3,
//               backgroundColor: "#2DC26B",
//               "&:hover": { backgroundColor: "#25B160" },
//             }}
//             onClick={handleMapView}
//           >
//             View in Map
//           </Button>
//         )}
//         <iframe
//           id="ifrmurl"
//           src={iframeSrc}
//           width="100%"
//           height="450"
//           frameBorder="0"
//           scrolling="no"
//           style={{
//             visibility: iframeSrc ? "visible" : "hidden",
//             marginTop: "20px",
//           }}
//         />
//         {modalOpen && (
//           <CustomModal>
//             <ModalContent>
//               <CloseIcon
//                 sx={{
//                   position: "absolute",
//                   top: 10,
//                   right: 10,
//                   cursor: "pointer",
//                 }}
//                 onClick={handleCloseModal}
//               />
//               <iframe
//                 name="iFrameName"
//                 width="100%"
//                 height="600"
//                 frameBorder="0"
//                 scrolling="no"
//               />
//             </ModalContent>
//           </CustomModal>
//         )}
//       </Container>
//     </Stack>
//   );
// };

// export default TrackingSection;
