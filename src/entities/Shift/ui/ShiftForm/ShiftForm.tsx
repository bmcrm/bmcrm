import { memo, useCallback, useMemo } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { generateShiftFormValues } from '../../lib/generateInitialValues';
import { Button } from '@shared/ui/Button';
import { FormLoader } from '@features/FormLoader';
import { FormBasic } from './FormBasic';
import { FormDate } from './FormDate';
import { useCreateShift } from '../../hooks/useCreateShift';
import { useEditShift } from '../../hooks/useEditShift';
import { shiftSchema } from '@shared/const/validationSchemas';
import type { IShift } from '../../model/types/Shift.types';
import { ShiftFormTheme } from '../../model/types/ShiftForm.types';
import styles from './ShiftForm.module.scss';

type ShiftFormProps = {
	className?: string;
	onClose?: () => void;
	theme?: ShiftFormTheme;
	currentShift?: IShift | null;
};

const ShiftForm = memo((props: ShiftFormProps) => {
	const { className, onClose, theme = ShiftFormTheme.CREATE, currentShift } = props;
	const { isMobile } = useMedia();
	const { mutateAsync: createShift, isPending } = useCreateShift();
	const { mutate: editShift } = useEditShift();

	const initialValues = useMemo(
		() => generateShiftFormValues(currentShift),
		[currentShift]
	);

	const submitHandlers = {
		[ShiftFormTheme.CREATE]: async (values: Partial<IShift>, formikHelpers?: FormikHelpers<Partial<IShift>>) => {
			await createShift(values);
			formikHelpers?.resetForm();
			onClose?.();
		},
		[ShiftFormTheme.EDIT]: (values: Partial<IShift>) => {
			const editedShift = {
				...currentShift,
        ...values,
			};

			editShift(editedShift);
			onClose?.();
		},
	};

	const handleSubmit = useCallback(
		(values: Partial<IShift>, formikHelpers: FormikHelpers<Partial<IShift>>) => {
			const handler = submitHandlers[theme];
			handler?.(values, formikHelpers);
		},
		[submitHandlers, theme]
	);

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={shiftSchema} enableReinitialize>
				{({ values }) => (
					<Form className={classNames(styles.form, {}, [className])}>
						<FormBasic members={values.members ?? []} />
						<FormDate values={values} />
						<Button type={'submit'} className={'m-centred'} fluid={isMobile}>Save</Button>
					</Form>
				)}
			</Formik>
			{isPending && <FormLoader />}
		</>
	);
});

export { ShiftForm };