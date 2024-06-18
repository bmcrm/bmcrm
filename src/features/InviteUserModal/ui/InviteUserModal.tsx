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
import { useCampers } from 'entities/Camper';

interface InviteUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteUserModal = memo(({ isOpen, onClose }: InviteUserFormProps) => {
  const { invite, isLoading, error, resetError, decodedIDToken } = useAuth();
  const { getCampers } = useCampers();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const handleSubmit = useCallback(async (values: { email: string }, { resetForm }: { resetForm: () => void }) => {
    const response = await invite({ ...values, camp_id: decodedIDToken!.camp_id });

    if (response) {
      onClose();
      resetForm();
      getCampers();
      toast.success(`Invite sent to ${values.email}`, { duration: 2000, position: 'top-right' });
    }
  }, [decodedIDToken, getCampers, invite, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.inviteModal}>
        {isLoading && <FormLoader/>}
        <h2 className={styles.title}>Invite User by Email</h2>
        <p className={styles.subtitle}>Please enter the email address of the user you want to invite</p>
        <Formik validationSchema={inviteMemberSchema} onSubmit={handleSubmit} initialValues={{ email: '' }}>
          <Form className={styles.inviteModal__form}>
            <CustomInput name={'email'} placeholder={'Email'}/>
            <Button type={'submit'} className={'m-centred'}>Send Invitation</Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
});

export default InviteUserModal;