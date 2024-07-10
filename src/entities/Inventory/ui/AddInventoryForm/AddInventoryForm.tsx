import { createRef, memo, useState } from 'react';
import { Form, Formik } from 'formik';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import styles from './AddInventoryForm.module.scss';
import { ButtonColor, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button.types';
import useInventory from 'entities/Inventory/model/services/useInventory/useInventory';
import { createItemSchema } from 'shared/const/schemas/validations';
import { IInventoryItem } from 'entities/Inventory/model/types/types';
import Icon from 'shared/ui/Icon/Icon';
import DeleteItemPreview from 'shared/assets/icons/deleteImage.svg';
type FormValues = {
  title: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
};

type AddInventoryFormProps = {
  onClose: () => void;
};

const AddInventoryForm = memo(({ onClose }: AddInventoryFormProps) => {
  const fileRef = createRef<HTMLInputElement>();
  const { createItem } = useInventory();
  const [imagePreviews, setImagePreviews] = useState<{ file: File; previewUrl: string }[]>([]);

  const handleSubmit = async (values: FormValues, options: { resetForm: () => void }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('price', String(values.price));
    formData.append('quantity', String(values.quantity));

    imagePreviews.forEach(preview => {
      formData.append('images', preview.file);
    });

    try {
      await createItem(formData as unknown as IInventoryItem);
    } catch (error) {
      console.error('Error creating item:', error);
    }

    options.resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setImagePreviews([...imagePreviews, ...newPreviews]);

      e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  return (
    <Formik
      validationSchema={createItemSchema}
      initialValues={{
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
      }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <div className={styles.form__inner}>
            <CustomInput name={'title'} label={'Title'} placeholder={'Knife for cutting'} />
            <CustomInput name={'description'} label={'Description'} placeholder={'This knife is nice'} />
            <CustomInput name={'category'} label={'Category'} placeholder={'Kitchen'} />
            <div className={styles.form__flex}>
              <CustomInput name={'price'} type='number' label={'Price (1 pc)'} placeholder={'$120'} />
              <CustomInput name={'quantity'} type='number' label={'Quantity'} placeholder={'5'} />
            </div>

            <CustomInput
              readonly
              className={styles.form__image}
              name={'image'}
              label={'Photo'}
              onClick={() => {
                fileRef.current?.click();
              }}
              placeholder={'Select or drag a photo'}
            />
          </div>
          <div className={styles.imagePreviewContainer}>
            {imagePreviews.map((preview, index) => (
              <div key={index} className={styles.imagePreviewItem}>
                <div className={styles.imagePreview}>
                  <img width={80} src={preview.previewUrl} alt={`Preview ${index}`} />
                  <button type='button' className={styles.removeImageButton} onClick={() => handleRemoveImage(index)}>
                    <Icon icon={<DeleteItemPreview />} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <input
            className={styles.file__input}
            ref={fileRef}
            type='file'
            multiple
            accept='image/jpeg,image/png'
            onChange={e => {
              handleFileChange(e);
              setFieldValue('images', e.target.files);
            }}
          />
          <div className={styles.details__buttons}>
            <Button type={'submit'}>Save</Button>
            <Button
              className={styles.btnCancel}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.TEXT}
              color={ButtonColor.NEUTRAL}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default AddInventoryForm;
