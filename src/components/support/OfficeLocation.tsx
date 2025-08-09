import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Pagination,
  PaginationItem,
  CircularProgress,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useOfficeLocations } from "src/graphql/hooks/useOfficeLocation";
import { useRouter } from "src/routes/hooks";
import OfficeLocationMobile from "./OfficeLocationMobile";
import LoadingFallback from "../LoadingFallback";

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
  const {
    locations,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = useOfficeLocations(0, search);




  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const renderPageNumbers = () => (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(e, value) => goToPage(value)}
      showFirstButton={false}
      showLastButton={false}
      siblingCount={1}
      boundaryCount={1}
      renderItem={(item) => {
        if (item.type === "page") {
          return (
            <PaginationItem
              {...item}
              sx={{
                border: "1px solid rgba(109, 110, 113, 0.13)",
                color: "rgba(217, 217, 217, 1)",
                "&:hover": {
                  backgroundColor: "rgba(11, 19, 40, 0.1)",
                },
                "&.Mui-selected": {
                  color: "rgba(45, 55, 72, 1)",
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(11, 19, 40, 0.8)",
                    fontWeight: "bold",
                    color: "white",
                  },
                },
              }}
            />
          );
        }
        return null;
      }}
      shape="rounded"
    />
  );





  return (
    <Stack
      sx={{
        bgcolor: "rgba(45, 55, 72, 1)",
        py: 8,
      }}
    >
      <Container maxWidth="xl">

        <Stack gap={{ xs: 0, md: 5 }} color={"white"} >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h2" color="white">
              Office Locations
            </Typography>
            <Stack width={{ xs: "100%", sm: "auto" }} display={{ xs: "none", md: "block" }}>
              <TextField
                fullWidth
                name="search"
                placeholder="Search"
                size="small"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
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
          {/* Desktop View */}
          {
            loading ? (
             
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
                <Stack my={0.5} />
                <Tbody style={{ backgroundColor: "rgba(45, 55, 72, 1)" }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {locations.map((item: any) => (
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
                          sx={{ cursor: "pointer" }}
                          component={"div"}
                          // TODO: API ID Confusion
                          onClick={() =>
                            router.push(
                              `/support/${item.officeLocationsOptions.country.nodes[0].id}`
                            )
                          }
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
                        }}
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
                          component={"div"}
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
                          textTransform:"lowercase"
                        }}
                      >
                        {item.officeLocationsOptions.emailAddress}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            )
          }
        

          {totalPages > 1 && (
            <Stack
              display={{ xs: "none", md: "flex" }}
              direction="row"
              alignItems="center"
              justifyContent="center"
              mt={6}
              sx={{ width: "100%" }}
            >
              {renderPageNumbers()}
            </Stack>

          )}
          {/* Mobile View */}
          <OfficeLocationMobile />
        </Stack >

      </Container >
    </Stack >
  );
};

export default OfficeLocation;
