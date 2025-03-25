import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { hasExtension } from '@shared/lib/checkExtension';
import { Image } from '@shared/ui/Image';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { IFilesWithPreview } from '../../model/types/FilesInput.types';
import styles from './FilesPreview.module.scss';
import DeletePreviewIcon from '@shared/assets/icons/cross.svg';
import PdfIcon from '@shared/assets/icons/pdf_icon.svg';
import TxtIcon from '@shared/assets/icons/txt_icon.svg';

type FilesPreviewProps = {
	className?: string;
	currentFiles?: string[];
	newFiles?: IFilesWithPreview[];
	handleRemoveCurrent?: (fileName: string) => void;
	handleRemoveNew?: (fileName: string) => void;
};

const FilesPreview = memo((props: FilesPreviewProps) => {
	const { className, currentFiles, newFiles, handleRemoveCurrent, handleRemoveNew } = props;
	const imageFiles = currentFiles?.filter(file => !hasExtension(file, ['.pdf', '.txt']));
	const pdfFiles = currentFiles?.filter(file => hasExtension(file, ['.pdf']));
	const txtFiles = currentFiles?.filter(file => hasExtension(file, ['.txt']));
	const sortedFiles = [
		...(imageFiles ? imageFiles : []),
		...(pdfFiles ? pdfFiles : []),
		...(txtFiles ? txtFiles : []),
	];

	return (
		<div >
			<ul className={classNames(styles.preview, {}, [className])}>
				{sortedFiles?.map((preview, index) => (
					<li key={index} className={styles.preview__item}>
						{hasExtension(preview, ['.pdf']) ? (
							<div className={styles.preview__pdf}>
								<Icon icon={<PdfIcon />} size={IconSize.SIZE_FILL} />
							</div>
						) : hasExtension(preview, ['.txt']) ? (
							<div className={styles.preview__pdf}>
								<Icon icon={<TxtIcon />} size={IconSize.SIZE_FILL} />
							</div>
						) : (
							<Image
								src={preview}
								alt={`Preview current ${index + 1}`}
								customStyles={{ height: '65px' }}
							/>
						)}
						<Button
							className={styles.preview__btnRemove}
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							onClick={() => handleRemoveCurrent?.(preview)}
						>
							<Icon icon={<DeletePreviewIcon />} size={IconSize.SIZE_16} />
						</Button>
					</li>
				))}
				{newFiles?.map((preview, index) => {
					const existingFile = preview instanceof File ? preview : preview.file;
					const isImage = existingFile.type.startsWith('image/');
					const isPDF = existingFile.type === 'application/pdf';
					const isTXT = existingFile.type === 'text/plain';

					return (
						<li key={index} className={styles.preview__item}>
							{isImage && (
								<Image
									src={preview.previewUrl}
									alt={`Preview new ${index + 1}`}
									customStyles={{ height: '100%' }}
									title={existingFile.name}
								/>
							)}
							{isPDF && (
								<div className={styles.preview__pdf} title={existingFile.name}>
									<Icon icon={<PdfIcon />} size={IconSize.SIZE_FILL} />
								</div>
							)}
							{isTXT && (
								<div className={styles.preview__pdf} title={existingFile.name}>
									<Icon icon={<TxtIcon />} size={IconSize.SIZE_FILL} />
								</div>
							)}
							<Button
								className={styles.preview__btnRemove}
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								onClick={() => handleRemoveNew?.(existingFile.name)}
							>
								<Icon icon={<DeletePreviewIcon />} size={IconSize.SIZE_16} />
							</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default FilesPreview;