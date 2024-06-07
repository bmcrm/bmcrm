import { Field, Form, Formik } from 'formik';
import Button from 'shared/ui/Button/Button';
import styles from './InviteMember.module.scss';
import toast from 'react-hot-toast';
import { inviteMemberSchema } from 'shared/lib/schemas/validations.ts';
import { CustomInput } from 'shared/ui/CustomInput/CustomInput';

interface IFormState {
  email: string;
  type: string;
}

interface Props {
  onClose: () => void;
}
export const InviteMember = ({ onClose }: Props) => {
  const handleSubmit = (values: IFormState, { resetForm }: { resetForm: () => void }) => {
    onClose();
    resetForm();
    toast.success(`Invite sent to ${values.email}`, { duration: 2000, position: 'top-right' });
  };
  return (
    <div className={styles.wrapper}>
      <h2>Invite User by Email</h2>
      <p>Please enter the email address of the user you want to invite and select Lead/Qualified status</p>
      <Formik
        validationSchema={inviteMemberSchema}
        onSubmit={handleSubmit}
        initialValues={{ email: '', type: 'Leads' }}
      >
        <Form className={styles.form}>
          <div className={styles.radioGroup}>
            <label>
              <Field name='type' type='radio' value='Leads' className={styles.input} />
              Leads
            </label>
            <label>
              <Field name='type' type='radio' value='Qualified' className={styles.input} />
              Qualified
            </label>
          </div>
          <CustomInput name='email' placeholder='Email' />
          <Button type='submit'>Send Invitation</Button>
        </Form>
      </Formik>
    </div>
  );
};
