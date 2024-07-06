import { memo } from 'react';
import { Form, Formik } from 'formik';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import styles from './AddInventoryForm.module.scss';
import { ButtonColor, ButtonTheme } from 'shared/ui/Button/Button.types';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';

type AddInventoryFormProps = {
  onClose: () => void;
};
const AddInventoryForm = memo(({ onClose }: AddInventoryFormProps) => {
  const { createItem } = useInventory();
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
      }}
      onSubmit={(values, options) => {
        createItem({ ...values, price: Number(values.price), quantity: Number(values.quantity) });
        options.resetForm();
        onClose();
      }}
      enableReinitialize
    >
      <Form className={styles.form}>
        <div className={styles.form__inner}>
          <CustomInput name={'title'} label={'Title'} placeholder={'Knife for cutting'} />
          <CustomInput name={'description'} label={'Description'} placeholder={'This knife is nice'} />
          <CustomInput name={'category'} label={'Category'} placeholder={'Kitchen'} />
          <CustomInput name={'price'} type='number' label={'Price'} placeholder={'120'} />
          <CustomInput name={'quantity'} type='number' label={'Quantity'} placeholder={'5'} />
        </div>
        <div className={styles.buttons}>
          <Button type={'submit'} className={'m-centred'}>
            Save
          </Button>
          <Button
            color={ButtonColor.RUBY}
            theme={ButtonTheme.OUTLINE}
            onClick={onClose}
            type={'button'}
            className={'m-centred'}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Formik>
  );
});

export default AddInventoryForm;
