import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import ResetPassFormTemplate from 'shared/ui/ResetPassFormTemplate/ResetPassFormTemplate';
import { ResetPassStepOne, ResetPassStepTwo } from 'features/ResetPassForm';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/IconTypes';
import { RoutePath } from 'app/providers/AppRouter';
import { ResetFormBg } from 'shared/ui/ResetPassFormTemplate/ReserPassFormTemplate.types';

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
  const navigate = useNavigate();
  const badgeLabel = textData.badge[step];
  const descLabel = textData.desc[step];

  const toStepTwo = useCallback(() => {
    setStep(2);
  }, []);

  const toStepThree = useCallback(() => {
    setStep(3);
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
            ? <ResetPassStepOne onSubmit={toStepTwo}/>
            : step === 2
              ? <ResetPassStepTwo onSubmit={toStepThree}/>
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
