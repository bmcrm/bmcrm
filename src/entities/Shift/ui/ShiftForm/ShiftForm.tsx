import { memo, useCallback, useMemo } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { generateShiftFormValues } from '../../lib/generateInitialValues';
import { FormLoader } from '@features/FormLoader';
import { FormBasic } from './FormBasic';
import { FormDate } from './FormDate';
import { FormAuxiliary } from './FormAuxiliary';
import { FormButtons } from './FormButtons';
import { useCreateShift } from '../../hooks/useCreateShift';
import { useEditShift } from '../../hooks/useEditShift';
import { shiftSchema } from '@shared/const/validationSchemas';
import type { IFilesWithPreview } from '@features/FilesInput';
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
	const { mutateAsync: createShift, isPending: isCreatePending } = useCreateShift();
	const { mutateAsync: editShift, isPending: isEditPending } = useEditShift();
	const isPending = isCreatePending || isEditPending;

	const initialValues = useMemo(
		() => generateShiftFormValues(currentShift),
		[currentShift]
	);

	const submitHandlers = {
		[ShiftFormTheme.CREATE]: async (values: Partial<IShift> & { newFiles: IFilesWithPreview[] }, formikHelpers?: FormikHelpers<Partial<IShift> & { newFiles: IFilesWithPreview[] }>) => {
			const { newFiles, ...rest } = values;
			const mappedFiles = newFiles.map(preview => preview.file);

			const shift: Partial<IShift> & { newFiles: File[] } = {
				...rest,
				newFiles: mappedFiles,
			};

			await createShift(shift);

			formikHelpers?.resetForm();
			onClose?.();
		},
		[ShiftFormTheme.EDIT]: async (values: Partial<IShift> & { newFiles: IFilesWithPreview[] }) => {
			const { newFiles, ...rest } = values;
			const mappedFiles = newFiles.map(preview => preview.file);


			const editedShift: Partial<IShift> & { newFiles: File[] } = {
				...currentShift,
				...rest,
				newFiles: mappedFiles,
			};

			await editShift(editedShift);
			onClose?.();
		},
	};

	const handleSubmit = useCallback(
		(values: Partial<IShift> & { newFiles: IFilesWithPreview[] }, formikHelpers: FormikHelpers<Partial<IShift> & { newFiles: IFilesWithPreview[] }>) => {
			const handler = submitHandlers[theme];
			handler?.(values, formikHelpers);
		},
		[submitHandlers, theme]
	);

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={shiftSchema} enableReinitialize>
				{({ values, dirty }) => (
					<Form className={classNames(styles.form, {}, [className])}>
						<FormBasic members={values.members ?? []} />
						<FormDate values={values} />
						<FormAuxiliary currentFiles={values.files} newFiles={values.newFiles} removedFiles={values.removedFiles} />
						<FormButtons dirty={dirty} />
					</Form>
				)}
			</Formik>
			{isPending && <FormLoader className={styles.form__loader} />}
		</>
	);
});

export { ShiftForm };