import { memo, useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import imageCompression from 'browser-image-compression';
import { useToast } from '@shared/hooks/useToast';
import { CustomInput } from '@shared/ui/CustomInput';
import { FilesInput } from '@shared/ui/FilesInput';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Image } from '@shared/ui/Image';
import { FormLoader } from '@features/FormLoader';
import { useAddInventory } from '@entities/Inventory';
import { createInventoryItemSchema } from '@shared/const/validationSchemas';
import { initialValues, inputs } from '../../model/data/AddInventoryForm.data';
import type { IInventoryItem } from '../../model/types/Inventory.types';
import styles from './AddInventoryForm.module.scss';
import DeletePreviewIcon from '@shared/assets/icons/deleteImage.svg';

type AddInventoryFormProps = {
	onClose: () => void;
};

const AddInventoryForm = memo(({ onClose }: AddInventoryFormProps) => {
	const [imagePreviews, setImagePreviews] = useState<{ file: File; previewUrl: string }[]>([]);
	const { mutateAsync: createItem, isPending } = useAddInventory();
	const { error } = useToast();

	const handleSubmit = useCallback(
		async (values: Partial<IInventoryItem>, options: { resetForm: () => void }) => {
			const files = imagePreviews.map(preview => preview.file);

			const inventoryItem: Partial<IInventoryItem> & { files: File[] } = {
				...values,
				files,
				price: parseFloat(String(values.price)),
				quantity: parseInt(String(values.quantity), 10),
				createdAt: new Date().toISOString(),
			};

			await createItem(inventoryItem);

			options.resetForm();
			onClose();
		},
		[createItem, imagePreviews, onClose]
	);

	const handleFilesAdded = useCallback(
		async (files: File[]) => {
			if (imagePreviews.length >= 5) {
				error('You can only upload up to 5 images.');
				return;
			}

			const compressedFiles = await Promise.all(
				files.map(async (file) => {
					if (file.size > 5 * 1024 * 1024) {
						error(`File "${file.name}" exceeds the size limit of 5MB.`);
						return null;
					}

					try {
						const options = {
							maxSizeMB: 0.5,
							maxWidthOrHeight: 1920,
							useWebWorker: true,
							initialQuality: 0.75,
						};
						const compressedFile = await imageCompression(file, options);
						return {
							file: compressedFile,
							previewUrl: URL.createObjectURL(compressedFile),
						};
					} catch (err) {
						error(`Error compressing image "${file.name}".`);
						console.error('Compression error:', err);
						return null;
					}
				})
			);

			const validFiles = compressedFiles.filter(Boolean) as { file: File; previewUrl: string }[];
			setImagePreviews((prev) => [...prev, ...validFiles]);
		},
		[error, imagePreviews.length]
	);

	const handleRemoveImage = useCallback(
		(index: number) => setImagePreviews(prev => prev.filter((_, i) => i !== index)),
		[]
	);

	return (
		<Formik
			validationSchema={createInventoryItemSchema}
			initialValues={initialValues}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			<Form className={styles.form}>
				{isPending && <FormLoader/>}
				<div className={styles.form__inner}>
					{inputs.default.map(({ name, placeholder, label }) => (
						<CustomInput key={name} name={name} label={label} placeholder={placeholder}/>
					))}
					<div className={styles.form__row}>
						{inputs.row.map(({ name, placeholder, label }) => (
							<CustomInput key={name} name={name} label={label} placeholder={placeholder}/>
						))}
					</div>
					<FilesInput label={'Photo'} onFilesAdded={handleFilesAdded} previewsLength={imagePreviews.length}/>
				</div>
				<ul className={styles.form__preview}>
					{imagePreviews.map((preview, index) => (
						<li key={index} className={styles.form__previewItem}>
							<Image src={preview.previewUrl} alt={`Preview ${index}`} maxWidth={90} />
							<Button
								className={styles.btnRemove}
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								onClick={() => handleRemoveImage(index)}
							>
								<Icon icon={<DeletePreviewIcon/>} size={IconSize.SIZE_16} />
							</Button>
						</li>
					))}
				</ul>
				<div className={styles.form__buttons}>
					<Button type={'submit'}>Save</Button>
					<Button
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						color={ButtonColor.NEUTRAL}
						className={styles.btnCancel}
						onClick={onClose}
					>
						Cancel
					</Button>
				</div>
			</Form>
		</Formik>
	);
});

export default AddInventoryForm;
