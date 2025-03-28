import type { ReactNode } from 'react';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FilesInputTheme } from '../types/FilesInput.types';
import FileUploadIcon from '@shared/assets/icons/file-upload_icon.svg';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import PdfIcon from '@shared/assets/icons/pdf_icon.svg';
import TxtIcon from '@shared/assets/icons/txt_icon.svg';

export const content: Record<FilesInputTheme, { icons: ReactNode[], text?: string }> = {
	[FilesInputTheme.ADD_INVENTORY]: {
		icons: [<Icon icon={<FileUploadIcon />} size={IconSize.SIZE_40} />],
		text: 'Select or drag a photo',
	},
	[FilesInputTheme.EDIT_INVENTORY]: {
		icons: [<Icon icon={<PlusIcon />} size={IconSize.SIZE_24} />],
	},
	[FilesInputTheme.ADD_SHIFT]: {
		icons: [
			<Icon icon={<FileUploadIcon />} size={IconSize.SIZE_40} />,
			<Icon icon={<PdfIcon />} size={IconSize.SIZE_40} />,
			<Icon icon={<TxtIcon />} size={IconSize.SIZE_40} />,
		],
		text: 'Select or drag a photo/file',
	},
};