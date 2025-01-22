import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { inputs } from '../../model/data/DetailsForm.data';
import type { ICamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';

type DetailsFormProps = {
	className?: string;
	initialValues: Partial<ICamper>;
	handleCancel: () => void;
};

const DetailsForm = memo((props: DetailsFormProps) => {
	const { className, initialValues, handleCancel } = props;

	const handleSubmit = useCallback((values: Partial<ICamper>) => {
		console.log('values: ', values);
	}, []);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
			<Form className={classNames(styles.form, {}, [className])}>
				<div className={styles.form__row}>
					{inputs.name.map(({ name, placeholder, label }) => (
						<FormikInput
							key={name}
							name={name}
							placeholder={placeholder}
							label={label}
						/>
					))}
				</div>
				{inputs.rest.map(({ name, placeholder, label }) => (
					<FormikInput
						key={name}
						name={name}
						placeholder={placeholder}
						label={label}
					/>
				))}
				<FormikTextarea
					name={'about_me'}
					placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
					label={'Summary'}
				/>
				<div className={styles.form__buttons}>
					<Button type={'submit'}>Save</Button>
					<Button
						className={styles.btnCancel}
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						color={ButtonColor.NEUTRAL}
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</div>
			</Form>
		</Formik>
	);
});

export default DetailsForm;