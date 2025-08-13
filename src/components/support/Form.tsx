/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ToggleButton,
  ToggleButtonGroup,
  styled,
  toggleButtonGroupClasses,
  toggleButtonClasses,
} from "@mui/material";
import React, { useState } from "react";
import { countries } from "src/utils/countries";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import flight from "src/assets/icons/flight.png";
import sea from "src/assets/icons/sea.png";
import { generateEmailTemplate } from "src/utils/generateEmailTemplate";
import { sendEmail } from "src/utils/sendEmail";
import PhoneNumberInput from "../PhoneInput";
import toast from "react-hot-toast";

const validationSchema = (state: string) =>
  Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{6,14}$/, "Enter a valid phone number")
      .required("Phone number is required"),
    companyName: Yup.string().required("Company name is required"),
    message:
      state === "general"
        ? Yup.string().required("Message is required")
        : Yup.string(),
    portOfLoading:
      state === "quote"
        ? Yup.string().required("Port of Loading is required")
        : Yup.string(),
    weight:
      state === "quote"
        ? Yup.string().required("Weight & Dimensions are required")
        : Yup.string(),
    typeOfGoods:
      state === "quote"
        ? Yup.string().required("Type of Goods is required")
        : Yup.string(),
    preferredShippingMethod:
      state === "quote"
        ? Yup.string().required("Please select a shipping method")
        : Yup.string(),
    additionalNote:
      state === "quote"
        ? Yup.string().required("Additional notes are required")
        : Yup.string(),
  });

