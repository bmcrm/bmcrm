import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import errorHandler from 'shared/lib/errorHandler/errorHandler.ts';

import { type IInputsData, OwnerSignUpForm, useAuth } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import { RoutePath } from 'app/providers/AppRouter';
import FormLoader from 'features/FormLoader';

const SignUpOwnerPage = memo(() => {
  const { register, isLoading, error, resetError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const handleSubmit = useCallback(
    async (values: IInputsData, { resetForm }: { resetForm: () => void }) => {
      const response = await register(values);

      if (response) {
        toast.success(
          'Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.',
          { duration: 5000, position: 'top-center' }
        );
        resetForm();
        navigate(RoutePath.sign_in, { replace: true });
      }
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
