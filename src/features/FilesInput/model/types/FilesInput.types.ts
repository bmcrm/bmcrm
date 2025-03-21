export enum FilesInputTheme {
	ADD_INVENTORY = 'add-inventory',
	EDIT_INVENTORY = 'edit-inventory',
	ADD_SHIFT = 'add-shift',
}

export interface IFilesWithPreview {
	file: File;
	previewUrl: string;
}