import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type SignInFormData, useAuth, UserSignInForm } from 'entities/User';
import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import AuthFormTemplate from 'shared/ui/AuthFormTemplate/AuthFormTemplate';
import { UserConfirmModal } from 'features/UserConfirmModal';
import { RoutePath } from 'app/providers/AppRouter';

const SignInPage = memo(() => {
  const [isConfirmedModal, setIsConfirmedModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(state => ({
    login: state.login,
  }));

  const handleSubmit = useCallback(async (values: SignInFormData) => {
    try {
      await login(values);
      navigate(RoutePath.funnel);
    } catch (error) {
      if (error instanceof Error && error.name === 'UserNotConfirmedException') {
        setUserEmail(values.email);
        setIsConfirmedModal(true);
      }
    }
  }, [login, navigate]);

  const closeConfirmModal = useCallback(() => {
    setIsConfirmedModal(false);
  }, []);

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Sign in to your account'} background>
        <UserSignInForm onSubmit={handleSubmit}/>
        {isConfirmedModal && <UserConfirmModal isOpen={isConfirmedModal} email={userEmail} onClose={closeConfirmModal}/>}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default SignInPage;
