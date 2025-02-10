import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { FormBasic } from './FormBasic';
import { FormDate } from './FormDate';
import { useCreateShift } from '../../hooks/useCreateShift';
import { initialValues } from '../../model/data/Shift.data';
import type { IShift } from '../../model/types/Shift.types';
import styles from './AddShiftForm.module.scss';

type AddShiftFormProps = {
	className?: string;
};

const AddShiftForm = memo((props: AddShiftFormProps) => {
	const { className } = props;
	const { mutate: createShift, isPending } = useCreateShift();

	const handleSubmit = useCallback((values: Partial<IShift>) => {
		createShift(values);

		console.log('values:', values);
	}, [createShift])

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ values }) => (
					<Form className={classNames(styles.form, {}, [className])}>
						<FormBasic members={values.members} />
						<FormDate values={values} />
						<Button type={'submit'} className={'m-centred'}>Save</Button>
					</Form>
				)}
			</Formik>
			{isPending && <FormLoader />}
		</>
	);
});

export { AddShiftForm };