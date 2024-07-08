export interface IInventoryItem {
  title: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  images?: string[];
  id?: string;
  camp_id: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}
