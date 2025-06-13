import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { OfficeLocationsData } from "src/types/graphql/types/support.types";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const cellStyle = {
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: "12px",
  color: "white",
  verticalAlign: "top",
};
const cellStyle1 = {
  borderRight: "1px solid rgba(255, 255, 255, 0.2)",
  padding: "12px",
  color: "white",
  verticalAlign: "top",
};
const baseCellStyle = {
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "12px",
  color: "white",
  verticalAlign: "top",
  fontSize: "14px",
};

const OfficeLocation = ({ data }: { data: OfficeLocationsData }) => {
  return (
    <Stack
      sx={{
        bgcolor: "rgba(45, 55, 72, 1)",
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack gap={5} color={"white"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h2" color="white">
              Office Locations
            </Typography>
            <Stack width={{ xs: "100%", sm: "auto" }}>
              <TextField
                name="search"
                placeholder="Search"
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "rgba(217, 217, 217, 1)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(217, 217, 217, 1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(217, 217, 217, 1)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(217, 217, 217, 1)",
                    },
                  },
                }}
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "rgba(217, 217, 217, 1)",
                      opacity: 1,
                    },
                  },
                }}
              />
            </Stack>
          </Stack>

          <Box
            sx={{
              border: "none",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <Table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <Thead>
                <Tr
                  style={{
                    backgroundColor: "rgba(54, 66, 86, 1)",
                    color: "white",
                  }}
                >
                  <Th
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "12px",
                      color: "white",
                      verticalAlign: "top",
                    }}
                  >
                    Country
                  </Th>
                  <Th
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "12px",
                      color: "white",
                      verticalAlign: "top",
                    }}
                  >
                    City
                  </Th>
                  <Th
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "12px",
                      color: "white",
                      verticalAlign: "top",
                    }}
                  >
                    Address
                  </Th>
                  <Th
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "12px",
                      color: "white",
                      verticalAlign: "top",
                    }}
                  >
                    Phone
                  </Th>
                  <Th
                    style={{
                      padding: "12px",
                      color: "white",
                      verticalAlign: "top",
                    }}
                  >
                    Email
                  </Th>
                </Tr>
              </Thead>

              <Tbody style={{ backgroundColor: "rgba(45, 55, 72, 1)" }}>
                {data.officeLocations.nodes.map((item) => (
                  <Tr key={item.id}>
                    <Td
                      style={{
                        ...baseCellStyle,
                        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <Stack direction="row" alignItems="center" gap={1}>
                        <img
                          src={
                            item.officeLocationsOptions.country.nodes[0]
                              .countriesOptions?.countryFlag?.node?.sourceUrl
                          }
                          alt="flag"
                          width={20}
                          height={14}
                          style={{ objectFit: "cover" }}
                        />
                        {item.officeLocationsOptions.country.nodes[0].name}
                      </Stack>
                    </Td>
                    <Td
                      style={{
                        ...baseCellStyle,
                        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {item.title}
                    </Td>
                    <Td
                      style={{
                        ...baseCellStyle,
                        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {item.officeLocationsOptions.address?.replace(
                        /\r?\n/g,
                        "<br />"
                      )}
                    </Td>
                    <Td
                      style={{
                        ...baseCellStyle,
                        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {item.officeLocationsOptions.phoneNumber}
                    </Td>
                    <Td style={baseCellStyle}>
                      {item.officeLocationsOptions.emailAddress}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
};

export default OfficeLocation;
