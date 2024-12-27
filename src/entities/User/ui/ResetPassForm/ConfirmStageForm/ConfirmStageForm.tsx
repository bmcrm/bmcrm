import { memo } from 'react';
import { Form, Formik } from 'formik';
import { CustomInput } from '@shared/ui/CustomInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { confirmResetPassSchema } from '@shared/const/validationSchemas';
import { inputsData, initialValues } from '../../../model/data/ResetPassForm.data';
import type { IConfirmResetPass } from '../../../model/types/ResetPass.types';
import styles from './ConfirmStageForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

type ConfirmStageFormProps = {
  onSubmit: (values: IConfirmResetPass, { resetForm }: { resetForm: () => void }) => void;
};

const ConfirmStageForm = memo(({ onSubmit }: ConfirmStageFormProps) => (
  <Formik validationSchema={confirmResetPassSchema} onSubmit={onSubmit} initialValues={initialValues}>
    <Form className={styles.form}>
      {inputsData.map(input => (
        <CustomInput key={input.name} {...input} />
      ))}
      <Button type={'submit'} className={styles.btn} fluid>
        <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
        RESET PASSWORD
      </Button>
    </Form>
  </Formik>
));

export default ConfirmStageForm;