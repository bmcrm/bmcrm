import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { INVENTORY_ENDPOINT } from '@shared/const/endpoints';
import type { IInventoryItem } from '../model/types/Inventory.types';

export const inventoryApi = {
	getInventory: async (itemID?: string): Promise<IInventoryItem[]> => {
		const endpoint = `${INVENTORY_ENDPOINT}${itemID ? `/${itemID}` : ''}`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	addInventoryItem: async (item: Partial<IInventoryItem>) => {
		const headers = createAuthHeaders();

    const response = await axios.post(INVENTORY_ENDPOINT, item, { headers });

    return response.data;
	},
	updateInventoryItem: async (item: Partial<IInventoryItem>, itemID: string) => {
		const endpoint = `${INVENTORY_ENDPOINT}/${itemID}`;
		const headers = createAuthHeaders();

    const response = await axios.patch(endpoint, item, { headers });

    return response.data;
	},
	deleteInventoryItem: async (itemID: string) => {
		const endpoint = `${INVENTORY_ENDPOINT}/${itemID}`;
    const headers = createAuthHeaders();

    await axios.delete(endpoint, { headers });
	},
	getPresignedUrl: async (fileName: string) => {
		const endpoint = `${INVENTORY_ENDPOINT}/upload`;
		const headers = createAuthHeaders();

		const response = await axios.post(endpoint, { fileName }, { headers });

		return response.data.uploadURL;
	},
	uploadFileToS3: async ({ file, uploadURL }: { file: File, uploadURL: string }) => {
		const headers = {
			'Content-Type': 'image/png',
		};

		return await axios.post(uploadURL, { file }, { headers });
	},
};