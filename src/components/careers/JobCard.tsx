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
      py={2}
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack>
        <Typography variant="h4">{data.title}</Typography>
        <Typography color="rgba(109, 110, 113, 1)" variant="body2">
          {`Posted ${moment(data.date).fromNow()}`}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} mt={1} gap={1}>
          <Box
            component={"img"}
            src={location}
            alt={"location"}
            width="24px"
            alignItems={"center"}
          />
          <Typography variant="h6">
            {data.jobOpeningsOptions.jobLocation.nodes[0].name}
          </Typography>
        </Stack>
      </Stack>
      <Button
        sx={{
          bgcolor: "rgba(14, 159, 110, 1)",
          color: "white",
          fontSize: "18px !important",
          fontWeight: "600 !important",
          height: "65px",
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
