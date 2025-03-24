import type { IFilesWithPreview } from '@features/FilesInput';

type IProps = {
	file: File;
	currentFiles: IFilesWithPreview[];
}

export const isDuplicateFile = ({ currentFiles, file }: IProps) => currentFiles.some(preview => {
	const existingFile = preview instanceof File ? preview : preview.file;

	return (
		existingFile.name === file.name &&
		existingFile.type === file.type &&
		Math.abs(existingFile.lastModified - file.lastModified) < 1000
	);
});