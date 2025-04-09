import { memo, useCallback, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { normalizeSocialLinks } from '../../lib/normalizeSocialLinks';
import { normalizeTags } from '../../lib/normalizeTags';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { DetailsFormBasics } from './DetailsFormBasics';
import { DetailsFormTags } from './DetailsFormTags';
import { DetailsFormHistory } from './DetailsFormHistory';
import { DetailsFormSocials } from './DetailsFormSocials';
import { DetailsFormButtons } from './DetailsFormButtons';
import { useUpdateCamper } from '../../hooks/useUpdateCamper';
import { appState } from '@entities/App';
import { editCamperSchema } from '@shared/const/validationSchemas';
import { CamperRole, type ICamper, type IFormikCamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';

type DetailsFormProps = {
  className?: string;
  initialValues: Partial<IFormikCamper>;
  handleCancel: () => void;
  onClose?: () => void;
  camperEmail: string;
};

const DetailsForm = memo((props: DetailsFormProps) => {
  const { className, initialValues, handleCancel, onClose, camperEmail } = props;
  const { mutate: updateCamper } = useUpdateCamper();
  const { decrementModalCount } = appState();
  const [isDirty, setIsDirty] = useState(false);

  const handleSubmit = useCallback(
    (values: Partial<IFormikCamper>) => {
      if (!isDirty) {
        handleCancel();
        return;
      }

      const { socials, role, tags, custom_email, ...rest } = values;

      const social_links = normalizeSocialLinks(socials);
      const normalizedTags = tags ? normalizeTags(tags) : null;

      const payload: Partial<ICamper> = {
        email: camperEmail,
        custom_email,
        ...rest,
        ...(initialValues.role === CamperRole.TCO ? {} : { role }),
        ...(social_links ? { social_links } : {}),
        ...(normalizedTags ? { tags: normalizedTags } : {}),
      };

      if (initialValues.role !== values.role) {
        decrementModalCount();
        onClose?.();
      }

      updateCamper(payload);
      handleCancel();
    },
    [camperEmail, onClose, decrementModalCount, isDirty, handleCancel, initialValues.role, updateCamper]
  );

  return (
    <Formik initialValues={initialValues} validationSchema={editCamperSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ values, dirty }) => {
        useEffect(() => {
          setIsDirty(dirty);
        }, [dirty]);
        console.log(values);

        return (
          <Form
            className={classNames(styles.form, {}, [className])}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            <DetailsFormBasics
              createdBy={values.createdBy}
              role={initialValues.role || CamperRole.CAMPER}
              visitedBM={values.visitedBM}
              birthdayDate={values.birthdayDate}
            />
            <DetailsFormTags values={values} />
            <FormikTextarea name={'about_me'} placeholder={'Burner from 2021. Working in IT, 29 y.o.'} label={'Summary'} />
            <DetailsFormHistory history={values.history} />
            <DetailsFormSocials socials={values.socials} />
            <DetailsFormButtons
              handleCancel={handleCancel}
              onClose={onClose}
              role={initialValues.role}
              camperEmail={camperEmail}
              camperName={`${initialValues.first_name} ${initialValues.last_name}`}
              dirty={dirty}
            />
          </Form>
        );
      }}
    </Formik>
  );
});

export default DetailsForm;
