import { memo, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { generateCalendarInitials } from '../../lib/generateInitialValues';
import { FormikInput } from '@shared/ui/FormikInput';
import { DatepickerRange } from '@shared/ui/Datepicker';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { useCreateCalendarEvent } from '../../hooks/useCreateCalendarEvent';
import { useEditCalendarEvent } from '../../hooks/useEditCalendarEvent';
import { createCalendarEventSchema } from '@shared/const/validationSchemas';
import type { ICalendarEvent, IFormCalendarEvent } from '../../model/types/Camp.types';
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
			const utcStartDate = values.startDate
				? new Date(Date.UTC(values.startDate.getFullYear(), values.startDate.getMonth(), values.startDate.getDate())).toISOString()
				: null;
			const utcEndDate = values.endDate
				? new Date(Date.UTC(values.endDate.getFullYear(), values.endDate.getMonth(), values.endDate.getDate())).toISOString()
				: null;

			if (utcStartDate) {
				if (currentEvent) {
					const event = {
						...currentEvent,
						event: values.event,
						startDate: utcStartDate,
						endDate: utcEndDate || '',
					};
					editEvent(event);
				} else {
					await createEvent({
						...values,
						startDate: utcStartDate,
						endDate: utcEndDate || '',
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
				{({ setFieldValue, values, dirty }) => (
					<Form className={classNames(styles.form, {}, [className])}>
						<FormikInput name={'event'} label={'Event Name'} placeholder={'Daily Campsite MOOP'} />
						<DatepickerRange
							ariaDescribedBy={'Event date'}
							errorName={'startDate'}
							label={'Event Date'}
							minDate={new Date()}
							dateRange={[values.startDate, values.endDate]}
							onChange={(dateRange: [Date | null, Date | null]) => {
								const [start, end] = dateRange;
								void setFieldValue('startDate', start);
								void setFieldValue('endDate', end);
							}}
							mask={'00.00.0000 - 00.00.0000'}
							showMonthDropdown
							showYearDropdown
						/>
						<Button type={'submit'} className={'m-centred'} disabled={!dirty}>Save</Button>
					</Form>
				)}
			</Formik>
			{isPending && <FormLoader />}
		</>
	);
});

export default CalendarEventForm;