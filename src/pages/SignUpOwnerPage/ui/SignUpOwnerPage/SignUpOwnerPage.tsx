import { memo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { signUpUser } from 'shared/api/cognito';

import { type IInputsData, OwnerSignUpForm } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';

const SignUpOwnerPage = memo(() => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (values: IInputsData, { resetForm }: { resetForm: () => void }) => {
      const credentials = {
        ...values,
      };
      signUpUser(credentials)
        .then(() => {
          toast.success('Sign-up successful!', { duration: 2000, position: 'top-right' });
          resetForm();
          navigate(RoutePath.sign_in, { replace: true });
        })
        .catch(error => {
          toast.error('User already exist!', { duration: 2000, position: 'top-right' });
          console.error('Sign-up failed:', error);
        });
    },
    [navigate]
  );

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create a camp and account'}>
        <OwnerSignUpForm handleSubmit={handleSubmit} />
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignUpOwnerPage;
