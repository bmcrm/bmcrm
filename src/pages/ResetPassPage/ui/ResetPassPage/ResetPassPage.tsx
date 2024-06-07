import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';

import AuthPageTemplate from 'shared/ui/AuthPageTemplate/AuthPageTemplate';
import ResetPassFormTemplate from 'shared/ui/ResetPassFormTemplate/ResetPassFormTemplate';
import { ResetPassStepOne, ResetPassStepTwo, type ResetPassStepTwoTypes } from 'features/ResetPassForm';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import FormLoader from 'features/FormLoader';
import toast from 'react-hot-toast';

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

  const errorHandler = (error: CognitoIdentityProviderServiceException) => {
    switch (error.name) {
      case 'UserNotFoundException': {
        toast.error('This email was not found!', { duration: 4000, position: 'top-center' });
        break;
      }
      case 'CodeMismatchException': {
        toast.error('Invalid verification code provided, please try again!', { duration: 4000, position: 'top-center' });
        break;
      }
      default: {
        toast.error('Oops, something wrong! Try again later!', { duration: 4000, position: 'top-center' });
        break;
      }
    }
  };

  const handleStepOneSubmit = useCallback(async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
    try {
      await initResetPass(values);
      setEmail(values.email);
      resetForm();
      setStep(2);
    } catch (error) {
      errorHandler(error as CognitoIdentityProviderServiceException);
    }
  }, [initResetPass]);

  const handleStepTwoSubmit = useCallback(async (values: ResetPassStepTwoTypes, { resetForm }: { resetForm: () => void }) => {
    const data = {
      confirmCode: values.confirmCode,
      newPassword: values.newPassword,
      email: email,
    };

    try {
      await confirmResetPass(data);
      resetForm();
      setStep(3);
    } catch (error) {
      errorHandler(error as CognitoIdentityProviderServiceException);
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
