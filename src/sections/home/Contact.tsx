import { Box, Button, Container, Grid, InputAdornment, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneNumberInput from "src/components/PhoneInput";
import SectionHead from "src/components/sectionHead/SectionHead";
import { countries } from "src/utils/countries";
import { generateEmailTemplate } from "src/utils/generateEmailTemplate";
import { sendEmail } from "src/utils/sendEmail";
import { contactValidationSchema } from "src/validations/schema";

interface ContactFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  countryIso: string;
  message: string;
}

interface FormikHelpers {
  resetForm: () => void;
}

const Contact = () => {

  const initialValues = {
    name: "",
    email: "",
    countryIso: countries.find((c) => c.name === "Netherlands")?.iso || countries[0].iso,
    phoneNumber: "",
    message: "",
  };

  const handleSubmit = async (values: ContactFormValues, { resetForm }: FormikHelpers) => {
    const toastId = toast.loading("Sending message...");
    const fullPhoneNumber = `${countries.find(c => c.iso === values.countryIso)?.code || ""} ${values.phoneNumber}`;

    try {
      const htmlBody = generateEmailTemplate({
        fields: {
          Name: values.name,
          Email: values.email,
          Phone: fullPhoneNumber,
        },
        message: values.message,
      });

      await sendEmail({
        Subject: `Contact Form Enquiry from ${values.name}`,
        HTMLBody: htmlBody,
        TOMail: import.meta.env.VITE_CONTACT_TO_EMAIL_ID,
        SenderName: values.name,
      });

      toast.success("Message sent successfully!", { id: toastId });
      resetForm();
    } catch (error) {
      toast.error("Failed to send message", { id: toastId });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 10 }}>
      <Stack gap={{ xs: 0, lg: 8 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={"center"}
          gap={{ xs: 0, md: 6 }}
        >
          <Stack width={"100%"} flex={1}>
            <SectionHead
              title="Contact  Us  "
              subTitle="Contact us for quick and reliable support!"
              titleColor="rgba(26, 32, 44, 1)"
              subTitleColor="rgba(109, 110, 113, 1)"
              contentColor="rgba(45, 55, 72, 1)"
              content="We’re here to assist you! Fill out the form, and our team will get back to you as soon as possible. Let’s work together to find the perfect solution for your business needs."
            />
          </Stack>
          <Stack mt={{ xs: 0, lg: 10 }} flex={2}>
            <Formik
              initialValues={initialValues}
              validationSchema={contactValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container rowGap={2} columnSpacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="name"
                        label="Name"
                        fullWidth
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "60px",
                          },
                          "& input": {
                            padding: "12px 14px",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "15px !important",
                            fontWeight: "500 !important",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} >
                      <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "60px",
                          },
                          "& input": {
                            padding: "12px 14px",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "15px !important",
                            fontWeight: "500 !important",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>

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
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        name="message"
                        label="Message"
                        fullWidth
                        multiline
                        minRows={2}
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message && errors.message}
                        sx={{
                          "& .MuiInputLabel-root": {
                            fontSize: "15px !important",
                            fontWeight: "500 !important",
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                      
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                          typography: "body1",
                          height: "60px",
                          background: "rgba(26, 86, 219, 1)",
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Contact;
