export interface IInventory {
  items: IInventoryItem[];
  nextToken?: string;
}

export interface IInventoryItem {
  title: string;
  description: string;
  quantity: number | string;
  price: number | string;
  category: string;
  oldCategory?: string;
  images?: string[];
  deletedImages?: string[];
  id: string;
  camp_id: string;
  createdAt?: string;
  createdBy?: string;
}
