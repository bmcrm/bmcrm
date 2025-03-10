import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useToast } from '@shared/hooks/useToast';
import { Modal } from '@shared/ui/Modal';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FormikInput } from '@shared/ui/FormikInput';
import { FormLoader } from '@features/FormLoader';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import { useInviteCamper } from '@entities/Camper';
import { userState } from '@entities/User';
import { inviteMemberSchema } from '@shared/const/validationSchemas';
import styles from './InviteCamperModal.module.scss';
import CopyIcon from '@shared/assets/icons/copy.svg';

interface InviteCamperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteCamperModal = memo(({ isOpen, onClose }: InviteCamperModalProps) => {
  const { tokens: { idToken, decodedIDToken } } = userState();
  const { success, error } = useToast();
  const { mutateAsync: invite, isPending } = useInviteCamper();

  const handleCopyClick = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      success('Copied!');
    } catch {
      error('Failed to copy!');
    }
  }, [error, success]);

  const handleSubmit = useCallback(
    async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
      const trimmedInviteEmail = values.email.trim();
      await invite({
        email: trimmedInviteEmail,
        camp_id: decodedIDToken!.camp_id,
        idToken,
      });

      logger(LogLevel.INFO, LogSource.WEBAPP, 'New user invited', {
        user: values.email,
        camp_id: decodedIDToken!.camp_id,
      });

      success(`Invite sent to ${values.email}`);

      resetForm();
      onClose();
    },
    [decodedIDToken, idToken, invite, onClose, success]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.inviteModal}>
        {isPending && <FormLoader />}
        <h2 className={styles.title}>Invite User by Email</h2>
        <p className={styles.subtitle}>Please enter the email address of the user you want to invite</p>
        <Formik validationSchema={inviteMemberSchema} onSubmit={handleSubmit} initialValues={{ email: '' }}>
          {({ dirty }) => (
            <Form className={styles.inviteModal__form}>
              <FormikInput name={'email'} placeholder={'Email'} />
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
              <Button type={'submit'} className={'m-centred'} disabled={!dirty}>
                Send Invitation
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
});

export default InviteCamperModal;
