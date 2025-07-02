// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Grid,
//   Stack,
//   TextField,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   StepConnector,
//   stepConnectorClasses,
// } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import { parseStringPromise } from "xml2js";
// import calander from "src/assets/icons/calander.png";
// import location from "src/assets/icons/location-track.png";
// import TrackingInput from "src/components/tracking/TrackingInput";
// import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

// // Custom Step Connector
// const CustomConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor: "#1A56DB",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 2,
//     border: 0,
//     backgroundColor: "#E0E0E0",
//   },
// }));

// // Custom Icon
// const StepIcon = ({ icon }: any) => (
//   <Box
//     sx={{
//       backgroundColor: "#1A56DB",
//       color: "white",
//       borderRadius: "50%",
//       width: 32,
//       height: 32,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   >
//     {icon}
//   </Box>
// );

// const TrackingSection = () => {
//   const [containerNo, setContainerNo] = useState<string>("");
//   const [trackingData, setTrackingData] = useState<any>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const myParam = urlParams.get("search");
//     if (myParam) {
//       setContainerNo(myParam);
//       fetchData(myParam);
//     }
//   }, []);

//   const fetchData = async (containerNo: string) => {
//     try {
//             const res = await axios.get(`https://api.blackstoneshipping.com/master-api/Tracking/Enquiry_02?pType=5&pContainerNo=${containerNo}`, {
//         headers: {
//           Accept: "application/json",
//         },
//         withCredentials: false 
//       });
//       const result = res.data?.result;
      
//       const summary = {
//         type: "40' Highcube",
//         fpod: result?.Table?.[0]?.html?.includes("Antwerpen") ? "Antwerpen, VAN (BEANR), BELGIUM" : "",
//         fpodEta: "09/07/2025", // extract from html string if needed
//       };
  
//       const vesselEvents = result?.Table2 || [];
//       const formattedEvents = vesselEvents.map((v: any, index: number) => [
//         {
//           location: v.POLName,
//           description: "Vessel Departure",
//           date: v.pETD?.slice(0, 10).split("-").reverse().join("/") || v.ETD?.slice(0, 10).split("-").reverse().join("/"),
//         },
//         {
//           location: v.PODName,
//           description: "Vessel Arrival",
//           date: v.ETA?.slice(0, 10).split("-").reverse().join("/"),
//         },
//       ]).flat();
      
//       // Add Last Location from event[0]
//       const events = formattedEvents;
  
//       setTrackingData({
//         summary,
//         events,
//       });
//     } catch (error) {
//       console.error("Error fetching tracking data:", error);
//     }
//   };

//   const handleTrack = () => {
//     if (containerNo) {
//       fetchData(containerNo);
//     }
//   };

//   const events = trackingData?.events || [];
//   const summary = trackingData?.summary || {};

//   console.log(events)

//   return (
//     <Stack>
//       <TrackingInput
//         value={containerNo}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setContainerNo(e.target.value)
//         }
//         onClick={handleTrack}
//       />

