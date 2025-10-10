import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useOfficeLocations } from "src/graphql/hooks/useOfficeLocation";
import { useRouter } from "src/routes/hooks";
import LoadingFallback from "../LoadingFallback";
import OfficeLocationMobile from "./OfficeLocationMobile";

const baseCellStyle = {
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "12px",
  color: "white",
  verticalAlign: "top",
  fontSize: "14px",
};

const OfficeLocation: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { locations, loading, error } = useOfficeLocations();

  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ }
  const filteredLocations = locations.filter((item: any) => {
    const query = search.toLowerCase();
    const country =
      item.officeLocationsOptions.country.nodes[0]?.name?.toLowerCase() || "";
    const city = item.title?.toLowerCase() || "";
    const address = item.officeLocationsOptions.address?.toLowerCase() || "";
    const phone = item.officeLocationsOptions.phoneNumber?.toLowerCase() || "";
    const email = item.officeLocationsOptions.emailAddress?.toLowerCase() || "";

    return (
      country.includes(query) ||
      city.includes(query) ||
      address.includes(query) ||
      phone.includes(query) ||
      email.includes(query)
    );
  });

  return (
    <Stack
      sx={{
        bgcolor: "rgba(45, 55, 72, 1)",
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack gap={{ xs: 0, md: 5 }} color={"white"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h2" color="white">
              Office Locations
            </Typography>

            {/* Search Input */}
            <Stack width={{ xs: "100%", sm: "auto" }} display={{ xs: "none", md: "block" }}>
              <TextField
                fullWidth
                name="search"
                placeholder="Search"
                size="small"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                    color: "white",
                    height: 56,
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

          {/* Table View */}
          {loading ? (
            <LoadingFallback />
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                border: "none",
                borderRadius: "6px",
                // overflow: "hidden",
                overflowX: "auto",
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
                <Box my={0.5} />
                <Tbody style={{ backgroundColor: "rgba(45, 55, 72, 1)" }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {filteredLocations.map((item: any) => (
                    <Tr key={item.id}>
                      <Td
                        style={{
                          ...baseCellStyle,
                          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                          borderTop: "1px solid rgba(217, 217, 217, 1)",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          component={"span"}
                        >
                          <img
                            src={
                              item.officeLocationsOptions.country.nodes[0]
                                ?.countriesOptions?.countryFlag?.node?.sourceUrl
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
                          borderTop: "1px solid rgba(217, 217, 217, 1)",
                          cursor: "pointer"
                        }}
                        onClick={() =>
                          router.push(
                            `/support${item.uri}`
                          )
                        }
                      >
                        {item.title}
                      </Td>
                      <Td
                        style={{
                          ...baseCellStyle,
                          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                          borderTop: "1px solid rgba(217, 217, 217, 1)",
                        }}
                      >
                        <Box
                          component={"span"}
                          dangerouslySetInnerHTML={{
                            __html:
                              item.officeLocationsOptions.address?.replace(
                                /\r?\n/g,
                                "<br/>"
                              ) || "",
                          }}
                        />
                      </Td>
                      <Td
                        style={{
                          ...baseCellStyle,
                          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                          borderTop: "1px solid rgba(217, 217, 217, 1)",
                        }}
                      >
                        {item.officeLocationsOptions.phoneNumber}
                      </Td>
                      <Td
                        style={{
                          ...baseCellStyle,
                          borderTop: "1px solid rgba(217, 217, 217, 1)",
                          textTransform: "lowercase"
                        }}
                      >
                        {item.officeLocationsOptions.emailAddress}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}

          {/* Mobile View */}
          <OfficeLocationMobile />
        </Stack>
      </Container>
    </Stack>
  );
};

export default OfficeLocation;
