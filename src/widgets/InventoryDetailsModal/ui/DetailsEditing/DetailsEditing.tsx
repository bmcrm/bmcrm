import { memo, useCallback, useState } from 'react';
import { Form, Formik, type FormikValues } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { generateInitialValues } from '../../lib/generateInitialValues';
import { InventorySlider, InventorySliderTheme } from '@widgets/InventorySlider';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { CustomInput } from '@shared/ui/CustomInput';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { useGetCategories, useUpdateInventoryItem, type IInventoryItem } from '@entities/Inventory';
import styles from './DetailsEditing.module.scss';

type DetailsEditingProps = {
	className?: string;
	item: IInventoryItem;
	cancelEdit: () => void;
};

const DetailsEditing = memo((props: DetailsEditingProps) => {
	const { className, item, cancelEdit } = props;
	const { images, id } = item;
	const [newImages, setNewImages] = useState<{ file: File; previewUrl: string }[]>([]);
	const { isMobile } = useMedia();
	const { initialValues, initialData } = generateInitialValues(item);
	const { data: categories } = useGetCategories();
	const { mutateAsync: updateInventory, isPending } = useUpdateInventoryItem();

	const selectOptions = categories?.map(category => ({
		value: category,
		content: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
	}));

	const submitHandler = useCallback(async (values: FormikValues) => {
		const files = newImages.map(img => img.file);

		const inventoryItem: Partial<IInventoryItem> & { files: File[] } = {
			...values,
			files,
			id,
		};

		console.log('inventoryItem:', inventoryItem);

		await updateInventory(inventoryItem);
		cancelEdit();
	}, [cancelEdit, id, newImages, updateInventory]);

	return (
		<Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
			{({ values, handleChange }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<div className={styles.form__inner}>
						<InventorySlider
							images={images}
							customStyles={{ maxWidth: isMobile ? '100%' : '45%' }}
							theme={InventorySliderTheme.EDIT}
							newImages={newImages}
							setNewImages={setNewImages}
						/>
						<div className={styles.form__content}>
							{initialData.default.map(({ name, label, placeholder }) => (
								<CustomInput
									key={name}
									name={name}
									label={label}
									placeholder={placeholder}
									value={values[name as keyof IInventoryItem]}
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
										value={values[name as keyof IInventoryItem]}
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
							onClick={cancelEdit}
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