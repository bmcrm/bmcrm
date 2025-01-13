export { default as AddInventoryForm } from './ui/AddInventoryForm/AddInventoryForm';

export { useGetInventory } from './hooks/useGetInventory';
export { useAddInventory } from './hooks/useAddInventory';
export { useDeleteInventoryItem } from './hooks/useDeleteInventoryItem';
export { useGetCategories } from './hooks/useGetCategories';
export { useUpdateInventoryItem } from './hooks/useUpdateInventoryItem';

export { inventoryState } from './model/state/inventoryState';

export { isDuplicateFile } from './lib/checkDuplicateFiles';

export type { IInventoryItem } from './model/types/Inventory.types';