import { lazy } from 'react';

const InventoryPageAsync = lazy(async () => import('./InventoryPage'));

export { InventoryPageAsync as InventoryPage };