import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AuthBadge } from '@shared/ui/AuthBadge';
import { Modal } from '@shared/ui/Modal';
import { CustomInput } from '@shared/ui/CustomInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FormLoader } from '@features/FormLoader';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { useRegistration, type IConfirmRegistration, type ILoginData, IRegisterStage, useLogin } from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import { confirmUserSchema } from '@shared/const/validationSchemas';
import styles from './UserConfirmModal.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

type UserConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  credentials: ILoginData | null;
};

const UserConfirmModal = memo((props: UserConfirmModalProps) => {
  const { isOpen, onClose, credentials } = props;
  const navigate = useNavigate();
  const { mutateAsync: confirmEmail, isPending: isRegistrationPending } = useRegistration();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const isLoading = isRegistrationPending || isLoginPending;

  const onSubmit = useCallback(
    async (values: { code: string }) => {
      if (credentials) {
        const data: IConfirmRegistration = {
          email: credentials.email,
          code: values.code.trim(),
        };

        await confirmEmail({
          stage: IRegisterStage.CONFIRMATION,
          data,
        });
        onClose();
        await login(credentials);
        navigate(RoutePath.funnel, { replace: true });
        logger(LogLevel.INFO, LogSource.WEBAPP, 'User confirmed', {
          user: credentials.email,
        });
      }
    },
    [confirmEmail, credentials, login, navigate, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik validationSchema={confirmUserSchema} onSubmit={onSubmit} initialValues={{ code: '' }}>
        <Form className={styles.confirmForm}>
          <AuthBadge label={'Account Verification'} />
          <p>Please check your email to verify your account.</p>
          <CustomInput name={'code'} placeholder={'--- ---'} label={'Code'} />
          <Button type={'submit'} fluid className={'mt-15'}>
            <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
            VERIFY
          </Button>
        </Form>
      </Formik>
      {isLoading && <FormLoader />}
    </Modal>
  );
});

export default UserConfirmModal;
