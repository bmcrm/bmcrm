import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import errorHandler from 'shared/lib/errorHandler/errorHandler';
import { useToggle } from 'shared/hooks/useToggle/useToggle';

import AuthFormTemplate from 'features/AuthFormTemplate';
import AuthPageTemplate from 'features/AuthPageTemplate';
import { type ILoginData, useAuth, UserSignInForm } from 'entities/User';
import { UserConfirmModal } from 'features/UserConfirmModal';
import FormLoader from 'features/FormLoader';
import { RoutePath } from 'app/providers/AppRouter';

const SignInPage = memo(() => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<ILoginData | null>(null);
  const { login, isLoading, error, resetError } = useAuth();
  const { isOpen, open, close } = useToggle();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const handleSubmit = useCallback(
    async (values: ILoginData, { resetForm }: { resetForm: () => void }) => {
      const data: ILoginData = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      try {
        await login(data);
        resetForm();
        navigate(RoutePath.funnel, { replace: true });
      } catch (e) {
        if (e instanceof CognitoIdentityProviderServiceException && e.name === 'UserNotConfirmedException') {
          setCredentials(() => ({
            email: data.email,
            password: data.password,
          }));
          open();
        }
      }
    },
    [login, navigate, open]
  );

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background decor>
        <UserSignInForm onSubmit={handleSubmit} />
        {isLoading && <FormLoader />}
        {isOpen && (
          <UserConfirmModal isOpen={isOpen} onClose={close} credentials={credentials} />
        )}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignInPage;
