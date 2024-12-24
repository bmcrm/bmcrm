import { memo } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { CustomInput } from '@shared/ui/CustomInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { initResetPassSchema } from '@shared/const/validationSchemas';
import styles from './ResetPassStepOne.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

type ResetPassStepOneProps = {
  onSubmit: (values: { email: string }, formikHelpers: FormikHelpers<{ email: string }>) => void;
};

const ResetPassStepOne = memo(({ onSubmit }: ResetPassStepOneProps) => (
  <Formik validationSchema={initResetPassSchema} onSubmit={onSubmit} initialValues={{ email: '' }}>
    <Form className={styles.form}>
      <CustomInput name={'email'} type={'email'} label={'Email'} placeholder={'example@gmail.com'}/>
      <Button type='submit' className={styles.btn} fluid>
        <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
        SEND
      </Button>
    </Form>
  </Formik>
));

export default ResetPassStepOne;