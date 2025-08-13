/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { sendEmail } from "src/utils/sendEmail"; // make sure correct path
import { generateEmailTemplate } from "src/utils/generateEmailTemplate"; // make sure correct path
import PhoneNumberInput from "../PhoneInput";
import toast from "react-hot-toast";
import { GetJobPostDetailsResponse } from "src/types/graphql/types/careers.types";

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
    .test("fileType", "Only PDF files are allowed", (value: any) => {
      return value && value.type === "application/pdf";
    }),
});

const ApplyNowForm = ({ data }: { data: GetJobPostDetailsResponse }) => {
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting,setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    const toastId = toast.loading("Sending message...");
    const fullPhoneNumber = `${countries.find(c => c.iso === values.countryIso)?.code || ""} ${values.phoneNumber}`;
    setIsSubmitting(true)
    try {
      const htmlBody = generateEmailTemplate({
        title: "Job Application",
        intro: "A new job application has been submitted through your website.",
        fields: {
          position: data.jobOpening.title,
          Name: values.name,
          Email: values.email,
          Phone: fullPhoneNumber,
          Address: values.address,
        },
        message: values.message,
      });

      await sendEmail({
        Subject: `Job Application from ${values.name} for the position of ${data.jobOpening.title}`,
        HTMLBody: htmlBody,
        TOMail: import.meta.env.VITE_CONTACT_TO_EMAIL_ID,
        SenderName: values.name,
        Attachments: [
          {
            FileName: fileName,
            FileData: await fileToBase64(values.resume),
          },
        ],
      });

      toast.success("Message sent successfully!", { id: toastId });
      resetForm();
    setIsSubmitting(false)
      setFileName("");
    } catch (error) {
      console.error("Error sending application:", error);
    setIsSubmitting(false)
      toast.error("Failed to send message", { id: toastId });
    }
  };

  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        countryIso: countries.find((c) => c.name === "Netherlands")?.iso || countries[0].iso,
        phoneNumber: "",
        address: "",
        message: "",
        resume: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        handleBlur
      }) => (
        <Form onSubmit={handleSubmit}>
          <Stack gap={2} pb={7}>
            <Typography variant="h2">Apply Now</Typography>

            <Grid container spacing={{ xs: 1.5, sm: 3 }}>
              {/* Name */}
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

              {/* Email */}
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

              {/* Phone */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                  Phone Number
                </Typography>
                <PhoneNumberInput
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber ? errors.phoneNumber : undefined}
                  countryIso={values.countryIso}
                  onCountryChange={(iso) =>
                    setFieldValue("countryIso", iso)
                  }
                />
              </Grid>

              {/* Address */}
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

              {/* Message */}
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

              {/* Resume */}
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

              {/* Buttons */}
              <Grid size={{ xs: 12, md: 12 }}>
                <Stack alignItems={"flex-end"}>
                  <Stack direction={"row"} gap={2}>
                    <Button
                     disabled={isSubmitting}
                      color="inherit"
                      variant="outlined"
                      size="large"
                      type="reset"
                    >
                      Cancel
                    </Button>
                    <Button
                    disabled={isSubmitting}
                      size="large"
                      variant="contained"
                      type="submit"
                    >
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
