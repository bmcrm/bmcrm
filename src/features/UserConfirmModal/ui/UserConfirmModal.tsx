import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AuthBadge } from '@shared/ui/AuthBadge';
import { Modal } from '@shared/ui/Modal';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FormLoader } from '@features/FormLoader';
import {
  useRegistration,
  useLogin,
  type IConfirmRegistration,
  type ILoginData,
  IRegistrationStage,
} from '@entities/User';
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
  const { mutateAsync: confirmEmail, isPending: isConfirmationPending } = useRegistration();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const isLoading = isConfirmationPending || isLoginPending;

  const onSubmit = useCallback(
    async (values: { code: string }) => {
      if (credentials) {
        const data: IConfirmRegistration = {
          email: credentials.email,
          code: values.code.trim(),
        };
        await confirmEmail({
          stage: IRegistrationStage.CONFIRMATION,
          data,
        });
        onClose();
        await login(credentials);
        navigate(RoutePath.campers, { replace: true });
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
          <FormikInput name={'code'} placeholder={'--- ---'} label={'Code'} />
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
