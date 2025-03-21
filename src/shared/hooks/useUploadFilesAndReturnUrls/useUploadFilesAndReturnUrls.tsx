import { useCallback } from 'react';
import { useGetPresignedUrl } from '@shared/hooks/useGetPresignedUrl';
import { useUploadFileToS3 } from '@shared/hooks/useUploadFileToS3';
import { useToast } from '@shared/hooks/useToast';

interface UseUploadFilesAndReturnUrlsProps {
	files: File[] | undefined;
	endpoint: string;
}

export const useUploadFilesAndReturnUrls = () => {
	const { mutateAsync: getPresignedUrl } = useGetPresignedUrl();
	const { mutateAsync: uploadFileToS3 } = useUploadFileToS3();
	const { error } = useToast();

	const uploadFiles = useCallback(
		async ({ files, endpoint }: UseUploadFilesAndReturnUrlsProps): Promise<string[]> => {
			if (!files || !files.length) return [];

			const results = await Promise.allSettled(
				files.map(async (file) => {
					const { fileURL, uploadURL } = await getPresignedUrl({ fileName: file.name, endpoint });
					await uploadFileToS3({ file, uploadURL });

					return fileURL;
				}),
			);

			const uploadedUrls: string[] = [];
			const failedFiles: string[] = [];

			results.forEach((result, index) => {
				if (result.status === 'fulfilled') {
					uploadedUrls.push(result.value);
				} else {
					failedFiles.push(files[index].name);
					console.error(`Failed to upload file: ${files[index].name}`, result.reason);
				}
			});

			if (failedFiles.length) {
				error(`Failed to upload: ${failedFiles.join(', ')}`);
			}

			return uploadedUrls;
		},
		[getPresignedUrl, uploadFileToS3, error]
	);

	return { uploadFiles };
};