import { memo, useCallback } from 'react';
import { useFormikContext } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { isDuplicateFile } from '@shared/lib/checkDuplicateFiles';
import { compressImages } from '@shared/lib/compressImages';
import { useToast } from '@shared/hooks/useToast';
import { FilesInput, FilesPreview, FilesInputTheme, type IFilesWithPreview } from '@features/FilesInput';
import styles from './ShiftForm.module.scss';

type FormAuxiliaryProps = {
	className?: string;
	files?: string[];
	newFiles?: IFilesWithPreview[];
};

const FormAuxiliary = memo((props: FormAuxiliaryProps) => {
	const { className, files, newFiles } = props;
	const { setFieldValue } = useFormikContext();
	const { error } = useToast();

	const handleFilesAdded = useCallback(
		async (addedFiles: File[], currentFiles: IFilesWithPreview[] = []) => {

			if (currentFiles.length + addedFiles.length > 5) {
				error('You can only upload up to 5 files.');
				return;
			}

			const uniqueFiles = addedFiles.filter(file => !isDuplicateFile({ currentFiles: currentFiles, file }));

			if (uniqueFiles.length === 0) {
				error('Duplicate files are not allowed.');
				return;
			}

			const compressedFiles = await compressImages({ files: addedFiles });
			const validFiles = compressedFiles.filter(Boolean) as IFilesWithPreview[];

			void setFieldValue('newFiles', [...currentFiles, ...validFiles]);
		},
		[error, setFieldValue]
	);

	const handleRemoveImage = useCallback(
		(index: number) => {
			const previewToRemove = newFiles?.[index];

			if (previewToRemove) {
				URL.revokeObjectURL(previewToRemove.previewUrl);
			}

			void setFieldValue('newFiles', newFiles?.filter((_, i) => i !== index));
		},
		[setFieldValue, newFiles]
	);

	return (
		<div className={classNames(styles.form__group, {}, [className])}>
			<FilesInput
				theme={FilesInputTheme.ADD_SHIFT}
				name={'files'}
				label={<>Auxiliary means <span style={{ font: 'var(--font-s)', color: 'var(--color-neutral)' }}>(not necessarily)</span></>}
				onFilesAdded={(addedFiles: File[]) => handleFilesAdded(addedFiles, newFiles)}
				previewsLength={newFiles?.length}
			/>
			{newFiles && newFiles.length > 0 && (
				<FilesPreview files={newFiles} handleRemove={(i: number) => handleRemoveImage(i)} />
			)}
		</div>
	);
});

export { FormAuxiliary };