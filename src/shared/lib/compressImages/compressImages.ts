import imageCompression, { type Options } from 'browser-image-compression';
import toast from 'react-hot-toast';

interface compressImagesProps {
	files: File[];
	options?: Options,
}

export const compressImages = async (props: compressImagesProps) => {
	const { files, options = {
		maxSizeMB: 0.5,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
		initialQuality: 0.75,
	}} = props;

	return await Promise.all(
		files.map(async (file) => {
			if (file.size > 5 * 1024 * 1024) {
				toast.error(`File "${file.name}" exceeds the size limit of 5MB.`, {
					position: 'top-right',
					duration: 3000,
				});
				return null;
			}

			try {
				const compressedFile = await imageCompression(file, options);
				return {
					file: compressedFile,
					previewUrl: URL.createObjectURL(compressedFile),
				};
			} catch (err) {
				toast.error(`Error compressing image "${file.name}".`, {
					position: 'top-right',
					duration: 3000,
				});
				console.error('Compression error:', err);
				return null;
			}
		})
	);
};