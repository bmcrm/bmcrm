import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TCORegisterForm,
  useRegistration,
  userState,
  IRegistrationStage,
  type ITCORegistrationData,
} from '@entities/User';
import { AuthPageTemplate } from '@features/AuthPageTemplate';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { FormLoader } from '@features/FormLoader';
import { RoutePath } from '@app/providers/AppRouter';

const RegisterTCOPage = memo(() => {
  const navigate = useNavigate();
  const { mutateAsync: registration, isPending } = useRegistration();
  const { isLoggedIn } = userState();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RoutePath.campers, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = useCallback(
    async (values: ITCORegistrationData, resetForm: () => void) => {
      await registration({ stage: IRegistrationStage.REGISTRATION_TCO, data: values });
      const redirectState = {
        email: values.email,
        password: values.password,
        isConfirmation: true,
      };
      resetForm();
      navigate(RoutePath.login, { replace: true, state: redirectState });
    },
    [navigate, registration]
  );

  return (
    <AuthPageTemplate>
      <AuthFormTemplate badge={'Create a camp and account'} logo decor>
        <TCORegisterForm handleSubmit={handleSubmit} />
        {isPending && <FormLoader />}
      </AuthFormTemplate>
    </AuthPageTemplate>
  );
});

export default RegisterTCOPage;