//       <Container maxWidth="xl" sx={{ my: 6, gap: 4 }}>
//         <Stack gap={3}>
//           {/* Top Inputs */}
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={4}>
//               <Typography ml={0.5} sx={{ textAlign: "left", color: "rgba(109, 110, 113, 1)", fontWeight: 500 }}>
//                 Container Number
//               </Typography>
//               <TextField
//                 fullWidth
//                 disabled
//                 value={containerNo}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     height: "60px",
//                     borderRadius: "8px",
//                     typography: "body1",
//                     "& fieldset": { borderColor: "rgba(45, 55, 72, 0.2)" },
//                   },
//                   "& .MuiInputBase-input.Mui-disabled": {
//                     WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                     opacity: 1,
//                     background: "white",
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <Typography ml={0.5} sx={{ textAlign: "left", color: "rgba(109, 110, 113, 1)", fontWeight: 500 }}>
//                 From
//               </Typography>
//               <TextField
//                 disabled
//                 fullWidth
//                 value={events[0]?.location || ""}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     backgroundColor: "rgba(249, 250, 251, 1)",
//                     height: "60px",
//                     borderRadius: "8px",
//                     typography: "body1",
//                     "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
//                   },
//                   "& .MuiInputBase-input.Mui-disabled": {
//                     WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                     opacity: 1,
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <Typography ml={0.5} sx={{ textAlign: "left", color: "rgba(109, 110, 113, 1)", fontWeight: 500 }}>
//                 To
//               </Typography>
//               <TextField
//                 disabled
//                 fullWidth
//                 value={summary.fpod || ""}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     backgroundColor: "rgba(249, 250, 251, 1)",
//                     height: "60px",
//                     borderRadius: "8px",
//                     typography: "body1",
//                     "& fieldset": { borderColor: "rgba(45, 55, 72, 0.5)" },
//                   },
//                   "& .MuiInputBase-input.Mui-disabled": {
//                     WebkitTextFillColor: "rgba(45, 55, 72, 1)",
//                     opacity: 1,
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* Tracking Box */}
//           {trackingData && (
//             <Stack sx={{ border: "1px solid rgba(45, 55, 72, 0.2)", borderRadius: "8px" }}>
//               <Stack
//                 sx={{ width: "100%", py: 1, px: 3, borderRadius: "8px 8px 0 0", bgcolor: "rgba(54, 66, 86, 1)" }}
//                 direction={"row"}
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//               >
//                 <Typography variant="h4" color="white">
//                   {containerNo} | {summary.type}
//                 </Typography>
//                 <Typography variant="body1" color="white">
//                   Emission 2.50613
//                 </Typography>
//               </Stack>

//               <Stack p={3} gap={3}>
//                 <Stack direction={"row"} justifyContent={"space-between"}>
//                   <Stack gap={1}>
//                     <Stack direction={"row"} alignItems={"center"} gap={1}>
//                       <Box width={"24px"} height={"24px"} component={"img"} src={calander} alt="calendar" />
//                       <Typography variant="body1" fontWeight={600} color="rgba(109, 110, 113, 1)">
//                         Estimated arrival date
//                       </Typography>
//                     </Stack>
//                     <Typography variant="h4">{summary.fpodEta}</Typography>
//                   </Stack>

//                   <Stack gap={1}>
//                     <Stack direction={"row"} alignItems={"center"} gap={1}>
//                       <Box width={"24px"} height={"24px"} component={"img"} src={location} alt="location" />
//                       <Typography variant="body1" fontWeight={600} color="rgba(109, 110, 113, 1)">
//                         Last location
//                       </Typography>
//                     </Stack>
//                     <Typography variant="h4">
//                       {events[0]?.description} {events[0]?.location}{" "}
//                       <small>rr{events[0]?.date}</small>
//                     </Typography>
//                   </Stack>

//                   <Button
//                     variant="contained"
//                     sx={{
//                       borderRadius: "8px",
//                       background: "rgba(26, 86, 219, 1)",
//                       typography: "body1",
//                       height: "42px",
//                     }} 
//                   >
//                     Hide
//                   </Button>
//                 </Stack>

//                 <Divider sx={{ borderColor: "rgba(206, 208, 212, 1)" }} />

//                 {/* Stepper */}
//                 <Box sx={{ p: 2, border: "1px solid #E0E0E0", borderRadius: 2, bgcolor: "#FAFAFA", width: "100%" }}>
//                 <Stepper alternativeLabel connector={<CustomConnector />}>
//   {events.map((event, index) => ( 
//     <Step key={index}>
//       <StepLabel
//         StepIconComponent={() => (
//           <Box 
//             sx={{
//               width: 32,
//               height: 32,
//               bgcolor: index === 0 ? "#1A56DB" : "#D1D5DB",
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: index === 0 ? "white" : "#4B5563",
//             }}
//           >
//             <DirectionsBoatIcon sx={{ fontSize: 18 }} />
//           </Box>
//         )}
//       >
//         <Stack spacing={1} alignItems="center">
//           <Typography variant="caption" fontWeight={600}>
//             {event.description}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             {event.date}
//           </Typography>
//           <Typography
//             variant="caption"
//             color="text.secondary"
//             textAlign="center"
//           >
//             {event.location}
//           </Typography>
//         </Stack>
//       </StepLabel>
//     </Step>
//   ))}
// </Stepper>

//                 </Box>
//               </Stack>
//             </Stack>
//           )}
//         </Stack>
//       </Container>
//     </Stack>
//   );
// };

// export default TrackingSection;
