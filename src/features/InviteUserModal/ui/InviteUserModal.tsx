import { memo, useCallback, useEffect } from 'react';
import errorHandler from 'shared/lib/errorHandler/errorHandler';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';

import Modal from 'shared/ui/Modal/Modal';
import Button from 'shared/ui/Button/Button';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import FormLoader from 'features/FormLoader';

import styles from './InviteUserModal.module.scss';
import { inviteMemberSchema } from 'shared/const/schemas/validations';
import { useAuth } from 'entities/User';
import { logger, LogLevel, LogSource } from 'shared/lib/logger/logger';
import Icon from 'shared/ui/Icon/Icon';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';

interface InviteUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteUserModal = memo(({ isOpen, onClose }: InviteUserFormProps) => {
  const { invite, isLoading, error, resetError, decodedIDToken, idToken } = useAuth();

  useEffect(() => {
    if (error) {
      errorHandler(error, 'InviteUserModal');
    }

    return resetError();
  }, [error, resetError]);
  const handleCopyClick = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied!', { duration: 2000, position: 'top-right' });
    } catch {
      toast.error('Failed to copy!', { duration: 2000, position: 'top-right' });
    }
  };
  const handleSubmit = useCallback(
    async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
      const trimmedInviteEmail = values.email.trim();

      const response = await invite({
        email: trimmedInviteEmail,
        camp_id: decodedIDToken!.camp_id,
        idToken,
      });

      if (response) {
        onClose();
        resetForm();
        toast.success(`Invite sent to ${values.email}`, { duration: 2000, position: 'top-right' });
        logger(LogLevel.INFO, LogSource.WEBAPP, 'New user invited', {
          user: values.email,
          camp_id: decodedIDToken!.camp_id,
        });
      }
    },
    [decodedIDToken, idToken, invite, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.inviteModal}>
        {isLoading && <FormLoader />}
        <h2 className={styles.title}>Invite User by Email</h2>
        <p className={styles.subtitle}>Please enter the email address of the user you want to invite</p>
        <Formik validationSchema={inviteMemberSchema} onSubmit={handleSubmit} initialValues={{ email: '' }}>
          <Form className={styles.inviteModal__form}>
            <CustomInput name={'email'} placeholder={'Email'} />
            <div className={styles.divider} />
            <div className={styles.copy__wrapper}>
              <h4>Invite user by link</h4>
              <button
                className={styles.copy}
                type='button'
                onClick={() => handleCopyClick(`${window.location.origin}/id/${decodedIDToken!.camp_id}`)}
              >
                Copy link <Icon size={IconSize.SIZE_28} icon={<CopyIcon />} />
              </button>
            </div>
            <Button type={'submit'} className={'m-centred'}>
              Send Invitation
            </Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
});

export default InviteUserModal;
