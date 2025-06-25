import { Add, CloudUpload } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { countries } from "src/utils/countries";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  message: Yup.string().required("Message is required"),
  resume: Yup.mixed()
    .required("Resume is required")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .test("fileType", "Only PDF files are allowed", (value: any) => {
      return value && value.type === "application/pdf";
    }),
});

const ApplyNowForm = () => {
  const [country, setCountry] = useState(
    countries.find((item) => item.name === "India") || countries[0]
  );
  const getFlagUrl = (iso: string) =>
    `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        message: "",
        resume: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form Submitted", values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Stack gap={2} pb={7}>
            <Typography variant="h2">Apply Now</Typography>

            <Grid container spacing={{ xs: 1.5, sm: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Name
                </Typography>
                <TextField
                  name="name"
                  fullWidth
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Email Address
                </Typography>
                <TextField
                  name="email"
                  fullWidth
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Phone Number
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 2.5 }}>
                    <Select
                      value={country.code}
                      onChange={(e) => {
                        const selected = countries.find(
                          (c) => c.code === e.target.value
                        );
                        if (selected) setCountry(selected);
                      }}
                      fullWidth
                      displayEmpty
                      variant="outlined"
                      sx={{ height: 56 }}
                      renderValue={() => (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            src={getFlagUrl(country.iso)}
                            alt={country.name}
                            sx={{ width: 24, height: 16 }}
                            variant="square"
                          />
                          {country.code}
                        </Box>
                      )}
                    >
                      {countries.map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              src={getFlagUrl(c.iso)}
                              alt={c.name}
                              sx={{ width: 24, height: 16 }}
                              variant="square"
                            />
                            {c.name} ({c.code})
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 9.5 }}>
                    <TextField
                      name="phoneNumber"
                      autoComplete="off"
                      variant="outlined"
                      fullWidth
                      value={values.phoneNumber}
                      onChange={handleChange}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      sx={{ height: 56, width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Address
                </Typography>
                <TextField
                  name="address"
                  fullWidth
                  autoComplete="off"
                  value={values.address}
                  onChange={handleChange}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Your Message
                </Typography>
                <TextField
                  name="message"
                  multiline
                  minRows={5}
                  fullWidth
                  autoComplete="off"
                  value={values.message}
                  onChange={handleChange}
                  error={Boolean(touched.message && errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Attach Resume
                </Typography>
                <Box>
                  <Box
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      border: "1px dashed #ccc",
                      padding: 4,
                      borderRadius: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    <Stack spacing={1} alignItems="center">
                      <CloudUpload fontSize="large" color="action" />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        noWrap
                        maxWidth="100%"
                      >
                        {fileName
                          ? "Selected: " + fileName
                          : "Browse and choose the files you want to upload from your computer"}
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{
                          borderRadius: "50%",
                          minWidth: 0,
                          width: 32,
                          height: 32,
                        }}
                      >
                        <Add fontSize="small" />
                      </Button>
                    </Stack>
                  </Box>

                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        setFileName(file.name);
                        setFieldValue("resume", file);
                      }
                    }}
                  />
                  {touched.resume && errors.resume && (
                    <Typography color="error" variant="caption" ml={1}>
                      {errors.resume}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 12 }}>
                <Stack alignItems={"flex-end"}>
                  <Stack direction={"row"} gap={2}>
                    <Button variant="outlined" size="large" type="reset">
                      Cancel
                    </Button>
                    <Button size="large" variant="contained" type="submit">
                      Submit Application
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ApplyNowForm;
