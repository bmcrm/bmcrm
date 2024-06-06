import * as yup from 'yup';
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

export const registrationSchema = yup.object().shape({
  campName: yup.string().required('Camp name is required'),
  campId: yup.string().required('Camp ID is required'),
  city: yup.string().required('City is required'),
  website: yup.string().matches(urlRegex, 'Invalid website address').required('Website is required'),
  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  playaName: yup.string().required('Playa name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one numeric character')
    .required('Password is required'),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one numeric character')
    .required('Password is required'),
});

export const inviteMemberSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  type: yup.string().required('Type is required'),
});

export const confirmUserSchema = yup.object().shape({
  code: yup.string().required('Code is required'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export type InviteMemberFormData = yup.InferType<typeof inviteMemberSchema>;
