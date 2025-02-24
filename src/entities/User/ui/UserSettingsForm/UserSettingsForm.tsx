import { memo, useCallback, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { userSettingsFormInitial } from '../../lib/generateInitialValues';
import { useGetCampers, type ICamper } from '@entities/Camper';
import { FormInputs } from './FormInputs';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { userSettingsSchema } from '@shared/const/validationSchemas';
import { userState } from '../../model/state/userState';
import styles from './UserSettingsForm.module.scss';

type UserSettingsFormProps = {
  onSubmit: (values: Partial<ICamper>) => void;
};

const UserSettingsForm = memo(({ onSubmit }: UserSettingsFormProps) => {
  const { tokens: { decodedIDToken } } = userState();
  const { data: [currentCamper] = [], isLoading } = useGetCampers({ camperEmail: decodedIDToken?.email });

  const initialValues = useMemo(
    () => currentCamper ? userSettingsFormInitial(currentCamper) : {},
    [currentCamper]
  );

  const handleSubmit = useCallback(
    (values: Partial<ICamper>) => {
      const payload: Partial<ICamper> = {
        email: currentCamper ? currentCamper.email : '',
        ...values,
      };

      onSubmit(payload);
    },
    [onSubmit, currentCamper]
  );

  return (
    <>
      {currentCamper && (
        <Formik
          validationSchema={userSettingsSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form className={styles.form}>
              <FormInputs values={values} />
              <Button type={'submit'} className={'m-centred'}>Save changes</Button>
            </Form>
          )}
        </Formik>
      )}
      {isLoading && <FormLoader />}
    </>
  );
});

export default UserSettingsForm;
