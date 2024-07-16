import { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import AuthBadge from 'shared/ui/AuthBadge/AuthBadge';
import Modal from 'shared/ui/Modal/Modal';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import FormLoader from 'features/FormLoader';

import styles from './UserConfirmModal.module.scss';
import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { confirmUserSchema } from 'shared/const/schemas/validations';
import { type IConfirmEmail, type ILoginData, useAuth } from 'entities/User';
import { RoutePath } from 'app/providers/AppRouter';
import { logger, LogLevel, LogSource } from 'shared/lib/logger/logger';

type UserConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  credentials: ILoginData | null;
};

const UserConfirmModal = (props: UserConfirmModalProps) => {
  const { isOpen, onClose, credentials } = props;
  const { confirmEmail, isLoading, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (values: { code: string }) => {
      const data: IConfirmEmail = {
        email: credentials!.email,
        code: values.code.trim(),
      };

      const response = await confirmEmail(data);

      if (response?.$metadata.httpStatusCode === 200) {
        onClose();
        await login(credentials!);
        navigate(RoutePath.funnel, { replace: true });
        logger(LogLevel.INFO, LogSource.WEBAPP, 'User confirmed', {
          user: credentials!.email,
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
            <Icon icon={<Camp />} size={IconSize.SIZE_20} />
            VERIFY
          </Button>
        </Form>
      </Formik>
      {isLoading && <FormLoader />}
    </Modal>
  );
};

export default UserConfirmModal;
