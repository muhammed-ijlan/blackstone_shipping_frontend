import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TrackingInput from "src/components/tracking/TrackingInput";
import calander from "src/assets/icons/calander.png";
import location from "src/assets/icons/location-track.png";
import boatIcon from "src/assets/icons/boatIconWhite.png";
import boatIconGray from "src/assets/icons/boatIconGray.png";
import TrackingMap from "src/components/tracking/TrackingMap";

interface TrackingEvent {
    location: string;
    description: string;
    date: string;
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.root}`]: {
        position: 'absolute !important',
    },
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 75,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#1A56DB",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#1A56DB",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 2,
        border: 0,
        backgroundColor: "#E0E0E0",
    },
}));

const TrackingSection = () => {
    const [containerNo, setContainerNo] = useState<string>("");
    const [trackingData, setTrackingData] = useState<{
        summary: {
            type: string;
            fpod: string;
            fpodEta: string;
        };
        events: TrackingEvent[];
    } | null>(null);
    const [activeStep, setActiveStep] = useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);

    const fetchTrackingData = async (number: string) => {
        try {
            const response = await axios.post(
                "https://api.blackstoneshipping.com/master-api/Tracking/track_container",
                {
                    BLISS: {
                        CONTAINER: {
                            Type: 5,
                            ContainerNo: number
                        }
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: import.meta.env.VITE_TRACKING_AUTH_TOKEN,
                        appid: import.meta.env.VITE_TRACKING_APP_ID,
                        keyid: import.meta.env.VITE_TRACKING_KEY_ID,
                    }
                }
            );

            const table = response.data.result.Table;
            setData(table);

            const summary = {
                type: table?.[0]?.ISOCode === "45G1" ? "40' Highcube" : table?.[0]?.ISOCode || "",
                fpod: table.at(-1)?.PODName || "",
                fpodEta: table.at(-1)?.ETA || "",
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rawEvents: TrackingEvent[] = table.flatMap((row: any) => {
                const events: TrackingEvent[] = [];
                if (row.ETD) {
                    events.push({
                        location: `${row.POLName}, ${row.POLPortCode}`,
                        description: "Vessel Departure",
                        date: row.ETD,
                    });
                }
                if (row.ETA) {
                    events.push({
                        location: `${row.PODName}, ${row.PODPortcode}`,
                        description: "Vessel Arrival",
                        date: row.ETA,
                    });
                }
                return events;
            });

            const parseDate = (d: string) => {
                const [dd, mm, yyyy] = d.split("/");
                return new Date(`${yyyy}-${mm}-${dd}`).getTime();
            };

            const events = rawEvents
                .filter(e => e.date && e.location)
                .sort((a, b) => parseDate(a.date) - parseDate(b.date));

            const today = new Date();
            const todayTime = today.setHours(0, 0, 0, 0);

            const activeIndex = events.reduce((acc, curr, idx) => {
                const stepDate = parseDate(curr.date);
                return stepDate <= todayTime ? idx : acc;
            }, -1);

            setTrackingData({ summary, events });
            setActiveStep(activeIndex === -1 ? 0 : activeIndex);
        } catch (err) {
            console.error("Tracking error:", err);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialContainer = urlParams.get("search");
        if (initialContainer) {
            setContainerNo(initialContainer);
            fetchTrackingData(initialContainer);
        }
    }, []);

    const summary = trackingData?.summary || { type: "", fpod: "", fpodEta: "" };
    const events = trackingData?.events || [];

    return (
        <Stack>
            <TrackingInput
                value={containerNo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContainerNo(e.target.value)}
                onClick={() => fetchTrackingData(containerNo)}
            />

            <Container maxWidth="xl" sx={{ my: 6, gap: 4 }}>
                <Stack gap={3}>
                    {/* Grid with TextFields */}
                    <Grid container spacing={{xs:0,md:2}} alignItems="center">
                        <Grid size={{xs:12,md:4}}>
                            <Typography ml={0.5} sx={{ textAlign: "left", color: "rgba(109, 110, 113, 1)", fontWeight: 500 }}>
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

                        <Grid size={{xs:12,md:4}}>
                            <Typography ml={0.5} sx={{ textAlign: "left", color: "rgba(109, 110, 113, 1)", fontWeight: 500 }}>
                                From
                            </Typography>
                            <TextField
                                disabled
                                fullWidth
                                value={events[0]?.location || ""}
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

                        <Grid size={{xs:12,md:4}}>
                            <Typography ml={0.5} sx={{ textAlign: "left", color: "rgba(109, 110, 113, 1)", fontWeight: 500 }}>
                                To
                            </Typography>
                            <TextField
                                disabled
                                fullWidth
                                value={summary.fpod}
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

                    {trackingData && (
                        <Stack gap={3}>
                            {/* Tracking Box Header and Details */}
                            <Stack sx={{ border: "1px solid rgba(45, 55, 72, 0.2)", borderRadius: "8px" }}>
                                <Stack
                                    sx={{ width: "100%", py: 1, px: 3, borderRadius: "8px 8px 0 0", bgcolor: "rgba(54, 66, 86, 1)" }}
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <Typography variant="h4" color="white">
                                        {containerNo} | {summary.type}
                                    </Typography>
                                    <Typography variant="body1" color="white">
                                        {/* Replace with dynamic emission value if available */}
                                        Emission: N/A
                                    </Typography>
                                </Stack>

                                <Stack p={3} gap={3}>
                                    <Stack direction={{xs:"column",md:"row"}} gap={{xs:2,md:0}} justifyContent={"space-between"}>
                                        <Stack gap={1}>
                                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                                <Box width={"24px"} height={"24px"} component={"img"} src={calander} alt="calendar" />
                                                <Typography variant="body1" fontWeight={600} color="rgba(109, 110, 113, 1)">
                                                    Estimated arrival date
                                                </Typography>
                                            </Stack>
                                            <Typography variant="h4">{summary.fpodEta}</Typography>
                                        </Stack>

                                        <Stack gap={1} >
                                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                                <Box width={"24px"} height={"24px"} component={"img"} src={location} alt="location" />
                                                <Typography variant="body1" fontWeight={600} color="rgba(109, 110, 113, 1)">
                                                    Last location
                                                </Typography>
                                            </Stack>
                                            <Typography variant="h4">
                                                {events[events.length - 1]?.description} {events[events.length - 1]?.location}{" "}
                                                <small>{events[events.length - 1]?.date}</small>
                                            </Typography>
                                        </Stack>

                                        
                                    </Stack>

                                    <Divider sx={{ borderColor: "rgba(206, 208, 212, 1)" }} />

                                    <Stack  gap={3}>
                                        <Box sx={{ p: 3, bgcolor: "#FAFAFA" ,border: "1px solid rgba(45, 55, 72, 0.2)", borderRadius: "8px"}}  >
                                            <Box sx={{ display: { xs: "block", md: "none" } }}>
                                                <Stepper orientation="vertical" activeStep={activeStep}>
                                                    {events.map((event, index) => {
                                                        const isCompleted = new Date(event.date.split("/").reverse().join("-")).getTime() <= new Date().setHours(0, 0, 0, 0);
                                                        return (
                                                            <Step key={index} completed={isCompleted}>
                                                                <StepLabel
                                                                    icon={
                                                                        <Box sx={{ width: 35, height: 35, bgcolor: isCompleted ? "#1A56DB" : "#D9D9D9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                            <Box component="img" src={isCompleted ? boatIcon : boatIconGray} width={24} height={9} />
                                                                        </Box>
                                                                    }
                                                                >
                                                                    <Stack spacing={0.5}>
                                                                        <Typography fontWeight={600}>{event.description}</Typography>
                                                                        <Typography>{event.date}</Typography>
                                                                        <Typography fontWeight={600}>{event.location}</Typography>
                                                                    </Stack>
                                                                </StepLabel>
                                                            </Step>
                                                        );
                                                    })}
                                                </Stepper>
                                            </Box>

                                            <Box sx={{ display: { xs: "none", md: "block" } }}>
                                                <Stepper alternativeLabel activeStep={activeStep} connector={<CustomConnector />}>
                                                    {events.map((event, index) => {
                                                        const isCompleted = new Date(event.date.split("/").reverse().join("-")).getTime() <= new Date().setHours(0, 0, 0, 0);
                                                        return (
                                                            <Step key={index} completed={isCompleted}>
                                                                <StepLabel
                                                                    StepIconComponent={() => (
                                                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                            <Typography fontWeight={600}>{event.description}</Typography>
                                                                            <Typography>{event.date}</Typography>
                                                                            <Box sx={{ mt: 0.5, mb: 0.5, width: 35, height: 35, bgcolor: isCompleted ? "#1A56DB" : "#D9D9D9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                                                                                <Box component="img" src={isCompleted ? boatIcon : boatIconGray} width={24} height={9} />
                                                                            </Box>
                                                                            <Typography fontWeight={600} align="center" maxWidth={200}>{event.location}</Typography>
                                                                        </Box>
                                                                    )}
                                                                />
                                                            </Step>
                                                        );
                                                    })}
                                                </Stepper>
                                            </Box>
                                        </Box>
                                        <TrackingMap containerNo={containerNo} />
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/* Stepper and Map in a separate Stack to match previous layout */}
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Stack>
    );
};

export default TrackingSection;