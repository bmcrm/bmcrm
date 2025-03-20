import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';

export const filesApi = {
	getPresignedUrl: async ({ fileName, endpoint }: { fileName: string, endpoint: string }) => {
		const headers = createAuthHeaders();

		const response = await axios.post(endpoint, { fileName }, { headers });

		return response.data.uploadURL;
	},
	uploadFileToS3: async ({ file, uploadURL }: { file: File, uploadURL: string }) => {
		const headers = {
			'Content-Type': file.type,
		};

		return await axios.put(uploadURL, file, { headers });
	},
};