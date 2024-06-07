import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';

import { type SignInFormData, useAuth, UserSignInForm } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import { UserConfirmModal } from 'features/UserConfirmModal';
import FormLoader from 'features/FormLoader';
import { RoutePath } from 'app/providers/AppRouter';
import toast from 'react-hot-toast';

const SignInPage = memo(() => {
  const [isConfirmedModal, setIsConfirmedModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();
  const { login, isLoading } = useAuth(state => ({
    login: state.login,
    isLoading: state.isLoading,
  }));

  const errorHandler = (error: CognitoIdentityProviderServiceException, values: SignInFormData) => {
    switch (error.name) {
      case 'UserNotConfirmedException': {
        setUserEmail(values.email);
        setUserPass(values.password);
        setIsConfirmedModal(true);
        break;
      }
      case 'UserNotFoundException': {
        toast.error('User does not exist!', { duration: 4000, position: 'top-center' });
        break;
      }
      case 'NotAuthorizedException': {
        toast.error('Incorrect username or password!', { duration: 4000, position: 'top-center' });
        break;
      }
      default: {
        toast.error('Oops, something wrong! Try again later!', { duration: 4000, position: 'top-center' });
        break;
      }
    }
  };

  const handleSubmit = useCallback(
    async (values: SignInFormData, { resetForm }: { resetForm: () => void }) => {
      try {
        await login(values);
        resetForm();
        navigate(RoutePath.funnel, { replace: true });
      } catch (error) {
        errorHandler(error as CognitoIdentityProviderServiceException, values);
      }
    },
    [login, navigate]
  );

  const closeConfirmModal = useCallback(async () => {
    const values: SignInFormData = {
      email: userEmail,
      password: userPass,
    };

    setIsConfirmedModal(false);

    try {
      await login(values);
      navigate(RoutePath.funnel, { replace: true });
    } catch (error) {
      errorHandler(error as CognitoIdentityProviderServiceException, values);
    }
  }, [login, navigate, userEmail, userPass]);

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <UserSignInForm onSubmit={handleSubmit} />
        {isLoading && <FormLoader/>}
        {isConfirmedModal && (
          <UserConfirmModal
            isOpen={isConfirmedModal}
            email={userEmail}
            onClose={closeConfirmModal}
          />
        )}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignInPage;
