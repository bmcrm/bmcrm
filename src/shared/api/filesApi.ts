import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';

export const filesApi = {
	getPresignedUrl: async ({ fileName, endpoint }: { fileName: string, endpoint: string }): Promise<{ uploadURL: string; fileURL: string }> => {
		const headers = createAuthHeaders();

		const { data } = await axios.post(endpoint, { fileName }, { headers });

		return data;
	},
	uploadFileToS3: async ({ file, uploadURL }: { file: File, uploadURL: string }) => {
		const headers = {
			'Content-Type': file.type,
		};

		return await axios.put(uploadURL, file, { headers });
	},
};