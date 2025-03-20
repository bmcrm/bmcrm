import { memo, useCallback, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { compressImages } from '@shared/lib/compressImages';
import { isDuplicateFile } from '../../lib/checkDuplicateFiles';
import { useToast } from '@shared/hooks/useToast';
import { FormikInput } from '@shared/ui/FormikInput';
import { FilesInput, FilesInputTheme, type IFilesWithPreview } from '@shared/ui/FilesInput';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Image } from '@shared/ui/Image';
import { FormLoader } from '@features/FormLoader';
import { useAddInventory } from '../../hooks/useAddInventory';
import { createInventoryItemSchema } from '@shared/const/validationSchemas';
import { initialValues, inputs } from '../../model/data/AddInventoryForm.data';
import type { IInventoryItem } from '../../model/types/Inventory.types';
import styles from './AddInventoryForm.module.scss';
import DeletePreviewIcon from '@shared/assets/icons/cross.svg';

type AddInventoryFormProps = {
	onClose: () => void;
};

const AddInventoryForm = memo(({ onClose }: AddInventoryFormProps) => {
	const { mutateAsync: createItem, isPending } = useAddInventory();
	const { error } = useToast();

	const handleSubmit = useCallback(
		async (values: Partial<IInventoryItem> & { files: IFilesWithPreview[] }, options: { resetForm: () => void }) => {
			const { files, ...rest } = values;
			const mappedFiles = values.files.map(preview => preview.file);

			const inventoryItem: Partial<IInventoryItem> & { files: File[] } = {
				...rest,
				files: mappedFiles,
				category: values.category?.toLowerCase(),
				price: parseFloat(String(values.price)),
				quantity: parseInt(String(values.quantity), 10),
				createdAt: new Date().toISOString(),
			};

			await createItem(inventoryItem);

			options.resetForm();
			onClose();
		},
		[onClose, createItem]
	);

	return (
		<Formik
			validationSchema={createInventoryItemSchema}
			initialValues={initialValues}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{({ dirty, values, setFieldValue }) => {

				useEffect(() => {
					return () => values.files.forEach(file => URL.revokeObjectURL(file.previewUrl));
				}, [values.files]);

				const handleFilesAdded = useCallback(
					async (addedFiles: File[], currentFiles: IFilesWithPreview[]) => {

						if (currentFiles.length + addedFiles.length > 5) {
							error('You can only upload up to 5 images.');
							return;
						}

						const uniqueFiles = addedFiles.filter(file => !isDuplicateFile({ currentFiles: currentFiles, file }));

						if (uniqueFiles.length === 0) {
							error('Duplicate files are not allowed.');
							return;
						}

						const compressedFiles = await compressImages({ files: addedFiles });
						const validFiles = compressedFiles.filter(Boolean) as IFilesWithPreview[];

						void setFieldValue('files', [...currentFiles, ...validFiles]);
					},
					[error, setFieldValue]
				);

				const handleRemoveImage = useCallback(
					(index: number) => {
						const previewToRemove = values.files[index];

						if (previewToRemove) {
							URL.revokeObjectURL(previewToRemove.previewUrl);
						}

						void setFieldValue('files', values.files.filter((_, i) => i !== index));
					},
					[values.files, setFieldValue]
				);

				return (
					<Form className={styles.form}>
						{isPending && <FormLoader/>}
						<div className={styles.form__inner}>
							{inputs.default.map(({ name, placeholder, label }) => (
								<FormikInput key={name} name={name} label={label} placeholder={placeholder} />
							))}
							<div className={styles.form__row}>
								{inputs.row.map(({ name, placeholder, label, type }) => (
									<FormikInput key={name} type={type} name={name} label={label} placeholder={placeholder} />
								))}
							</div>
							<FilesInput
								theme={FilesInputTheme.ADD_INVENTORY}
								name={'image'}
								label={<>Photo <span style={{ font: 'var(--font-s)', color: 'var(--color-neutral)' }}>(max. 5 photos)</span></>}
								onFilesAdded={(files: File[]) => handleFilesAdded(files, values.files)}
								previewsLength={values.files.length}
							/>
						</div>
						<ul className={styles.form__preview}>
							{values.files.map((preview, index) => (
								<li key={index} className={styles.form__previewItem}>
									<Image
										src={preview.previewUrl}
										alt={`Preview ${index}`}
										customStyles={{ height: '65px' }}
									/>
									<Button
										className={styles.btnRemove}
										theme={ButtonTheme.CLEAR}
										size={ButtonSize.TEXT}
										onClick={() => handleRemoveImage(index)}
									>
										<Icon icon={<DeletePreviewIcon />} size={IconSize.SIZE_16} />
									</Button>
								</li>
							))}
						</ul>
						<div className={styles.form__buttons}>
							<Button type={'submit'} disabled={!dirty}>Save</Button>
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
				);
			}}
		</Formik>
	);
});

export default AddInventoryForm;
