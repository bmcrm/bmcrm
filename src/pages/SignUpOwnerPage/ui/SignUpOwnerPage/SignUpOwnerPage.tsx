import { memo, useCallback } from 'react';
import toast from 'react-hot-toast';

import { type IInputsData, OwnerSignUpForm, useAuth } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/AppRouter';
import FormLoader from 'features/FormLoader';

const SignUpOwnerPage = memo(() => {
  const { register, isLoading } = useAuth(state => ({
    register: state.register,
    isLoading: state.isLoading,
  }));
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (values: IInputsData, { resetForm }: { resetForm: () => void }) => {
      const credentials = {
        ...values,
      };
      register(credentials)
        .then(() => {
          toast.success('Sign-up successful!', { duration: 2000, position: 'top-right' });
          resetForm();
          navigate(RoutePath.sign_in, { replace: true });
        })
        .catch(() => {
          toast.error('User already exist!', { duration: 2000, position: 'top-right' });
        });
    },
    [navigate, register]
  );

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create a camp and account'}>
        <OwnerSignUpForm handleSubmit={handleSubmit} />
        {isLoading && <FormLoader />}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignUpOwnerPage;
