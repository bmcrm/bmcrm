import { memo, useCallback } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { FormBasic } from './FormBasic';
import { initialValues } from '../../model/data/Shift.data';
import styles from './AddShiftForm.module.scss';
import { Button } from '@shared/ui/Button';

type AddShiftFormProps = {
	className?: string;
};

const AddShiftForm = memo((props: AddShiftFormProps) => {
	const { className } = props;

	const handleSubmit = useCallback((values: FormikValues) => {
		console.log('values: ', values);
	}, [])

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({ values }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<FormBasic members={values.members} />
					<Button type={'submit'} className={'m-centred'}>Save</Button>
				</Form>
			)}
		</Formik>
	);
});

export { AddShiftForm };