import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { INVENTORY_ENDPOINT } from '@shared/const/endpoints';
import type { IInventoryItem } from '../model/types/Inventory.types';

type IGetInventory = {
	category?: string;
	limit?: string;
	title?: string;
};

export const inventoryApi = {
	getCategories: async (): Promise<string[]> => {
		const endpoint = `${INVENTORY_ENDPOINT}/categories`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	getInventory: async (queryParams: IGetInventory | null = {}): Promise<IInventoryItem[]> => {
		const headers = createAuthHeaders();
		const endpoint = new URL(INVENTORY_ENDPOINT);

		if (queryParams) {
			Object.entries(queryParams)
				.filter(([, value]) => value !== undefined)
				.forEach(([key, value]) => endpoint.searchParams.append(key, String(value)));
		}

		const response = await axios.get(String(endpoint), { headers });

		return response.data;
	},
	addInventoryItem: async (item: Partial<IInventoryItem>) => {
		const headers = createAuthHeaders();

    const response = await axios.post(INVENTORY_ENDPOINT, item, { headers });

    return response.data;
	},
	updateInventoryItem: async (item: Partial<IInventoryItem>) => {
		const endpoint = `${INVENTORY_ENDPOINT}/${item.id}`;
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
			'Content-Type': file.type,
		};

		return await axios.put(uploadURL, file, { headers });
	},
};