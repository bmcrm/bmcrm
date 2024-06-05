import { memo } from 'react';

import { signUpUser } from 'shared/api/cognito';

import { IInputsData } from './types';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import toast from 'react-hot-toast';

const RegisterPage = memo(() => {
  const handleSubmit = (values: IInputsData) => {
    const credentials = {
      ...values,
    };
    signUpUser(credentials)
      .then(response => {
        console.log('Sign-up successful:', response);
      })
      .catch(error => {
        toast.error('User already exist!', { duration: 2000, position: 'top-right' });
        console.error('Sign-up failed:', error);
      });
  };

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create a camp and account'}>
        <RegisterForm handleSubmit={handleSubmit} />
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default RegisterPage;
