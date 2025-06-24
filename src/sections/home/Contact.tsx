import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import SectionHead from "src/components/sectionHead/SectionHead";
import { contactValidationSchema } from "src/validations/schema";
interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormikHelpers {
  resetForm: () => void;
}

const Contact = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = (
    values: ContactFormValues,
    { resetForm }: FormikHelpers
  ) => {
    console.log("Form Data:", values);
    resetForm();
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container rowGap={2} columnSpacing={3}>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <TextField
                        name="name"
                        variant="outlined"
                        label="Name"
                        size="medium"
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
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        size="medium"
                        fullWidth
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
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        name="phone"
                        variant="outlined"
                        label="Phone Number"
                        size="medium"
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
                        fullWidth
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <TextField
                        name="message"
                        multiline
                        minRows={2}
                        variant="outlined"
                        label="Message"
                        size="medium"
                        sx={{
                          "& input": {
                            padding: "12px 14px",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "15px !important",
                            fontWeight: "500 !important",
                          },
                        }}
                        fullWidth
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && Boolean(errors.message)}
                        helperText={touched.message && errors.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <Button
                        sx={{
                          height: "60px",
                          background: "rgba(26, 86, 219, 1)",
                        }}
                        type="submit"
                        size="large"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
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
