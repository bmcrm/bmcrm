export const validateErrors = (field: string | undefined) => {
  if (!field) return [];
  return [
    {
      message: 'Uppercase letters',
      valid: /[A-Z]/.test(field),
    },
    {
      message: 'Numbers',
      valid: /\d/.test(field),
    },
    {
      message: 'Minimum 8 characters',
      valid: field.length >= 8,
    },
    {
      message: 'Special character',
      valid: /\W/.test(field),
    },
  ];
};
