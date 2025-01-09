import { memo, useState, useRef, useCallback, type ChangeEvent, type DragEvent, type InputHTMLAttributes } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FilesInputTheme } from '../model/types/FilesInput.types';
import styles from './FilesInput.module.scss';
import FileUploadIcon from '@shared/assets/icons/file-upload_icon.svg';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';

interface FilesInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	theme: FilesInputTheme;
	name: string;
	label?: string;
	previewsLength?: number;
	onFilesAdded: (files: File[]) => void;
}

const FilesInput = memo((props: FilesInputProps) => {
	const { className, name, label, previewsLength, theme, onFilesAdded, ...rest } = props;
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const showContent = previewsLength ? previewsLength < 5 : true;

	const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			onFilesAdded(Array.from(event.target.files));
		}
	}, [onFilesAdded]);

	const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(false);

		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			onFilesAdded(Array.from(event.dataTransfer.files));
			event.dataTransfer.clearData();
		}
	}, [onFilesAdded]);

	const handleClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(false);
	}, []);

	return (
		<div className={classNames(styles.input, {}, [className])}>
			{label && <p className={styles.input__label}>{label}</p>}
			{showContent && (
				<>
					<div
						className={classNames(styles.input__fake, { [styles.dragging]: isDragging }, [])}
						onClick={handleClick}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
					>
						{theme === FilesInputTheme.ADD_INVENTORY && (
							<>
								<Icon icon={<FileUploadIcon />} size={IconSize.SIZE_40} />
								<p>{isDragging ? 'Drop files here' : 'Select or drag a photo'}</p>
							</>
						)}
						{theme === FilesInputTheme.EDIT_INVENTORY && (
							<Icon icon={<PlusIcon />} size={IconSize.SIZE_24} />
						)}
					</div>
					<input
						ref={fileInputRef}
						className={styles.input__field}
						type={'file'}
						name={name}
						accept={'image/jpeg, image/png, image/webp'}
						onChange={handleFileChange}
						multiple
						{...rest}
					/>
				</>
			)}
		</div>
	);
});

export default FilesInput;