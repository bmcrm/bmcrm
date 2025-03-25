import { Fragment, memo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Fullscreen, Thumbnails, Zoom } from 'yet-another-react-lightbox/plugins';
import { classNames } from '@shared/lib/classNames';
import { hasExtension } from '@shared/lib/checkExtension';
import { Image } from '@shared/ui/Image';
import { Icon, IconSize } from '@shared/ui/Icon';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './ShiftGallery.module.scss';
import PdfIcon from '@shared/assets/icons/pdf_icon.svg';
import TxtIcon from '@shared/assets/icons/txt_icon.svg';

type ShiftGalleryProps = {
	className?: string;
	files: string[];
};

const ShiftGallery = memo((props: ShiftGalleryProps) => {
	const { className, files } = props;
	const [slideIndex, setSlideIndex] = useState(-1);

	const imageFiles = files.filter(file => !hasExtension(file, ['.pdf', '.txt']));
	const pdfFiles = files.filter(file => hasExtension(file, ['.pdf']));
	const txtFiles = files.filter(file => hasExtension(file, ['.txt']));
	const sortedFiles = [...imageFiles, ...pdfFiles, ...txtFiles];

	const slides = imageFiles.map(file => ({ src: file }));

	return (
		<>
			<ul className={classNames(styles.gallery, {}, [className])}>
				{sortedFiles.map((file, i) => (
					<Fragment key={file}>
						{hasExtension(file, ['.pdf']) ? (
							<li className={styles.gallery__item}>
								<a href={file} target={'_blank'} className={styles.gallery__pdf}>
									<Icon icon={<PdfIcon />} size={IconSize.SIZE_FILL} />
								</a>
							</li>
						) : hasExtension(file, ['.txt']) ? (
							<li className={styles.gallery__item}>
								<a href={file} target={'_blank'} className={styles.gallery__pdf}>
									<Icon icon={<TxtIcon />} size={IconSize.SIZE_FILL} />
								</a>
							</li>
						) : (
							<li className={styles.gallery__item} onClick={() => setSlideIndex(i)}>
								<Image src={file} className={styles.gallery__img} />
							</li>
						)}
					</Fragment>
				))}
			</ul>
			<Lightbox
				index={slideIndex}
				slides={slides}
				open={slideIndex >= 0}
				close={() => setSlideIndex(-1)}
				plugins={[Thumbnails, Fullscreen, Zoom]}
			/>
		</>
	);
});

export { ShiftGallery };