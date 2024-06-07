import * as yup from 'yup';
const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

export const registrationSchema = yup.object().shape({
  campName: yup.string().required('Camp name is required').min(3, 'Camp name must be at least 3 characters'),
  campId: yup.string().required('Camp ID is required'),
  city: yup.string().required('City is required'),
  website: yup.string().matches(urlRegex, 'Invalid website address'),
  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  firstName: yup.string().required('Field is required').max(32, 'First name must be less than 32 characters'),
  lastName: yup.string().required('Field is required').max(32, 'Last name must be less than 32 characters'),
  playaName: yup.string(),
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

export const initResetPassSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

export const confirmResetPassSchema = yup.object().shape({
  confirmCode: yup.string().required('Code is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .matches(/[0-9]/, 'Password must contain at least one numeric character')
    .required('Password is required'),
  password_confirm: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export type InviteMemberFormData = yup.InferType<typeof inviteMemberSchema>;
