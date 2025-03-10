import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { FormikInput } from '@shared/ui/FormikInput';
import { Datepicker } from '@shared/ui/Datepicker';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { useCreateCalendarEvent } from '../../hooks/useCreateCalendarEvent';
import { createCalendarEventSchema } from '@shared/const/validationSchemas';
import { initialValues } from '../../model/data/AddCalendarEventForm.data';
import { ICreateCalendarEvent } from '../../model/types/Camp.types';
import styles from './AddCalendarEventForm.module.scss';

type AddCalendarEventFormProps = {
	className?: string;
	onClose: () => void;
};

const AddCalendarEventForm = memo(({ className, onClose }: AddCalendarEventFormProps) => {
	const { mutateAsync: createEvent, isPending } = useCreateCalendarEvent();

	const handleSubmit = useCallback(
		async (values: ICreateCalendarEvent) => {
			await createEvent(values);
			onClose();
		},
		[createEvent, onClose]
	);

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createCalendarEventSchema}>
				{({ setFieldValue, values }) => (
					<Form className={classNames(styles.form, {}, [className])}>
						<FormikInput name={'title'} label={'Event Name'} placeholder={'Daily Campsite MOOP'}/>
						<Datepicker
							ariaDescribedBy={'Event date'}
							errorName={'timestamp'}
							label={'Event Date'}
							date={values.date}
							onChange={(date) => setFieldValue('date', date)}
							minDate={new Date()}
						/>
						<Button type={'submit'} className={'m-centred'}>Save</Button>
					</Form>
				)}
			</Formik>
			{isPending && <FormLoader />}
		</>
	);
});

export default AddCalendarEventForm;