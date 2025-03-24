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
	currentFiles?: string[];
	newFiles?: IFilesWithPreview[];
	removedFiles?: string[];
};

const FormAuxiliary = memo((props: FormAuxiliaryProps) => {
	const { className, currentFiles, newFiles, removedFiles } = props;
	const { setFieldValue } = useFormikContext();
	const { error } = useToast();

	const handleFilesAdded = useCallback(
		async (addedFiles: File[], newFiles: IFilesWithPreview[] = []) => {

			if (newFiles.length + addedFiles.length + (currentFiles ? currentFiles?.length : 0) > 7) {
				error('You can only upload up to 7 files.');
				return;
			}

			const uniqueFiles = addedFiles.filter(file => !isDuplicateFile({ currentFiles: newFiles, file }));

			if (uniqueFiles.length === 0) {
				error('Duplicate files are not allowed.');
				return;
			}

			const imageFiles = uniqueFiles.filter((file) => file.type.startsWith('image/'));
			const pdfFiles = uniqueFiles
				.filter((file) => file.type === 'application/pdf')
				.map(file => ({ file }));

			const compressedImages = await compressImages({ files: imageFiles });
			const validImageFiles = compressedImages.filter(Boolean) as IFilesWithPreview[];

			const validFiles = [...newFiles, ...validImageFiles, ...pdfFiles];

			void setFieldValue('newFiles', validFiles);
		},
		[error, setFieldValue, currentFiles]
	);

	const handleRemoveCurrent = useCallback(
		(index: number) => {
			const target = currentFiles?.[index];

			if (target) {
				void setFieldValue('removedFiles', [...(removedFiles ? removedFiles : []), target]);
			}

			void setFieldValue('files', currentFiles?.filter((_, i) => i !== index));
		},
		[setFieldValue, currentFiles, removedFiles]
	);

	const handleRemoveNew = useCallback(
		(index: number) => {
			const previewToRemove = newFiles?.[index];

			if (previewToRemove && previewToRemove.previewUrl) {
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
				previewsLength={(newFiles?.length || 0) + (currentFiles?.length || 0)}
				accept={'image/*, application/pdf'}
				maxLength={7}
			/>
			{((currentFiles && currentFiles.length > 0) || (newFiles && newFiles.length > 0)) && (
				<FilesPreview
					currentFiles={currentFiles}
					newFiles={newFiles}
					handleRemoveCurrent={(i: number) => handleRemoveCurrent(i)}
					handleRemoveNew={(i: number) => handleRemoveNew(i)}
				/>
			)}
		</div>
	);
});

export { FormAuxiliary };