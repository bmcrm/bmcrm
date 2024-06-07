import { memo } from 'react';
import { Form, Formik } from 'formik';

import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/IconTypes';
import styles from './ResetPassStepTwo.module.scss';

type ResetPassStepTwoProps = {
  // onSubmit: (values: SignInFormData, { resetForm }: { resetForm: () => void }) => void;
  onSubmit: () => void;
};

const ResetPassStepTwo = memo(({ onSubmit }: ResetPassStepTwoProps) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={{ password: '', confirm_password: '' }}>
      <Form className={styles.form}>
        <CustomInput name={'password'} type={'password'} label={'New Password'} placeholder={'********'}/>
        <CustomInput name={'confirm_password'} type={'password'} label={'Confirm Password'} placeholder={'********'}/>
        <Button type='submit' className={styles.btn} fluid>
          <Icon icon={<Camp />} size={IconSize.SIZE_20} />
          RESET PASSWORD
        </Button>
      </Form>
    </Formik>
  );
});

export default ResetPassStepTwo;