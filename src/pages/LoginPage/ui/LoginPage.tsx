import { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import { useToggle } from '@shared/hooks/useToggle';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { AuthPageTemplate } from '@features/AuthPageTemplate';
import { UserLoginForm, useLogin, userState, type ILoginData } from '@entities/User';
import { UserConfirmModal } from '@features/UserConfirmModal';
import { FormLoader } from '@features/FormLoader';
import { RoutePath } from '@app/providers/AppRouter';

const LoginPage = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState<ILoginData | null>(null);
  const { isOpen, open, close } = useToggle();
  const { mutateAsync: login, isPending } = useLogin();
  const { email, password, isConfirmation } = location.state as ILoginData & { isConfirmation: boolean } ?? {};
  const { isLoggedIn } = userState();

  useEffect(() => {
    if (isConfirmation && email && password) {
      setCredentials({ email, password });
      open();
    }
  }, [email, isConfirmation, open, password]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RoutePath.funnel, { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
    <>
      <AuthPageTemplate>
        <AuthFormTemplate badge={'Sign in to your account'} background decor>
          <UserLoginForm onSubmit={handleSubmit} />
          {isPending && <FormLoader />}
        </AuthFormTemplate>
      </AuthPageTemplate>
      <UserConfirmModal isOpen={isOpen} onClose={close} credentials={credentials} />
    </>
  );
});

export default LoginPage;
