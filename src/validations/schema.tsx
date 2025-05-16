// contactSchema.js
import * as Yup from 'yup';

export const contactValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),
  message: Yup.string().trim().required('Message is required'),
});
