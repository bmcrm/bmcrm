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
import toast from 'react-hot-toast';
import { useAuth } from 'entities/User';
import { logger, LogLevel, LogSource } from 'shared/lib/logger/logger';
import { EnvConfigs } from 'shared/config/env/env';
import FormLoader from 'features/FormLoader';

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
const mode = EnvConfigs.BMCRM_ENV;
const AddInventoryForm = memo(({ onClose }: AddInventoryFormProps) => {
  const fileRef = createRef<HTMLInputElement>();
  const [isUploading, setIsUploading] = useState(false);
  const { createItem } = useInventory();
  const [imagePreviews, setImagePreviews] = useState<{ file: File; previewUrl: string }[]>([]);
  const { idToken: token, decodedIDToken } = useAuth();
  const getPresignedUrl = async (fileName: string) => {
    const response = await fetch(`https://api.${mode}.bmcrm.camp/inventory/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ fileName }),
    });

    const data = await response.json();
    return data.uploadURL;
  };

  const uploadFileToS3 = async (file: File, uploadURL: string) => {
    const result = await fetch(uploadURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: file,
    });

    if (!result.ok) {
      throw new Error('File upload failed');
    }
  };

  const handleSubmit = async (values: FormValues, options: { resetForm: () => void }) => {
    const uploadedImageUrls: string[] = [];
    setIsUploading(true);
    for (const preview of imagePreviews) {
      const uploadURL = await getPresignedUrl(preview.file.name);
      await uploadFileToS3(preview.file, uploadURL);
      uploadedImageUrls.push(uploadURL.split('?')[0]);
    }

    const inventoryItem: Partial<IInventoryItem> = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity, 10),
      images: uploadedImageUrls,
      createdAt: new Date().toISOString(),
    };

    try {
      await createItem(inventoryItem);

      logger(LogLevel.INFO, LogSource.WEBAPP, 'Item created successfully', {
        camp_id: decodedIDToken?.camp_id,
        user: decodedIDToken?.email,
        imageCount: inventoryItem.images?.length,
      });

      toast.success('Item created successfully!');
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Error creating item.');
    }
    setIsUploading(false);

    options.resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imagePreviews.length >= 4) {
      toast.error('You can only upload up to 4 images.');
      return;
    }
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.reduce((acc, file) => {
        if (file.size <= 5 * 1024 * 1024) {
          acc.push({
            file,
            previewUrl: URL.createObjectURL(file),
          });
        } else {
          toast.error('Each image must be less than 5MB.');
        }
        return acc;
      }, [] as { file: File; previewUrl: string }[]);
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
          {isUploading && <FormLoader />}
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
              placeholder={'Select a photo'}
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
              if (e.target.files !== null && e.target.files.length > 4) {
                toast.error('You can only upload up to 4 images.');
                e.target.value = '';
              } else {
                handleFileChange(e);
                setFieldValue('images', e.target.files);
              }
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
