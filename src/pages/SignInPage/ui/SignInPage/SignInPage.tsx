import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';
import errorHandler from 'shared/lib/errorHandler/errorHandler.ts';

import { type SignInFormData, useAuth, UserSignInForm } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import { UserConfirmModal } from 'features/UserConfirmModal';
import FormLoader from 'features/FormLoader';
import { RoutePath } from 'app/providers/AppRouter';

export interface ISignInCredentials {
  email: string,
  password: string,
}

const SignInPage = memo(() => {
  const navigate = useNavigate();
  const [isConfirmedModal, setIsConfirmedModal] = useState(false);
  const [credentials, setCredentials] = useState<ISignInCredentials | null>(null);
  const { login, isLoading, error, resetError } = useAuth();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const handleSubmit = useCallback(
    async (values: SignInFormData, { resetForm }: { resetForm: () => void }) => {
      try {
        await login(values);
        resetForm();
        navigate(RoutePath.funnel, { replace: true });
      } catch (e) {
        if (e instanceof CognitoIdentityProviderServiceException && e.name === 'UserNotConfirmedException') {
          setCredentials(() => ({
            email: values.email,
            password: values.password
          }));
          setIsConfirmedModal(true);
        }
      }
    },
    [login, navigate]
  );

  const closeConfirmModal = useCallback(() => {
    setIsConfirmedModal(false);
  }, []);

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <UserSignInForm onSubmit={handleSubmit} />
        {isLoading && <FormLoader/>}
        {isConfirmedModal && (
          <UserConfirmModal
            isOpen={isConfirmedModal}
            onClose={closeConfirmModal}
            credentials={credentials}
          />
        )}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignInPage;
