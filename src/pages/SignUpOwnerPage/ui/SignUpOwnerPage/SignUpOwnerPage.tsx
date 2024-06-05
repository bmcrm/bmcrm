import { memo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { signUpUser } from 'shared/api/cognito';

import { type IInputsData, OwnerSignUpForm } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';

const SignUpOwnerPage = memo(() => {
  const handleSubmit = useCallback((values: IInputsData) => {
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
  }, []);

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create a camp and account'}>
        <OwnerSignUpForm handleSubmit={handleSubmit} />
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignUpOwnerPage;
