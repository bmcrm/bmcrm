import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { isPDF } from '@shared/lib/checkPDF';
import { Image } from '@shared/ui/Image';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { IFilesWithPreview } from '../../model/types/FilesInput.types';
import styles from './FilesPreview.module.scss';
import DeletePreviewIcon from '@shared/assets/icons/cross.svg';
import PdfIcon from '@shared/assets/icons/pdf_icon.svg';

type FilesPreviewProps = {
	className?: string;
	currentFiles?: string[];
	newFiles?: IFilesWithPreview[];
	handleRemoveCurrent?: (i: number) => void;
	handleRemoveNew?: (i: number) => void;
};

const FilesPreview = memo((props: FilesPreviewProps) => {
	const { className, currentFiles, newFiles, handleRemoveCurrent, handleRemoveNew } = props;
	const imageFiles = currentFiles?.filter(file => !isPDF(file));
	const pdfFiles = currentFiles?.filter(file => isPDF(file));
	const sortedFiles = [...(imageFiles ? imageFiles : []), ...(pdfFiles ? pdfFiles : [])];

	return (
		<div >
			<ul className={classNames(styles.preview, {}, [className])}>
				{sortedFiles?.map((preview, index) => (
					<li key={index} className={styles.preview__item}>
						{isPDF(preview) ? (
							<div className={styles.preview__pdf}>
								<Icon icon={<PdfIcon />} size={IconSize.SIZE_FILL} />
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
							onClick={() => handleRemoveCurrent?.(index)}
						>
							<Icon icon={<DeletePreviewIcon />} size={IconSize.SIZE_16} />
						</Button>
					</li>
				))}
				{newFiles?.map((preview, index) => {
					const existingFile = preview instanceof File ? preview : preview.file;
					const isImage = existingFile.type.startsWith('image/');
					const isPDF = existingFile.type === 'application/pdf';

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
							<Button
								className={styles.preview__btnRemove}
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								onClick={() => handleRemoveNew?.(index)}
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