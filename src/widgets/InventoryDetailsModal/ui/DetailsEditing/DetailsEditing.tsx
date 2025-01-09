import { memo, useCallback } from 'react';
import { Form, Formik, type FormikValues } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { generateInitialValues } from '../../lib/generateInitialValues';
import { InventorySlider, InventorySliderTheme } from '@widgets/InventorySlider';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { CustomInput } from '@shared/ui/CustomInput';
import type { IInventoryItem } from '@entities/Inventory';
import styles from './DetailsEditing.module.scss';

type DetailsEditingProps = {
	className?: string;
	item: IInventoryItem;
	cancelEdit: () => void;
};

const DetailsEditing = memo((props: DetailsEditingProps) => {
	const { className, item, cancelEdit } = props;
	const { images } = item;
	const { isMobile } = useMedia();
	const { initialValues, initialData } = generateInitialValues(item);

	const submitHandler = useCallback((values: FormikValues) => {
		console.log('values:', values);
	}, []);

	return (
		<Formik initialValues={initialValues} onSubmit={submitHandler} enableReinitialize>
			{({ values, handleChange }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<div className={styles.form__inner}>
						<InventorySlider
							images={images}
							customStyles={{ maxWidth: isMobile ? '100%' : '45%' }}
							theme={InventorySliderTheme.EDIT}
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
				</Form>
			)}
		</Formik>
	);
});

export { DetailsEditing };