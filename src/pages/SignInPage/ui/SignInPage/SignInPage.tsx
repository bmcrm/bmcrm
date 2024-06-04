import { useCallback, useState } from 'react';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';

import SignInForm from 'pages/SignInPage/ui/SignInForm/SignInForm.tsx';
import { type SignInFormData } from '../SignInForm/SignInForm.types';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = useCallback((values: SignInFormData) => {
    setFormData(prev => ({ ...prev, ...values }));
  }, []);

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <SignInForm onSubmit={handleSubmit} initialValues={formData}/>
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
};

export default SignInPage;
