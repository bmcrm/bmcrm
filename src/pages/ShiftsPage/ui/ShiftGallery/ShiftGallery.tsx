import { Fragment, memo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Fullscreen, Thumbnails, Zoom } from 'yet-another-react-lightbox/plugins';
import { classNames } from '@shared/lib/classNames';
import { isPDF } from '@shared/lib/checkPDF';
import { Image } from '@shared/ui/Image';
import { Icon, IconSize } from '@shared/ui/Icon';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './ShiftGallery.module.scss';
import PdfIcon from '@shared/assets/icons/pdf_icon.svg';

type ShiftGalleryProps = {
	className?: string;
	files: string[];
};

const ShiftGallery = memo((props: ShiftGalleryProps) => {
	const { className, files } = props;
	const [slideIndex, setSlideIndex] = useState(-1);

	const imageFiles = files.filter(file => !isPDF(file));
	const pdfFiles = files.filter(file => isPDF(file));
	const sortedFiles = [...imageFiles, ...pdfFiles];

	const slides = imageFiles.map(file => ({ src: file }));

	return (
		<>
			<ul className={classNames(styles.gallery, {}, [className])}>
				{sortedFiles.map((file, i) => (
					<Fragment key={file}>
						{isPDF(file) ? (
							<li className={styles.gallery__item}>
								<a href={file} target={'_blank'} className={styles.gallery__pdf}>
									<Icon icon={<PdfIcon />} size={IconSize.SIZE_FILL} />
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