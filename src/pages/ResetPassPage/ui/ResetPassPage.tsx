import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPageTemplate } from '@features/AuthPageTemplate';
import { ResetPassFormTemplate, ResetFormBg } from '@features/ResetPassFormTemplate';
import { InitStageForm, ConfirmStageForm, type IConfirmResetPass } from '@entities/User';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FormLoader } from '@features/FormLoader';
import { RoutePath } from '@app/providers/AppRouter';
import {
  useResetPassword,
  IResetPassStages,
  type IConfirmResetPassData,
  type IInitResetPassData,
} from '@entities/User';
import CampIcon from '@shared/assets/icons/camp.svg';

const ResetPassPage = memo(() => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<IResetPassStages>(IResetPassStages.INIT);
  const [email, setEmail] = useState('');
  const { mutateAsync: resetPass, isPending } = useResetPassword();

  const handleInit = useCallback(
    async (values: IInitResetPassData, { resetForm }: { resetForm: () => void }) => {
      const data = { email: values.email.trim() };
      setEmail(values.email.trim());
      await resetPass({ stage: IResetPassStages.INIT, data });
      resetForm();
      setStage(IResetPassStages.CONFIRM);
    },
    [resetPass]
  );

  const handleConfirm = useCallback(
    async (values: IConfirmResetPass, { resetForm }: { resetForm: () => void }) => {
      const data: IConfirmResetPassData = {
        code: values.confirm_code.trim(),
        password: values.password.trim(),
        email,
      };

      await resetPass({ stage: IResetPassStages.CONFIRM, data });
      resetForm();
      setStage(IResetPassStages.SUCCESS);
    },
    [email, resetPass]
  );

  const handeSuccess = useCallback(() => {
    navigate(RoutePath.login, { replace: true });
  }, [navigate]);

  const stageConfig = {
    [IResetPassStages.INIT]: {
      badge: 'Reset Password',
      desc: 'Enter your email address and we will send a link to reset password',
      bg: ResetFormBg.KEY,
      content: <InitStageForm onSubmit={handleInit} />,
    },
    [IResetPassStages.CONFIRM]: {
      badge: 'Create a New Password',
      desc: null,
      bg: ResetFormBg.KEY,
      content: <ConfirmStageForm onSubmit={handleConfirm} />,
    },
    [IResetPassStages.SUCCESS]: {
      badge: 'Your password has been successfully reset',
      desc: 'You can now log in with your new credentials',
      bg: ResetFormBg.SUN,
      content: (
        <Button onClick={handeSuccess} fluid>
          <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
          BACK TO SIGN IN
        </Button>
      ),
    },
  }[stage];

  return (
    <AuthPageTemplate>
      <ResetPassFormTemplate badge={stageConfig.badge} desc={stageConfig.desc} background={stageConfig.bg}>
        {isPending && <FormLoader />}
        {stageConfig.content}
      </ResetPassFormTemplate>
    </AuthPageTemplate>
  );
});

export default ResetPassPage;
