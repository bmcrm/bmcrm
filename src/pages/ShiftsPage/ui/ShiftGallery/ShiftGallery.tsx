import { memo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Thumbnails, Fullscreen, Zoom } from 'yet-another-react-lightbox/plugins';
import { classNames } from '@shared/lib/classNames';
import { Image } from '@shared/ui/Image';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './ShiftGallery.module.scss';

type ShiftGalleryProps = {
	className?: string;
	files: string[];
};

const ShiftGallery = memo((props: ShiftGalleryProps) => {
	const { className, files } = props;
	const [slideIndex, setSlideIndex] = useState(-1);

	const slides = files.map(file => ({ src: file }));

	return (
		<>
			<ul className={classNames(styles.gallery, {}, [className])}>
				{files.map((file, i) => (
					<li key={file} className={styles.gallery__item} onClick={() => setSlideIndex(i)}>
						<Image src={file} className={styles.gallery__img} />
					</li>
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