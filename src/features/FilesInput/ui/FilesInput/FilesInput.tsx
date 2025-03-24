import {
	memo,
	useState,
	useRef,
	useCallback,
	type ChangeEvent,
	type DragEvent,
	type InputHTMLAttributes,
	type ReactNode
} from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { content } from '../../model/data/filesInput.data';
import { FilesInputTheme } from '../../model/types/FilesInput.types';
import styles from './FilesInput.module.scss';

interface FilesInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	theme: FilesInputTheme;
	name: string;
	label?: string | ReactNode;
	previewsLength?: number;
	maxLength?: number;
	accept?: string;
	onFilesAdded: (files: File[]) => void;
}

const FilesInput = memo((props: FilesInputProps) => {
	const {
		className,
		name,
		label,
		previewsLength,
		maxLength = 5,
		theme,
		accept = 'image/*',
		onFilesAdded,
		...rest
	} = props;
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const showContent = previewsLength ? previewsLength < maxLength : true;
	const fakeMods: Mods = {
		[styles.dragging]: isDragging,
		[styles.column]: theme === FilesInputTheme.ADD_SHIFT,
	};

	const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			onFilesAdded(Array.from(event.target.files));

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
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
						className={classNames(styles.input__fake, fakeMods, [])}
						onClick={handleClick}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
					>
						{content[theme] && (
							<>
								<ul className={styles.input__icons}>
									{content[theme].icons.map((icon, i) => <li key={i}>{icon}</li>)}
								</ul>
								{content[theme].text && <p>{isDragging ? 'Drop files here' : content[theme].text}</p>}
							</>
						)}
					</div>
					<input
						ref={fileInputRef}
						className={styles.input__field}
						type={'file'}
						name={name}
						accept={accept}
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