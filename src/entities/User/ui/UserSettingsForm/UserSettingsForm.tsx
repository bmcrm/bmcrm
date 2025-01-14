import { memo, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { useGetCampers, type ICamper } from '@entities/Camper';
import { CustomInput } from '@shared/ui/CustomInput';
import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { userSettingsSchema } from '@shared/const/validationSchemas';
import { userState } from '../../model/state/userState';
import { inputsData } from '../../model/data/UserSettingsForm.data';
import styles from './UserSettingsForm.module.scss';

type UserSettingsFormProps = {
  onSubmit: (values: Partial<ICamper>) => void;
};

const UserSettingsForm = memo(({ onSubmit }: UserSettingsFormProps) => {
  const { tokens: { decodedIDToken } } = userState();
  const { data: [currentCamper] = [], isLoading } = useGetCampers({ camperEmail: decodedIDToken?.email });

  const initialValues = useMemo(() => ({
    email: currentCamper?.email ?? '',
    first_name: currentCamper?.first_name ?? '',
    last_name: currentCamper?.last_name ?? '',
    playa_name: currentCamper?.playa_name ?? '',
  }), [currentCamper]);

  return (
    <>
      <Formik
        validationSchema={userSettingsSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form className={styles.form}>
          <div className={styles.form__inner}>
            <div className={styles.form__inputs}>
              {inputsData.map(input => <CustomInput key={input.name} {...input} />)}
            </div>
            <Avatar size={240} src={null} />
          </div>
          <Button type={'submit'} className={'m-centred'}>Save changes</Button>
        </Form>
      </Formik>
      {isLoading && <FormLoader />}
    </>
  );
});

export default UserSettingsForm;
