import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { GetCareersPageData } from "src/types/graphql/types/careers.types";

const WeAreLookingFor = ({ data }: { data: GetCareersPageData }) => {
  return (
    <Stack my={3} gap={3}>
      <Typography variant="h2" color="rgba(133, 137, 147, 1)">
        {data.page.careersPageWeAreLookingForSection.title}
      </Typography>
      <Stack direction={{ xs: "column", lg: "row" }} gap={4} alignItems={"center"}>
        <Stack gap={2} width={"100%"}>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Stack
              sx={{
                border: "1px solid rgba(45, 55, 72, 1)",
                borderRadius: { xs: "50px", sm: "50px" },
                width: "82px!important",
                height: {xs:"50px !important",sm:"60px !important"},
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="rgba(45, 55, 72, 1)" variant="h4">
                01
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              width={"100%"}
              sx={{
                textTransform: "uppercase !important",
                fontWeight: "700 !important",
                textAlign: "left !important",
              }}
            >
              {data.page.careersPageWeAreLookingForSection.number1}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Stack
              sx={{
                border: "1px solid rgba(45, 55, 72, 1)",
                borderRadius: { xs: "50px", sm: "50px" },
                width: "82px !important",
                  height: {xs:"50px !important",sm:"60px !important"},
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="rgba(45, 55, 72, 1)" variant="h4">
                02
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              width={"100%"}
              sx={{
                textTransform: "uppercase !important",
                fontWeight: "700 !important",
                textAlign: "left !important",
              }}
            >
              {data.page.careersPageWeAreLookingForSection.number2}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Stack
              sx={{
                border: "1px solid rgba(45, 55, 72, 1)",
                borderRadius: { xs: "50px", sm: "50px" },
                width: "82px !important",
                  height: {xs:"50px !important",sm:"60px !important"},
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="rgba(45, 55, 72, 1)" variant="h4">
                03
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              width={"100%"}
              sx={{
                textTransform: "uppercase !important",
                fontWeight: "700 !important",
                textAlign: "left !important",
              }}
            >
              {data.page.careersPageWeAreLookingForSection.number3}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Stack
              sx={{
                border: "1px solid rgba(45, 55, 72, 1)",
                borderRadius: { xs: "50px", sm: "50px" },
                width: "82px !important",
                  height: {xs:"50px !important",sm:"60px !important"},
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="rgba(45, 55, 72, 1)" variant="h4">
                04
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              width={"100%"}
              sx={{
                textTransform: "uppercase !important",
                fontWeight: "700 !important",
                textAlign: "left !important",
              }}
            >
              {data.page.careersPageWeAreLookingForSection.number4}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Stack
              sx={{
                border: "1px solid rgba(45, 55, 72, 1)",
                borderRadius: { xs: "50px", sm: "50px" },
                width: "82px !important",
                  height: {xs:"50px !important",sm:"60px !important"},
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="rgba(45, 55, 72, 1)" variant="h4">
                05
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              width={"100%"}
              sx={{
                textTransform: "uppercase !important",
                fontWeight: "700 !important",
                textAlign: "left !important",
              }}
            >
              {data.page.careersPageWeAreLookingForSection.number5}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          width={{ xs: "100%", lg: "70%" }}
          sx={{
            bgcolor: "rgba(45, 55, 72, 1)",
            borderRadius: "8px",
            color: "white",
            p: 3,
          }}
        >
          <Box
            sx={{ "& p": { margin:"0",typography:{xs:"h6",sm: "h3"},textAlign:{xs:"center !important",sm:"left !important"} },textTransform:"capitalize !important" ,}}
            component={"div"}
            dangerouslySetInnerHTML={{
              __html:
                data.page.careersPageWeAreLookingForSection.rightSideContent,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WeAreLookingFor;
