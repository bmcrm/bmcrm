import { memo, useCallback, useEffect } from 'react';
import errorHandler from 'shared/lib/errorHandler/errorHandler';

import { Field, Form, Formik } from 'formik';
import Button from 'shared/ui/Button/Button';
import toast from 'react-hot-toast';
import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import FormLoader from 'features/FormLoader';

import styles from './InviteMember.module.scss';
import { inviteMemberSchema } from 'shared/const/schemas/validations';
import { useAuth } from 'entities/User';

interface IFormState {
  email: string;
  role: string;
}

interface IProps {
  onClose: () => void;
}

const InviteMember = memo(({ onClose }: IProps) => {
  const { invite, isLoading, error, resetError } = useAuth();

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }

    return resetError();
  }, [error, resetError]);

  const handleSubmit = useCallback(async (values: IFormState, { resetForm }: { resetForm: () => void }) => {
    const response = await invite({ ...values, camp_id: 'test' });

    if (response) {
      onClose();
      resetForm();
      toast.success(`Invite sent to ${values.email}`, { duration: 2000, position: 'top-right' });
    }
  }, [invite, onClose]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <FormLoader/>}
      <h2>Invite User by Email</h2>
      <p>Please enter the email address of the user you want to invite and select Lead/Qualified status</p>
      <Formik validationSchema={inviteMemberSchema} onSubmit={handleSubmit} initialValues={{ email: '', role: '' }}>
        <Form className={styles.form}>
          <div className={styles.radioGroup}>
            <label>
              <Field name='role' type='radio' value='lead' className={styles.input} />
              Lead
            </label>
            <label>
              <Field name='role' type='radio' value='qualified' className={styles.input} />
              Qualified
            </label>
          </div>
          <CustomInput name='email' placeholder='Email' />
          <Button type='submit'>Send Invitation</Button>
        </Form>
      </Formik>
    </div>
  );
});

export default InviteMember;