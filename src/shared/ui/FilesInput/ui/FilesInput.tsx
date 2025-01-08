import { memo, useState, useRef, useCallback, type ChangeEvent, type DragEvent } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import styles from './FilesInput.module.scss';
import FileUploadIcon from '@shared/assets/icons/file-upload_icon.svg';

type FilesInputProps = {
	className?: string;
	label?: string;
	previewsLength: number;
	onFilesAdded: (files: File[]) => void;
};

const FilesInput = memo((props: FilesInputProps) => {
	const { className, label, previewsLength, onFilesAdded } = props;
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

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
			{previewsLength < 5 && (
				<>
					<div
						className={classNames(styles.input__fake, { [styles.dragging]: isDragging }, [])}
						onClick={handleClick}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
					>
						<Icon icon={<FileUploadIcon/>} size={IconSize.SIZE_40}/>
						<p>{isDragging ? 'Drop files here' : 'Select or drag a photo'}</p>
					</div>
					<input
						ref={fileInputRef}
						className={styles.input__field}
						type={'file'}
						name={'image'}
						accept={'image/jpeg, image/png, image/webp'}
						onChange={handleFileChange}
						multiple
					/>
				</>
			)}
		</div>
	);
});

export default FilesInput;