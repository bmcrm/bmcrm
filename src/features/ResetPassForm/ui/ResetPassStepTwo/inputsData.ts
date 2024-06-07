export const confirmationInputs = [
  {
    name: 'confirmCode',
    placeholder: '--- ---',
    label: 'Confirmation Code',
    type: 'text',
  },
  {
    name: 'newPassword',
    placeholder: '∗∗∗∗∗∗∗∗',
    label: 'New Password',
    type: 'password',
  },
  {
    name: 'password_confirm',
    placeholder: '∗∗∗∗∗∗∗∗',
    label: 'Confirm Password',
    type: 'password',
  },
];

export const initialValues = {
  confirmCode: '',
  newPassword: '',
  password_confirm: '',
};