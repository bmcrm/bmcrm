import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Image } from '@shared/ui/Image';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { IFilesWithPreview } from '../../model/types/FilesInput.types';
import styles from './FilesPreview.module.scss';
import DeletePreviewIcon from '@shared/assets/icons/cross.svg';

type FilesPreviewProps = {
	className?: string;
	files?: IFilesWithPreview[];
	handleRemove: (i: number) => void;
};

const FilesPreview = memo((props: FilesPreviewProps) => {
	const { className, files, handleRemove } = props;

	return (
		<div >
			<ul className={classNames(styles.preview, {}, [className])}>
				{files?.map((preview, index) => (
					<li key={index} className={styles.preview__item}>
						<Image
							src={preview.previewUrl}
							alt={`Preview ${index + 1}`}
							customStyles={{ height: '65px' }}
						/>
						<Button
							className={styles.preview__btnRemove}
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							onClick={() => handleRemove(index)}
						>
							<Icon icon={<DeletePreviewIcon />} size={IconSize.SIZE_16} />
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
});

export default FilesPreview;