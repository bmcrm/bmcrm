import { memo, useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { generateInitialValues } from '../../lib/generateInitialValues';
import { InventorySlider, InventorySliderTheme } from '@widgets/InventorySlider';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { CustomInput } from '@shared/ui/CustomInput';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { useGetCategories, useUpdateInventoryItem, type IInventoryItem } from '@entities/Inventory';
import { createInventoryItemSchema } from '@shared/const/validationSchemas';
import { MODAL_ANIMATION_DELAY } from '@shared/const/animations';
import styles from './DetailsEditing.module.scss';

type DetailsEditingProps = {
	className?: string;
	item: IInventoryItem;
	cancelEdit: () => void;
	onClose: () => void;
};

const DetailsEditing = memo((props: DetailsEditingProps) => {
	const { className, item, cancelEdit, onClose } = props;
	const { images, id, category } = item;
	const [currentImages, setCurrentImages] = useState<string[]>(images ? images : []);
	const [newImages, setNewImages] = useState<{ file: File; previewUrl: string }[]>([]);
	const [deletedImages, setDeletedImages] = useState<string[]>([]);
	const { isMobile } = useMedia();
	const { initialValues, initialData } = generateInitialValues(item);
	const { data: categories } = useGetCategories();
	const { mutateAsync: updateInventory, isPending } = useUpdateInventoryItem();

	const selectOptions = categories?.map(category => ({
		value: category,
		content: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
	}));

	const handleCancelEdit = useCallback(() => {
		newImages.forEach(file => URL.revokeObjectURL(file.previewUrl));
		cancelEdit();
	}, [cancelEdit, newImages]);

	const submitHandler = useCallback(async (values: Partial<IInventoryItem>) => {
		const files = newImages.map(img => img.file);
		const isChangedCategory = category !== values.category;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { images: _, ...filteredValues } = values;

		const inventoryItem: Partial<IInventoryItem> & { files: File[] } = {
			...filteredValues,
			files,
			id,
			...(currentImages.length > 0 ? { images: currentImages } : {}),
			...(deletedImages.length > 0 ? { deletedImages } : {}),
			...(isChangedCategory ? { oldCategory: category } : {}),
		};

		await updateInventory(inventoryItem);

		if (isChangedCategory) {
			await new Promise<void>((resolve) => {
				onClose();
				setTimeout(resolve, MODAL_ANIMATION_DELAY + 100);
			});
		}

		handleCancelEdit();
	}, [category, currentImages, deletedImages, handleCancelEdit, id, newImages, onClose, updateInventory]);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={submitHandler}
			validationSchema={createInventoryItemSchema}
			enableReinitialize
		>
			{({ values, handleChange }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<div className={styles.form__inner}>
						<InventorySlider
							currentImages={currentImages}
							customStyles={{ maxWidth: isMobile ? '100%' : '55%' }}
							theme={InventorySliderTheme.EDIT}
							newImages={newImages}
							setCurrentImages={setCurrentImages}
							setNewImages={setNewImages}
							setDeletedImages={setDeletedImages}
						/>
						<div className={styles.form__content}>
							{initialData.default.map(({ name, label, placeholder }) => (
								<CustomInput
									key={name}
									name={name}
									label={label}
									placeholder={placeholder}
									value={values[name as keyof Omit<IInventoryItem, 'lastItem'>]}
									onChange={handleChange}
								/>
							))}
							<div className={styles.form__row}>
								{initialData.nested.map(({ name, label, placeholder, type }) => (
									<CustomInput
										key={name}
										type={type}
										name={name}
										label={label}
										placeholder={placeholder}
										value={values[name as keyof Omit<IInventoryItem, 'lastItem'>]}
										onChange={handleChange}
									/>
								))}
							</div>
							{selectOptions && (
								<CustomSelect label={'Category'} name={'category'} options={selectOptions} />
							)}
						</div>
					</div>
					<div className={styles.form__buttons}>
						<Button type={'submit'}>Save</Button>
						<Button
							className={styles.form__btn}
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							onClick={handleCancelEdit}
						>
							Cancel
						</Button>
					</div>
					{isPending && <FormLoader />}
				</Form>
			)}
		</Formik>
	);
});

export { DetailsEditing };