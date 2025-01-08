import { createRef, memo, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { CustomInput } from '@shared/ui/CustomInput';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import styles from './EditInventoryForm.module.scss';
import useInventory from '@entities/Inventory/model/services/useInventory/useInventory';
import { createInventoryItemSchema } from '@shared/const/validationSchemas';
import { IInventoryItem } from '@entities/Inventory/model/types/Inventory.types.ts';
import { Icon } from '@shared/ui/Icon';
import DeleteItemPreview from '@shared/assets/icons/deleteImage.svg';
import { FormLoader } from '@features/FormLoader';

type FormValues = {
  title: string;
  description: string;
  category: string;
  price: string | number;
  quantity: string | number;
};

type EditInventoryFormProps = {
  onClose: () => void;
  itemId: string;
};

const EditInventoryForm = memo(({ onClose, itemId }: EditInventoryFormProps) => {
  const fileRef = createRef<HTMLInputElement>();
  const { getItem, updateItem, isLoading, getItems } = useInventory(state => ({
    isLoading: state.isLoading,
    getItem: state.getItem,
    updateItem: state.updateItem,
    getItems: state.getItems,
  }));
  const [item, setItem] = useState<IInventoryItem | null>();
  useEffect(() => {
    getItem(itemId).then(item => {
      setItem(item);
    });
  }, [getItem, itemId]);
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
      await updateItem(formData as unknown as IInventoryItem, itemId);
      getItems();
    } catch (error) {
      console.error('Error updating item:', error);
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
      validationSchema={createInventoryItemSchema}
      initialValues={{
        title: item?.title || '',
        description: item?.description || '',
        category: item?.category || '',
        price: item?.price || '',
        quantity: item?.quantity || '',
      }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          {isLoading && <FormLoader className={'m-centred'} />}
          <div className={styles.form__inner}>
            <CustomInput name={'title'} label={'Title'} placeholder={'Knife for cutting'} />
            <CustomInput name={'description'} label={'Description'} placeholder={'This knife is nice'} />
            <CustomInput name={'category'} label={'Category'} placeholder={'Kitchen'} />
            <div className={styles.form__flex}>
              <CustomInput name={'price'} type='number' label={'Price (1 pc)'} placeholder={'$120'} />
              <CustomInput name={'quantity'} type='number' label={'Quantity'} placeholder={'5'} />
            </div>

            {/* <CustomInput
              readonly
              className={styles.form__image}
              name={'image'}
              label={'Photo'}
              onClick={() => {
                fileRef.current?.click();
              }}
              placeholder={'Select or drag a photo'}
            /> */}
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
            disabled
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

export default EditInventoryForm;
