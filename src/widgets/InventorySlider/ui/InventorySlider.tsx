import {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
	type Dispatch,
	type SetStateAction,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as ISwiper } from 'swiper/types';
import { Navigation, Thumbs } from 'swiper/modules';
import { classNames } from '@shared/lib/classNames';
import { compressImages } from '@shared/lib/compressImages';
import { useMedia } from '@shared/hooks/useMedia';
import { useToast } from '@shared/hooks/useToast';
import { Image } from '@shared/ui/Image';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { FilesInput, FilesInputTheme } from '@shared/ui/FilesInput';
import { isDuplicateFile } from '@entities/Inventory';
import { InventorySliderTheme } from '../model/types/InventorySlider.types';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import './swiper.scss';
import styles from './InventorySlider.module.scss';
import DeleteImgIcon from '@shared/assets/icons/cross.svg';

type InventorySliderProps = {
	className?: string;
	customStyles?: CSSProperties;
	theme?: InventorySliderTheme;
	currentImages?: string[];
	newImages?: { file: File; previewUrl: string }[];
	setCurrentImages?: Dispatch<SetStateAction<string[]>>;
	setNewImages?: Dispatch<SetStateAction<{ file: File, previewUrl: string }[]>>;
	setDeletedImages?: Dispatch<SetStateAction<string[]>>;
};

const InventorySlider = memo((props: InventorySliderProps) => {
	const {
		className,
		customStyles,
		theme = InventorySliderTheme.DEFAULT,
		currentImages,
		newImages,
		setCurrentImages,
		setNewImages,
		setDeletedImages,
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

			if (newImages) {
				const uniqueFiles = files.filter(file => !isDuplicateFile({ currentFiles: newImages, file }));

				if (uniqueFiles.length === 0) {
					error('Duplicate files are not allowed.');
					return;
				}
			}

			const compressedFiles = await compressImages({ files });
			const validFiles = compressedFiles.filter(Boolean) as { file: File; previewUrl: string }[];

			setNewImages?.(prev => [...prev, ...validFiles]);
		},
		[error, newImages, setNewImages]
	);

	const previewImages = useMemo(() => {
		const addedImg = newImages?.map(img => img.previewUrl);
		return [...(currentImages ? currentImages : []), ...(addedImg ? addedImg : [])];
	}, [currentImages, newImages]);

	const handleRemoveImg = useCallback((img: string) => {
		if (currentImages?.includes(img)) {
			setCurrentImages?.(prevState => prevState.filter(ci => ci !== img));
			setDeletedImages?.(prevState => [...prevState, img]);
		}

		if (newImages?.some((newImg) => newImg.previewUrl === img)) {
			setNewImages?.((prev) =>
				prev.filter((newImg) => newImg.previewUrl !== img));
		}
	}, [currentImages, newImages, setCurrentImages, setDeletedImages, setNewImages]);

	useEffect(() => {
		if (mainSwiperRef.current && thumbsSwiperRef.current) {
			mainSwiperRef.current.update?.();
			thumbsSwiperRef.current.update?.();
		}
	}, [previewImages]);

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
								<div className={styles.gallery__item}>
									<Image src={image} alt={`slide-${i + 1}`} className={styles.gallery__img} />
									{isEditing && (
										<Button
											theme={ButtonTheme.CLEAR}
											size={ButtonSize.TEXT}
											className={styles.gallery__btnRemove}
											onClick={() => handleRemoveImg(image)}
										>
											<Icon icon={<DeleteImgIcon />} size={IconSize.SIZE_24} />
										</Button>
									)}
								</div>
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
					slidesPerView={isEditing
						? previewImages.length === 5
							? 5 : previewImages.length === 1
								? 1 : previewImages.length + 1
						: previewImages.length}
					noSwipingClass={styles.gallery__disabled}
				>
					{previewImages.length > 1 && (
						previewImages.map((image, i) => (
							<SwiperSlide key={`thumb-${i}-${image}`} style={{ height: 'auto' }}>
								<div className={classNames(styles.gallery__item, {}, [styles.thumb])}>
									<Image src={image} alt={`thumb-${i + 1}`} className={styles.gallery__img} />
									{isEditing && (
										<Button
											theme={ButtonTheme.CLEAR}
											size={ButtonSize.TEXT}
											className={classNames(styles.gallery__btnRemove, {}, [styles.gallery__disabled])}
											onClick={() => handleRemoveImg(image)}
										>
											<Icon icon={<DeleteImgIcon />} size={IconSize.SIZE_14} />
										</Button>
									)}
								</div>
							</SwiperSlide>
						))
					)}
					{isEditing && previewImages.length < 5 && (
						<SwiperSlide className={classNames(styles.gallery__disabled, {}, [styles.slide])}>
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