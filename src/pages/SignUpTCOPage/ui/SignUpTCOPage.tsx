import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import errorHandler from 'shared/lib/errorHandler/errorHandler';

import { type IUserRegisterData, TCOSignUpForm, useAuth } from 'entities/User';
import FormLoader from 'features/FormLoader';
import AuthPageTemplate from 'features/AuthPageTemplate';
import AuthFormTemplate from 'features/AuthFormTemplate';
import { RoutePath } from 'app/providers/AppRouter';
import { logger, LogLevel, LogSource } from 'shared/lib/logger/logger';

const SignUpTCOPage = memo(() => {
  const { register, isLoading, error, resetError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      errorHandler(error, 'SignUpTCOPage');
    }

    return resetError();
  }, [error, resetError]);

  const submitHandler = useCallback(
    async (values: IUserRegisterData, { resetForm }: { resetForm: () => void }) => {
      const { password, email, ...logData } = values;
      try {
        await register(values);

        toast.success(
          'Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.',
          { duration: 5000, position: 'top-center' }
        );
        logger(LogLevel.INFO, LogSource.WEBAPP, 'New user registered as TCO', {
          user: values.email,
          camp_id: values.camp_id,
        });
        resetForm();

        navigate(RoutePath.sign_in, { replace: true, state: { email: values.email, password: values.password } });
      } catch {
        logger(LogLevel.ERROR, LogSource.WEBAPP, 'Error during registration', {
          user: values.email,
          camp_id: values.camp_id,
          ...logData,
        });
        return null;
      }
    },
    [navigate, register]
  );

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create a camp and account'} logo decor>
        <TCOSignUpForm onSubmit={submitHandler} />
        {isLoading && <FormLoader />}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignUpTCOPage;