const Form = ({ state }: { state: string }) => {
const  [isSubmitting,setIsSubmitting] = useState(false)

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: "2rem",
    height: 56,
    margin: "0 !important",
    [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
      border: "1px solid rgba(45, 55, 72, 0.2)",
    },
    [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
      border: "1px solid rgba(45, 55, 72, 0.2)",
    },
    [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
    {
      border: `1px solid red !important`,
    },
    [`& .${toggleButtonClasses.root}.Mui-selected`]: {
      backgroundColor: "rgba(45, 55, 72, 1)",
      color: "#fff",
      "&:hover": {
        backgroundColor: "rgba(45, 55, 72, 0.9)",
      },
    },
  }));


  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    const toastId = toast.loading("Sending message...");
    const enquiryType = state === "general" ? "General Enquiry" : "Quote Request";
    const fullPhoneNumber = `${countries.find(c => c.iso === values.countryIso)?.code || ""} ${values.phoneNumber}`;
    setIsSubmitting(true)
    try {
      const htmlBody = generateEmailTemplate({
        title: enquiryType,
        intro:
          state === "general"
            ? "A new general enquiry has been submitted through your website."
            : "A new shipping quote request has been submitted through your website.",
        fields:
          state === "general"
            ? {
              "Enquiry Type": enquiryType,
              Name: values.name,
              Email: values.email,
              Phone: fullPhoneNumber,
              Company: values.companyName,
            }
            : {
              "Enquiry Type": enquiryType,
              Name: values.name,
              Email: values.email,
              Phone: fullPhoneNumber,
              Company: values.companyName,
              "Port of Loading": values.portOfLoading,
              "Weight & Dimensions": values.weight,
              "Type of Goods": values.typeOfGoods,
              "Preferred Shipping Method": values.preferredShippingMethod,
              "Additional Note": values.additionalNote,
            },
        message: state === "general" ? values.message : undefined,
      });

      await sendEmail({
        Subject: `${enquiryType} from ${values.name}`,
        HTMLBody: htmlBody,
        TOMail: import.meta.env.VITE_CONTACT_TO_EMAIL_ID,
        SenderName: values.name,
      });

      toast.success("Message sent successfully!", { id: toastId });
      setIsSubmitting(false)
      resetForm();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message", { id: toastId });
      setIsSubmitting(false)
    }
  };


  return (
    <Formik
      initialValues={{
        name: "",
        companyName: "",
        email: "",
        countryIso: countries.find((c) => c.name === "Netherlands")?.iso || countries[0].iso,
        phoneNumber: "",
        message: "",
        portOfLoading: "",
        weight: "",
        typeOfGoods: "",
        preferredShippingMethod: "",
        additionalNote: "",
      }}
      validationSchema={validationSchema(state)}
      onSubmit={(values, formikHelpers) => {
        handleFormSubmit(values, formikHelpers);
      }}
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
        <FormikForm onSubmit={handleSubmit}>
          <Stack gap={2} pb={7}>
            <Grid container spacing={3}>
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
                  Company Name
                </Typography>
                <TextField
                  name="companyName"
                  fullWidth
                  autoComplete="off"
                  value={values.companyName}
                  onChange={handleChange}
                  error={Boolean(touched.companyName && errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
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

              {state === "quote" && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                      Port of Loading & Port of Discharge
                    </Typography>
                    <TextField
                      name="portOfLoading"
                      fullWidth
                      autoComplete="off"
                      value={values.portOfLoading}
                      onChange={handleChange}
                      error={Boolean(
                        touched.portOfLoading && errors.portOfLoading
                      )}
                      helperText={touched.portOfLoading && errors.portOfLoading}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                      Weight & Dimensions
                    </Typography>
                    <TextField
                      name="weight"
                      fullWidth
                      autoComplete="off"
                      value={values.weight}
                      onChange={handleChange}
                      error={Boolean(touched.weight && errors.weight)}
                      helperText={touched.weight && errors.weight}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                      Type of Goods
                    </Typography>
                    <TextField
                      name="typeOfGoods"
                      fullWidth
                      autoComplete="off"
                      value={values.typeOfGoods}
                      onChange={handleChange}
                      error={Boolean(touched.typeOfGoods && errors.typeOfGoods)}
                      helperText={touched.typeOfGoods && errors.typeOfGoods}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                      Preferred Shipping Method
                    </Typography>
                    <StyledToggleButtonGroup
                      exclusive
                      fullWidth
                      value={values.preferredShippingMethod}
                      onChange={(e, value) => {
                        if (value)
                          setFieldValue("preferredShippingMethod", value);
                      }}
                      sx={{ mt: 1 }}
                    >
                      <ToggleButton value="sea">
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                          <Box component={"img"} src={sea} width="24px" />
                          <Typography>Sea Freight</Typography>
                        </Stack>
                      </ToggleButton>
                      <ToggleButton value="air">
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                          <Box component={"img"} src={flight} width="24px" />
                          <Typography>Air Freight</Typography>
                        </Stack>
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                    {touched.preferredShippingMethod &&
                      errors.preferredShippingMethod && (
                        <Typography variant="caption" color="error">
                          {errors.preferredShippingMethod}
                        </Typography>
                      )}
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                      Additional Notes
                    </Typography>
                    <TextField
                      placeholder="Include any timeframes, service needs, or special instructions."
                      name="additionalNote"
                      multiline
                      minRows={5}
                      fullWidth
                      autoComplete="off"
                      value={values.additionalNote}
                      onChange={handleChange}
                      error={Boolean(
                        touched.additionalNote && errors.additionalNote
                      )}
                      helperText={
                        touched.additionalNote && errors.additionalNote
                      }
                    />
                  </Grid>
                </>
              )}

              {state === "general" && (
                <Grid size={{ xs: 12 }}>
                  <Typography ml={0.5} sx={{ textAlign: "left !important" }}>
                    Your Message
                  </Typography>
                  <TextField
                    placeholder="Let us know how we can assist you."
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
              )}

              <Grid size={{ xs: 12 }}>
                <Stack alignItems={{ xs: "center", sm: "flex-end" }}>
                  <Stack direction={"row"} gap={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      size="large"
                      type="reset"
                      sx={{ width: { xs: "auto", sm: "150px" }, color: "rgba(45, 55, 72, 1)", typography: "body1" }}
                    >
                      Cancel
                    </Button>

                    <Button
                    disabled={isSubmitting}
                      fullWidth
                      sx={{
                        width: { xs: "auto", sm: "300px" },
                        background: "rgba(26, 86, 219, 1)",
                        "&:hover": {
                          background: "rgba(26, 86, 219, 0.9)",
                        },
                        typography: "body1",
                      }}
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      {state === "general" ? "Send Message" : "Request Quote"}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
