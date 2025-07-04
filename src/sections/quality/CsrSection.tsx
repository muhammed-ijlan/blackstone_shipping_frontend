import { useQuery } from "@apollo/client";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomSlider2 from "src/components/customSlider/CustomSlider2";
import { GET_CSR_BY_YEAR, GET_CSR_YEARS } from "src/graphql/queries";
import {
  GetCSRByYearData,
  GetCSRByYearVars,
  GetCsrYearsData,
} from "src/types/graphql/types/quality.types";

const CsrSection = () => {
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const { data: yearData } = useQuery<GetCsrYearsData>(GET_CSR_YEARS);

  const [selectedYear, setSelectedYear] = useState<string>(
    yearData?.csrYears.nodes[yearData?.csrYears.nodes.length - 2].slug ?? ""
  );
  useEffect(() => {
    setSelectedYear(
      yearData?.csrYears.nodes[yearData?.csrYears.nodes.length - 2].slug ?? ""
    );
  }, [yearData]);
  const { data } = useQuery<GetCSRByYearData, GetCSRByYearVars>(
    GET_CSR_BY_YEAR,
    {
      variables: { yearSlug: selectedYear ? [selectedYear] : [] },
      skip: !selectedYear,
    }
  );

  return (
    <Stack my={6} gap={3}>
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          gap: "10px",
          position: "relative",
        }}
      >
        CSR{" "}
        <Typography
          variant="subtitle2"
          sx={{
            position: "absolute",
            ml: 12,
            bottom: "6px",
          }}
        >
          (Corporate Social Responsibility)
        </Typography>
      </Typography>
      <Stack>
        <Typography>Year</Typography>
        <TextField
          select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          sx={{ width: "190px" }}
        >
          {yearData?.csrYears.nodes.map((year) => (
            <MenuItem key={year.name} value={year.name}>
              {year.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <CustomSlider2 scrollRef={scrollRef} autoScroll={true} scrollSpeed={1}>
        {data?.csrs.nodes.map((item, index) => (
          <Stack
            key={index}
            width={"500px"}
            position={"relative"}
            sx={{
              minWidth: "400px",
              maxWidth: "400px",
              borderRadius: "5px",
              mb: 3,
              height: "auto",
            }}
          >
            <Typography
              bottom={40}
              left={40}
              width={"50%"}
              color="white"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "20px",
                  textAlign: "left !important",
                },
              }}
              fontWeight={600}
              position="absolute"
              zIndex={888}
            >
              {item.title}
            </Typography>
            <Box
              component={"div"}
              dangerouslySetInnerHTML={{ __html: item.content }}
              bottom={-5}
              left={40}
              width={"50%"}
              color="white"
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "20px",
                  textAlign: "left !important",
                },
              }}
              fontWeight={600}
              position="absolute"
              zIndex={888}
            />
            <Box
              component="img"
              src={item.featuredImage?.node?.sourceUrl}
              width="100%"
              height={"270px"}
              sx={{ filter: "brightness(80%)" }}
              borderRadius="7px"
              alt={item.title}
            />
          </Stack>
        ))}
      </CustomSlider2>
    </Stack>
  );
};

export default CsrSection;
