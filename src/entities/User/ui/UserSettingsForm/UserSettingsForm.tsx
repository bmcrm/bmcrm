import { memo, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import useAuth from '../../model/services/useAuth/useAuth';
import { type ICamper, useCampers } from 'entities/Camper';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Avatar from 'shared/ui/Avatar/Avatar.tsx';
import Button from 'shared/ui/Button/Button.tsx';
import { userSettingsSchema } from 'shared/const/schemas/validations';
import { inputsData } from './inputsData';
import styles from './UserSettingsForm.module.scss';

type UserSettingsFormProps = {
  onSubmit: (values: Partial<ICamper>) => void;
};

const UserSettingsForm = memo(({ onSubmit }: UserSettingsFormProps) => {
  const { decodedIDToken } = useAuth();
  const { getCamper } = useCampers();
  const [userEmail, setUserEmail] = useState('');
  const [initialData, setInitialData] = useState<Partial<ICamper>>({
    first_name: '',
    last_name: '',
    playa_name: '',
    email: '',
  });

  useEffect(() => {
    const getEmail = async () => {
      if (decodedIDToken && userEmail !== decodedIDToken.email) {
        setUserEmail(decodedIDToken.email);
      }
    };

    void getEmail();
  }, [decodedIDToken, userEmail]);

  useEffect(() => {
    const fetchCamper = async () => {
      if (userEmail) {
        const currentCamper = await getCamper(userEmail);

        if (currentCamper) {
          setInitialData(prevState => ({
            ...prevState,
            first_name: currentCamper.first_name || '',
            last_name: currentCamper.last_name || '',
            playa_name: currentCamper.playa_name || '',
            email: currentCamper.email,
          }));
        }
      }
    };

    void fetchCamper();
  }, [getCamper, userEmail]);

  return (
    <Formik validationSchema={userSettingsSchema} initialValues={initialData} onSubmit={onSubmit} enableReinitialize>
      <Form className={styles.form}>
        <div className={styles.form__inner}>
          <div className={styles.form__inputs}>
            {inputsData.map(input => (
              <CustomInput key={input.name} {...input} />
            ))}
          </div>
          <Avatar size={240} src={null} />
        </div>
        <Button type={'submit'} className={'m-centred'}>
          Save changes
        </Button>
      </Form>
    </Formik>
  );
});

export default UserSettingsForm;
