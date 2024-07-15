import * as yup from 'yup';

const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
const socialRegex = /^https:\/\/.+\/.+$/;

export const registrationSchema = yup.object().shape({
  camp_name: yup.string().required('Camp name is required').min(3, 'Camp name must be at least 3 characters'),
  camp_id: yup.string().required('Camp ID is required'),
  role: yup.string(),
  city: yup.string().required('City is required'),
  camp_website: yup.string().matches(urlRegex, 'Invalid website address'),
  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  first_name: yup.string().required('Field is required').max(32, 'First name must be less than 32 characters'),
  last_name: yup.string().required('Field is required').max(32, 'Last name must be less than 32 characters'),
  playa_name: yup.string(),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Minimum 8 character')
    .matches(/[A-Z]/, 'Uppercase letters')
    .matches(/[0-9]/, 'Numbers')
    .matches(/[!@#$%^&*]/, 'Special character')
    .required('Password is required'),
});

export const signInSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Minimum 8 character')
    .matches(/[A-Z]/, 'Uppercase letters')
    .matches(/[0-9]/, 'Numbers')
    .required('Password is required'),
});

export const inviteMemberSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

export const confirmUserSchema = yup.object().shape({
  code: yup.string().required('Code is required'),
});

export const initResetPassSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

export const confirmResetPassSchema = yup.object().shape({
  confirm_code: yup.string().required('Code is required'),
  password_new: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one numeric character')
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password_new')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const addSocialSchema = yup.object().shape({
  url: yup
    .string()
    .required('URL is required!')
    .matches(socialRegex, 'URL must be in the format https://*social*/*user*'),
});

export const camperRegistrationSchema = yup.object().shape({
  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  first_name: yup
    .string()
    .required('Field is required')
    .max(32, 'First name must be less than 32 characters')
    .transform((_, originalValue) => originalValue.trim()),
  last_name: yup
    .string()
    .required('Field is required')
    .max(32, 'Last name must be less than 32 characters')
    .transform((_, originalValue) => originalValue.trim()),
  playa_name: yup.string().transform((_, originalValue) => originalValue.trim()),
  about_me: yup.string().transform((_, originalValue) => originalValue.trim()),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required')
    .transform((_, originalValue) => originalValue.trim()),
  social_links: yup.array().of(
    yup
      .string()
      .matches(socialRegex, 'URL must be in the format https://*social*/*user*')
      .transform((_, originalValue) => originalValue.trim())
      .transform((_, originalValue) => originalValue.trim())
  ),
  password: yup
    .string()
    .min(8, 'Minimum 8 character')
    .matches(/[A-Z]/, 'Uppercase letters')
    .matches(/[0-9]/, 'Numbers')
    .required('Password is required')
    .transform((_, originalValue) => originalValue.trim()),
});

export const userSettingsSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('Field is required')
    .max(32, 'First name must be less than 32 characters')
    .transform((_, originalValue) => originalValue.trim()),
  last_name: yup
    .string()
    .required('Field is required')
    .max(32, 'Last name must be less than 32 characters')
    .transform((_, originalValue) => originalValue.trim()),
  playa_name: yup.string().transform((_, originalValue) => originalValue.trim()),
});

export const campSettingsSchema = yup.object().shape({
  camp_name: yup
    .string()
    .min(3, 'Camp name must be at least 3 characters')
    .transform((_, originalValue) => originalValue.trim()),
  city: yup.string().transform((_, originalValue) => originalValue.trim()),
  camp_website: yup
    .string()
    .matches(urlRegex, 'Invalid website address')
    .transform((_, originalValue) => originalValue.trim()),
  camp_description: yup.string().transform((_, originalValue) => originalValue.trim()),
});

export const createItemSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').min(1, 'Price must be at least 1$'),
  quantity: yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
  category: yup.string().required('Category is required'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export type InviteMemberFormData = yup.InferType<typeof inviteMemberSchema>;
