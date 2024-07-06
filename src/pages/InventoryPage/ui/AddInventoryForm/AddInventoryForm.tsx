import { memo } from 'react';
import { Form, Formik } from 'formik';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import styles from './AddInventoryForm.module.scss';

type AddInventoryFormProps = {
  onClose: () => void;
};
const AddInventoryForm = memo(({ onClose }: AddInventoryFormProps) => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
      }}
      onSubmit={values => {
        console.log(values);
        onClose();
      }}
      enableReinitialize
    >
      <Form className={styles.form}>
        <div className={styles.form__inner}>
          <CustomInput name={'title'} label={'Title'} placeholder={'Knife for cutting'} />
          <CustomInput name={'description'} label={'Description'} placeholder={'This knife is nice'} />
          <CustomInput name={'category'} label={'Category'} placeholder={'Kitchen'} />
          <CustomInput name={'price'} label={'Price'} placeholder={'120'} />
          <CustomInput name={'quantity'} label={'Quantity'} placeholder={'5'} />
        </div>
        <Button type={'submit'} className={'m-centred'}>
          Save
        </Button>
      </Form>
    </Formik>
  );
});

export default AddInventoryForm;
