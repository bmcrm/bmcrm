import axios from 'axios';
import { createAuthHeaders } from '@shared/lib/createAuthHeaders';
import { INVENTORY_ENDPOINT } from '@shared/const/endpoints';
import type { IInventory, IInventoryItem } from '../model/types/Inventory.types';

type IGetInventoryParams = {
	category?: string;
	limit?: string;
	title?: string;
	nextToken?: string;
};

export const inventoryApi = {
	getCategories: async (): Promise<string[]> => {
		const endpoint = `${INVENTORY_ENDPOINT}/categories`;
		const headers = createAuthHeaders();

		const response = await axios.get(endpoint, { headers });

		return response.data;
	},
	getInventory: async (queryParams: IGetInventoryParams | null = {}): Promise<IInventory> => {
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
	deleteInventoryItem: async ({ itemID, title }: { itemID: string; title: string }) => {
		const endpoint = `${INVENTORY_ENDPOINT}/${itemID}?title=${encodeURIComponent(title)}`;
		const headers = createAuthHeaders();

		await axios.delete(endpoint, { headers });
	},
};