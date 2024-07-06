import { memo } from 'react';
import { Form, Formik } from 'formik';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';

import styles from './AddCategoryForm.module.scss';
type AddCategoryFormProps = {
  onClose: () => void;
};
const AddCategoryForm = memo(({ onClose }: AddCategoryFormProps) => {
  return (
    <Formik
      initialValues={{
        category: '',
      }}
      onSubmit={values => {
        console.log(values);
        onClose();
      }}
      enableReinitialize
    >
      <Form className={styles.form}>
        <div className={styles.form__inner}>
          <CustomInput name={'category'} label={'Category name'} placeholder={'Free time'} />
        </div>
        <Button type={'submit'} className={'m-centred'}>
          Save
        </Button>
      </Form>
    </Formik>
  );
});

export default AddCategoryForm;
