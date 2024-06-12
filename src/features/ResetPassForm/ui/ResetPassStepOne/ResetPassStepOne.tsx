import { memo } from 'react';
import { Form, Formik } from 'formik';

import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import styles from './ResetPassStepOne.module.scss';
import { initResetPassSchema } from 'shared/const/schemas/validations';

type ResetPassStepOneProps = {
  onSubmit: (values: { email: string }, { resetForm }: { resetForm: () => void }) => void;
};

const ResetPassStepOne = memo(({ onSubmit }: ResetPassStepOneProps) => {
  return (
    <Formik validationSchema={initResetPassSchema} onSubmit={onSubmit} initialValues={{ email: '' }}>
      <Form className={styles.form}>
        <CustomInput name={'email'} type={'email'} label={'Email'} placeholder={'example@gmail.com'}/>
        <Button type='submit' className={styles.btn} fluid>
          <Icon icon={<Camp />} size={IconSize.SIZE_20} />
          SEND
        </Button>
      </Form>
    </Formik>
  );
});

export default ResetPassStepOne;