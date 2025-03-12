import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { generateCalendarInitials } from '../../lib/generateInitialValues';
import { FormikInput } from '@shared/ui/FormikInput';
import { Datepicker } from '@shared/ui/Datepicker';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { useCreateCalendarEvent } from '../../hooks/useCreateCalendarEvent';
import { useEditCalendarEvent } from '../../hooks/useEditCalendarEvent';
import { createCalendarEventSchema } from '@shared/const/validationSchemas';
import { ICalendarEvent, IFormCalendarEvent } from '../../model/types/Camp.types';
import styles from './CalendarEventForm.module.scss';

type CalendarEventFormProps = {
	className?: string;
	onClose: () => void;
	currentEvent?: ICalendarEvent | null;
};

const CalendarEventForm = memo(({ className, onClose, currentEvent }: CalendarEventFormProps) => {
	const { mutateAsync: createEvent, isPending } = useCreateCalendarEvent();
	const { mutate: editEvent } = useEditCalendarEvent();

	const initialValues = generateCalendarInitials(currentEvent);

	const handleSubmit = useCallback(
		async (values: IFormCalendarEvent) => {
			const utcDate = values.date
				? new Date(Date.UTC(values.date.getFullYear(), values.date.getMonth(), values.date.getDate())).toISOString()
				: null;

			if (utcDate) {
				if (currentEvent) {
					const event = {
						...currentEvent,
						event: values.event,
						date: utcDate,
					};
					editEvent(event);
				} else {
					await createEvent({
						...values,
						date: utcDate,
					});
				}
			}

			onClose();
		},
		[createEvent, onClose, currentEvent, editEvent]
	);

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createCalendarEventSchema}>
				{({ setFieldValue, values }) => (
					<Form className={classNames(styles.form, {}, [className])}>
						<FormikInput name={'event'} label={'Event Name'} placeholder={'Daily Campsite MOOP'}/>
						<Datepicker
							ariaDescribedBy={'Event date'}
							errorName={'timestamp'}
							label={'Event Date'}
							date={values.date}
							onChange={(date) => setFieldValue('date', date)}
							minDate={new Date()}
							mask={'00.00.0000'}
							showMonthDropdown
							showYearDropdown
						/>
						<Button type={'submit'} className={'m-centred'}>Save</Button>
					</Form>
				)}
			</Formik>
			{isPending && <FormLoader />}
		</>
	);
});

export default CalendarEventForm;