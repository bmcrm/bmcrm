import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { login, isLoading } = useAuth(state => ({
    login: state.login,
    isLoading: state.isLoading,
  }));

  const handleSubmit = useCallback(
    async (values: SignInFormData, { resetForm }: { resetForm: () => void }) => {
      try {
        await login(values);
        resetForm();
        navigate(RoutePath.funnel, { replace: true });
      } catch (error) {
        if (error instanceof Error && error.name === 'UserNotConfirmedException') {
          setUserEmail(values.email);
          setIsConfirmedModal(true);
        }
        if (error instanceof Error && error.name === 'NotAuthorizedException') {
          toast.error('Incorrect username or password!', { duration: 4000, position: 'top-center' });
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
            email={userEmail}
            onClose={closeConfirmModal}
          />
        )}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignInPage;
