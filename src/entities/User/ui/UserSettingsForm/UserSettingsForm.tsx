import { memo, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { type ICamper, useGetCampers } from '@entities/Camper';
import { CustomInput } from '@shared/ui/CustomInput';
import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { userState } from '../../model/state/userState';
import { userSettingsSchema } from '@shared/const/validationSchemas';
import { inputsData } from '../../model/data/UserSettingsForm.data';
import styles from './UserSettingsForm.module.scss';

type UserSettingsFormProps = {
  onSubmit: (values: Partial<ICamper>) => void;
};

const UserSettingsForm = memo(({ onSubmit }: UserSettingsFormProps) => {
  const { tokens: { decodedIDToken } } = userState();
  const { data: currentCamper } = useGetCampers({camperEmail: decodedIDToken?.email}) as { data: ICamper | undefined };
  const [initialData, setInitialData] = useState<Partial<ICamper>>({
    first_name: '',
    last_name: '',
    playa_name: '',
    email: '',
  });

  useEffect(() => {
    if (currentCamper) {
      setInitialData(prevState => ({
        ...prevState,
        first_name: currentCamper.first_name || '',
        last_name: currentCamper.last_name || '',
        playa_name: currentCamper.playa_name || '',
        email: currentCamper.email,
      }));
    }
  }, [currentCamper]);

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
