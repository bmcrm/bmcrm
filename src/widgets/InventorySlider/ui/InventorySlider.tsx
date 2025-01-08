import { memo, useState, type CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as ISwiper } from 'swiper/types';
import { Navigation, Thumbs } from 'swiper/modules';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Image } from '@shared/ui/Image';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import styles from './InventorySlider.module.scss';

type InventorySliderProps = {
	className?: string;
	images: string[];
	customStyles?: CSSProperties;
};

const InventorySlider = memo((props: InventorySliderProps) => {
	const { className, images, customStyles } = props;
	const [thumbs, setThumbs] = useState<ISwiper | null>(null);
	const { isMobile } = useMedia();

	return (
		<div style={customStyles} className={classNames(styles.gallery, {}, [className])}>
			<Swiper
				className={styles.gallery__main}
				modules={[Navigation, Thumbs]}
				thumbs={{ swiper: thumbs }}
				spaceBetween={10}
			>
				{images.map((image, i) => (
					<SwiperSlide key={image} style={{ height: 'auto' }}>
						<Image src={image} alt={`slide-${i+1}`} className={styles.gallery__item} />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				className={styles.gallery__thumbs}
				modules={[Thumbs]}
				onSwiper={setThumbs}
				spaceBetween={isMobile ? 5 : 10}
				slidesPerView={3}
			>
				{images.map((image, i) => (
					<SwiperSlide key={image} style={{ height: 'auto' }}>
						<Image src={image} alt={`slide-${i+1}`} className={classNames(styles.gallery__item, {}, [styles.thumb])} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
});

export default InventorySlider;