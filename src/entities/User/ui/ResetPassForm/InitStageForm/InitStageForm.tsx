import { memo } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { initResetPassSchema } from '@shared/const/validationSchemas';
import type { IInitResetPassData } from '../../../model/types/User.types';
import styles from './InitStageForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

type InitStageFormProps = {
  onSubmit: (values: IInitResetPassData, formikHelpers: FormikHelpers<IInitResetPassData>) => void;
};

const InitStageForm = memo(({ onSubmit }: InitStageFormProps) => (
  <Formik validationSchema={initResetPassSchema} onSubmit={onSubmit} initialValues={{ email: '' }}>
    <Form className={styles.form}>
      <FormikInput name={'email'} type={'email'} label={'Email'} placeholder={'example@gmail.com'}/>
      <Button type={'submit'} className={styles.btn} fluid>
        <Icon icon={<CampIcon />} size={IconSize.SIZE_20} />
        SEND
      </Button>
    </Form>
  </Formik>
));

export default InitStageForm;