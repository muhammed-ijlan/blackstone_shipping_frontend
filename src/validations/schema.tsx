// contactSchema.js
import * as Yup from 'yup';

export const contactValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{6,15}$/, "Enter a valid phone number"),
  message: Yup.string().required("Message is required"),
});
