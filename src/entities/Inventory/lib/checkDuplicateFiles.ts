type IProps = {
	file: File;
	currentFiles: { file: File; previewUrl: string }[];
}

export const isDuplicateFile = ({ currentFiles, file }: IProps) =>
	currentFiles.some(preview => preview.file.name === file.name && preview.file.lastModified === file.lastModified);