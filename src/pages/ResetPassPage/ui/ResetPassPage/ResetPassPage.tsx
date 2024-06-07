import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import ResetPassFormTemplate from 'shared/ui/ResetPassFormTemplate/ResetPassFormTemplate';
import { ResetPassStepOne, ResetPassStepTwo } from 'features/ResetPassForm';
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
  const { initResetPass, confirmResetPass, isLoading } = useAuth(state => ({
    initResetPass: state.initResetPass,
    confirmResetPass: state.confirmResetPass,
    isLoading: state.isLoading,
  }));

  const handleStepOneSubmit = useCallback(async (values: { email: string }) => {
    try {
      await initResetPass(values);
      setEmail(values.email);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  }, [initResetPass]);

  const handleStepTwoSubmit = useCallback(async (values: { confirmCode: string, newPassword: string, password_confirm: string }) => {
    const data = {
      confirmCode: values.confirmCode,
      newPassword: values.newPassword,
      email: email,
    };

    try {
      await confirmResetPass(data);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const btnStepThreeHandler = useCallback(() => {
    navigate(RoutePath.sign_in, { replace: true });
  }, [navigate]);

  const bg = step === 3 ? ResetFormBg.SUN : ResetFormBg.KEY;

  return (
    <AuthPageTemplate>
      <ResetPassFormTemplate badge={badgeLabel} desc={descLabel} background={bg}>
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
      {isLoading && <FormLoader/>}
    </AuthPageTemplate>
  );
});

export default ResetPassPage;
