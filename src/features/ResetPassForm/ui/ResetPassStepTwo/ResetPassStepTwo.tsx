import { memo } from 'react';
import { Form, Formik } from 'formik';

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

import Camp from 'icons/camp.svg';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import styles from './ResetPassStepTwo.module.scss';
import { confirmResetPassSchema } from 'shared/const/schemas/validations';
import { inputsData, initialValues } from './inputsData';
import { type IResetPassStepTwo } from '../../model/types/resetPass.types';

type ResetPassStepTwoProps = {
  onSubmit: (values: IResetPassStepTwo, { resetForm }: { resetForm: () => void }) => void;
};

const ResetPassStepTwo = memo(({ onSubmit }: ResetPassStepTwoProps) => {
  return (
    <Formik validationSchema={confirmResetPassSchema} onSubmit={onSubmit} initialValues={initialValues}>
      <Form className={styles.form}>
        {inputsData.map(input => (
          <CustomInput key={input.name} {...input} />
        ))}
        <Button type='submit' className={styles.btn} fluid>
          <Icon icon={<Camp />} size={IconSize.SIZE_20} />
          RESET PASSWORD
        </Button>
      </Form>
    </Formik>
  );
});

export default ResetPassStepTwo;