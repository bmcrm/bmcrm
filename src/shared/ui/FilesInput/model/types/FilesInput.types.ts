export enum FilesInputTheme {
	ADD_INVENTORY = 'add-inventory',
	EDIT_INVENTORY = 'edit-inventory',
}

export interface IFilesWithPreview {
	file: File;
	previewUrl: string;
}