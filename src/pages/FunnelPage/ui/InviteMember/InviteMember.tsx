import { memo, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { inviteUser } from 'shared/api/userAuth/userAuth';
import { useAuth } from 'entities/User';

import { Field, Form, Formik } from 'formik';
import Button from 'shared/ui/Button/Button';
import toast from 'react-hot-toast';
import { CustomInput } from 'shared/ui/CustomInput/CustomInput';

import styles from './InviteMember.module.scss';
import { inviteMemberSchema } from 'shared/const/schemas/validations';

interface IFormState {
  email: string;
  role: string;
}
interface CustomJwtPayload extends JwtPayload {
  'custom:camp_id'?: string;
}
interface Props {
  onClose: () => void;
}
export const InviteMember = memo(({ onClose }: Props) => {
  const idToken = useAuth(state => state.idToken);
  const [profile, setProfile] = useState<CustomJwtPayload | null>(null);
  const getProfile = async () => {
    if (idToken) {
      const decodedToken = await jwtDecode<CustomJwtPayload>(idToken);
      setProfile(decodedToken);
    }
  };
  const handleSubmit = async (values: IFormState, { resetForm }: { resetForm: () => void }) => {
    onClose();
    resetForm();

    console.log(profile);
    // console.log({ ...values, camp_id: profile['custom:camp_id'], password: '123qweQ!' });

    const response = inviteUser({ ...values, camp_id: 'test' });
    toast.success(`Invite sent to ${values.email}`, { duration: 2000, position: 'top-right' });
  };
  return (
    <div className={styles.wrapper}>
      <h2>Invite User by Email</h2>
      <p>Please enter the email address of the user you want to invite and select Lead/Qualified status</p>
      <Formik validationSchema={inviteMemberSchema} onSubmit={handleSubmit} initialValues={{ email: '', role: 'lead' }}>
        <Form className={styles.form}>
          <div className={styles.radioGroup}>
            <label>
              <Field name='type' type='radio' value='lead' className={styles.input} />
              Lead
            </label>
            <label>
              <Field name='type' type='radio' value='qualified' className={styles.input} />
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
