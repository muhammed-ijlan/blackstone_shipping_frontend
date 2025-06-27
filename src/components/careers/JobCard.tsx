import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import location from "src/assets/icons/location.png";
import arrow from "src/assets/icons/arrowWhite.png";
import { JobOpening } from "src/types/graphql/types/careers.types";
import moment from "moment";
import { useRouter } from "src/routes/hooks";

const JobCard = ({ data }: { data: JobOpening }) => {
  const router = useRouter();
  return (
    <Stack
      p={2}
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={{ xs: 2 }}
      sx={{
        border:{xs:"1px solid rgba(206, 208, 212, 1)",sm:"none"},
        borderRadius:"8px",
        padding:"10px",
      }}
    >
      <Stack gap={1}>
        <Typography variant="h4">{data.title}</Typography>
        <Typography color="rgba(109, 110, 113, 1)" variant="body2">
          {`Posted ${moment(data.date).fromNow()}`}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} mt={{xs:0, sm:1}} gap={1}>
          <Box
            component={"img"}
            src={location}
            alt={"location"}
            width="24px"
            alignItems={"center"}
          />
          <Typography sx={{ typography: { xs: "h5", md: "h6" } }}>
            {data.jobOpeningsOptions.jobLocation.nodes[0].name}
          </Typography>
        </Stack>
      </Stack>
      <Button
        sx={{
          width:{xs:"100%",sm:"auto"},
          bgcolor: "rgba(14, 159, 110, 1)",
          color: "white",
          // fontSize: "18px !important",
          typography: "h4",
          fontWeight: "600 !important",
          height: { xs: "50px", sm: "65px" },
          px: 3,
          ":hover": {
            bgcolor: "rgba(10, 120, 85, 1)",
          },
        }}
        endIcon={
          <Box
            component={"img"}
            src={arrow}
            alt={"arrow"}
            width="24px"
            alignItems={"center"}
          />
        }
        onClick={() => router.push(`/careers/${data.id}`)}
      >
        Submit Application
      </Button>
    </Stack>
  );
};

export default JobCard;
