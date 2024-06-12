import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import errorHandler from 'shared/lib/errorHandler/errorHandler.ts';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import ResetPassFormTemplate from 'shared/ui/ResetPassFormTemplate/ResetPassFormTemplate';
import { ResetPassStepOne, ResetPassStepTwo, type ResetPassStepTwoTypes } from 'features/ResetPassForm';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import FormLoader from 'features/FormLoader';

import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { RoutePath } from 'app/providers/AppRouter';
import { ResetFormBg } from 'shared/ui/ResetPassFormTemplate/ReserPassFormTemplate.types';
import { useAuth } from 'entities/User';

type Step = 1 | 2 | 3;

interface ITextData {
  badge: Record<Step, string>;
  desc: Record<Step, string | null>;
}

const textData: ITextData = {
  badge: {
    1: 'Forgot Password',
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
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const handleStepOneSubmit = useCallback(async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
    const response = await initResetPass(values);

    if (response) {
      setEmail(values.email);
      resetForm();
      setStep(2);
    }
  }, [initResetPass]);

  const handleStepTwoSubmit = useCallback(async (values: ResetPassStepTwoTypes, { resetForm }: { resetForm: () => void }) => {
    const data = {
      confirmCode: values.confirmCode,
      newPassword: values.newPassword,
      email: email,
    };

    const response = await confirmResetPass(data);

    if (response) {
      resetForm();
      setStep(3);
    }
  }, [confirmResetPass, email]);

  const btnStepThreeHandler = useCallback(() => {
    navigate(RoutePath.sign_in, { replace: true });
  }, [navigate]);

  const bg = step === 3 ? ResetFormBg.SUN : ResetFormBg.KEY;

  return (
    <AuthPageTemplate>
      <ResetPassFormTemplate badge={badgeLabel} desc={descLabel} background={bg}>
        {isLoading && <FormLoader/>}
        {
          step === 1
            ? <ResetPassStepOne onSubmit={handleStepOneSubmit}/>
            : step === 2
              ? <ResetPassStepTwo onSubmit={handleStepTwoSubmit}/>
              : (
                <Button onClick={btnStepThreeHandler} fluid>
                  <Icon icon={<Camp />} size={IconSize.SIZE_20} />
                  BACK TO SIGN IN
                </Button>
              )
        }
      </ResetPassFormTemplate>
    </AuthPageTemplate>
  );
});

export default ResetPassPage;
