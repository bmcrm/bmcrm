import { memo, useCallback, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { userSettingsFormInitial } from '../../lib/generateInitialValues';
import { useGetCampers, normalizeSocialLinks, type ICamper, type FormikSocials } from '@entities/Camper';
import { FormLoader } from '@features/FormLoader';
import { FormInputs } from './FormInputs';
import { FormButtons } from './FormButtons';
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
    () => userSettingsFormInitial(currentCamper),
    [currentCamper]
  );

  const handleSubmit = useCallback(
    (values: Partial<ICamper> & { socials: FormikSocials[] }) => {
      const { socials, ...rest } = values;
      const social_links = normalizeSocialLinks(socials);

      const payload: Partial<ICamper> = {
        email: currentCamper ? currentCamper.email : '',
        ...(social_links ? { social_links } : {}),
        ...rest,
      };

      onSubmit(payload);
    },
    [onSubmit, currentCamper]
  );

  return (
    <>
      {currentCamper && initialValues && (
        <Formik
          validationSchema={userSettingsSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, dirty }) => (
            <Form className={styles.form}>
              <FormInputs values={values} />
              <FormButtons camperEmail={currentCamper.email} role={currentCamper?.role} dirty={dirty} />
            </Form>
          )}
        </Formik>
      )}
      {isLoading && <FormLoader />}
    </>
  );
});

export default UserSettingsForm;
