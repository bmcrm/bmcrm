import { memo, useCallback } from 'react';

import { type SignInFormData, UserSignInForm } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';

import { loginUser } from 'shared/api/cognito';
import useAuthStore from 'app/providers/Store/useAuthStore';

const SignInPage = memo(() => {
  const { login, isLoggedIn, accessToken } = useAuthStore(state => ({
    login: state.login,
    isLoggedIn: state.isLoggedIn,
    accessToken: state.accessToken,
  }));

  const handleSubmit = useCallback((values: SignInFormData) => {
    login(values);
  }, [login]);

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <UserSignInForm onSubmit={handleSubmit}/>
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignInPage;
