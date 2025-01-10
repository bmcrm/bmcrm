import {
	memo,
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
	type CSSProperties,
	type Dispatch,
	type SetStateAction
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as ISwiper } from 'swiper/types';
import { Navigation, Thumbs } from 'swiper/modules';
import { classNames } from '@shared/lib/classNames';
import { compressImages } from '@shared/lib/compressImages';
import { useMedia } from '@shared/hooks/useMedia';
import { useToast } from '@shared/hooks/useToast';
import { Image } from '@shared/ui/Image';
import { FilesInput, FilesInputTheme } from '@shared/ui/FilesInput';
import { InventorySliderTheme } from '../model/types/InventorySlider.types';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import styles from './InventorySlider.module.scss';

type InventorySliderProps = {
	className?: string;
	theme?: InventorySliderTheme;
	images?: string[];
	customStyles?: CSSProperties;
	newImages?: { file: File; previewUrl: string }[];
	setNewImages?: Dispatch<SetStateAction<{ file: File, previewUrl: string }[]>>
};

const InventorySlider = memo((props: InventorySliderProps) => {
	const {
		className,
		images,
		customStyles,
		theme = InventorySliderTheme.DEFAULT,
		newImages,
		setNewImages,
	} = props;
	const [thumbs, setThumbs] = useState<ISwiper | null>(null);
	const mainSwiperRef = useRef<ISwiper | null>(null);
	const thumbsSwiperRef = useRef<ISwiper | null>(null);
	const { isMobile } = useMedia();
	const { error } = useToast();
	const isEditing = theme === InventorySliderTheme.EDIT;

	const handleAddImages = useCallback(
		async (files: File[]) => {

			if (files.length > 5) {
				error('You can only upload up to 5 images.');
				return;
			}

			const compressedFiles = await compressImages({ files });
			const validFiles = compressedFiles.filter(Boolean) as { file: File; previewUrl: string }[];

			setNewImages?.(prev => [...prev, ...validFiles]);
		},
		[error, setNewImages]
	);

	const previewImages = useMemo(() => {
		const addedImg = newImages?.map(img => img.previewUrl);
		return [...(images ? images : []), ...(addedImg ? addedImg : [])];
	}, [images, newImages]);

	useEffect(() => {
		if (mainSwiperRef.current && thumbsSwiperRef.current) {
			mainSwiperRef.current.update?.();
			thumbsSwiperRef.current.update?.();
		}
	}, [previewImages]);

	useEffect(() => {
		return () => {
			newImages?.forEach(file => URL.revokeObjectURL(URL.createObjectURL(file.file)));
		};
	}, [newImages]);

	return (
		<div style={customStyles} className={classNames(styles.gallery, {}, [className])}>
			<Swiper
				className={styles.gallery__main}
				modules={[Navigation, Thumbs]}
				thumbs={{ swiper: thumbs }}
				spaceBetween={10}
				onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
			>
				<>
					{previewImages && previewImages.length > 0 ? (
						previewImages.map((image, i) => (
							<SwiperSlide key={`main-${i}-${image}`} style={{ height: 'auto' }}>
								<Image src={image} alt={`slide-${i + 1}`} className={styles.gallery__item}/>
							</SwiperSlide>
						))
					) : (
						isEditing && (
							<SwiperSlide style={{ height: 'auto' }}>
								<FilesInput
									theme={FilesInputTheme.EDIT_INVENTORY}
									name={'image'}
									onFilesAdded={handleAddImages}
									className={styles.gallery__btnAdd}
								/>
							</SwiperSlide>
						)
					)}
				</>
			</Swiper>
			{(previewImages && previewImages.length > 1 || (isEditing && previewImages && previewImages.length === 1)) && (
				<Swiper
					className={styles.gallery__thumbs}
					modules={[Thumbs]}
					onSwiper={(swiper) => {
						thumbsSwiperRef.current = swiper;
						setThumbs(swiper);
					}}
					spaceBetween={isMobile ? 5 : 10}
					slidesPerView={isEditing ? 5 : 4}
					noSwipingClass={styles.gallery__disabled}
				>
					{previewImages.length > 1 && (
						previewImages.map((image, i) => (
							<SwiperSlide key={`thumb-${i}-${image}`} style={{ height: 'auto' }}>
								<Image
									src={image}
									alt={`thumb-${i + 1}`}
									className={classNames(styles.gallery__item, {}, [styles.thumb])}
								/>
							</SwiperSlide>
						))
					)}
					{isEditing && previewImages.length < 5 && (
						<SwiperSlide className={styles.gallery__disabled}>
							<FilesInput
								theme={FilesInputTheme.EDIT_INVENTORY}
								name={'image'}
								onFilesAdded={handleAddImages}
								className={styles.gallery__btnAdd}
							/>
						</SwiperSlide>
					)}
				</Swiper>
			)}
		</div>
	);
});

export default InventorySlider;