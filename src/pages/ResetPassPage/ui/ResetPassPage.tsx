import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import errorHandler from 'shared/lib/errorHandler/errorHandler';

import AuthPageTemplate from 'features/AuthPageTemplate';
import { ResetFormBg, ResetPassFormTemplate } from 'features/ResetPassFormTemplate';
import { ResetPassStepOne, ResetPassStepTwo, type IResetPassStepTwo } from 'features/ResetPassForm';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import FormLoader from 'features/FormLoader';

import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { RoutePath } from 'app/providers/AppRouter';
import { type IConfirmResetPass, useAuth } from 'entities/User';

type Step = 1 | 2 | 3;

interface ITextData {
  badge: Record<Step, string>;
  desc: Record<Step, string | null>;
}

const textData: ITextData = {
  badge: {
    1: 'Reset Password',
    2: 'Create a New Password',
    3: 'Your password has been successfully reset',
  },
  desc: {
    1: 'Enter your email address and we will send a link to reset password',
    2: null,
    3: 'You can now log in with your new credentials',
  },
};

const ResetPassPage = memo(() => {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const badgeLabel = textData.badge[step];
  const descLabel = textData.desc[step];
  const { initResetPass, confirmResetPass, isLoading, error, resetError } = useAuth();

  useEffect(() => {
    if (error) {
      errorHandler(error, 'ResetPassPage');
    }

    return resetError();
  }, [error, resetError]);

  const handleStepOneSubmit = useCallback(
    async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
      const trimEmail = values.email.trim();
      const response = await initResetPass({ email: trimEmail });

      if (response) {
        setEmail(trimEmail);
        resetForm();
        setStep(2);
      }
    },
    [initResetPass]
  );

  const handleStepTwoSubmit = useCallback(
    async (values: IResetPassStepTwo, { resetForm }: { resetForm: () => void }) => {
      const data: IConfirmResetPass = {
        confirm_code: values.confirm_code.trim(),
        password_new: values.password_new.trim(),
        email: email,
      };

      const response = await confirmResetPass(data);

      if (response) {
        resetForm();
        setStep(3);
      }
    },
    [confirmResetPass, email]
  );

  const btnStepThreeHandler = useCallback(() => {
    navigate(RoutePath.sign_in, { replace: true });
  }, [navigate]);

  const bg = step === 3 ? ResetFormBg.SUN : ResetFormBg.KEY;

  return (
    <AuthPageTemplate>
      <ResetPassFormTemplate badge={badgeLabel} desc={descLabel} background={bg}>
        {isLoading && <FormLoader />}
        {step === 1 ? (
          <ResetPassStepOne onSubmit={handleStepOneSubmit} />
        ) : step === 2 ? (
          <ResetPassStepTwo onSubmit={handleStepTwoSubmit} />
        ) : (
          <Button onClick={btnStepThreeHandler} fluid>
            <Icon icon={<Camp />} size={IconSize.SIZE_20} />
            BACK TO SIGN IN
          </Button>
        )}
      </ResetPassFormTemplate>
    </AuthPageTemplate>
  );
});

export default ResetPassPage;
