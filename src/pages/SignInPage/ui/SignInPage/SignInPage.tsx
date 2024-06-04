import { useCallback, useState } from 'react';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';

import SignInForm from 'pages/SignInPage/ui/SignInForm/SignInForm.tsx';
import { type SignInFormData } from '../SignInForm/SignInForm.types';
import { loginUser } from 'shared/api/cognito';
import useAuthStore from 'app/providers/Store/useAuthStore';

const SignInPage = () => {
  const { login, isLoggedIn, accessToken } = useAuthStore(state => ({
    login: state.login,
    isLoggedIn: state.isLoggedIn,
    accessToken: state.accessToken,
  }));
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: SignInFormData) => {
    login(values);
  };

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <SignInForm onSubmit={handleSubmit} initialValues={initialValues} />
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
};

export default SignInPage;
