import { FormikInputTheme } from '@shared/ui/FormikInput';

export const inputsData = [
  {
    name: 'confirm_code',
    placeholder: '--- ---',
    label: 'Confirmation Code',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: '∗∗∗∗∗∗∗∗',
    label: 'New Password',
    type: 'password',
    theme: FormikInputTheme.PASSWORD_TOOLTIP,
  },
  {
    name: 'password_confirm',
    placeholder: '∗∗∗∗∗∗∗∗',
    label: 'Confirm Password',
    type: 'password',
  },
];

export const initialValues = {
  confirm_code: '',
  password: '',
  password_confirm: '',
};