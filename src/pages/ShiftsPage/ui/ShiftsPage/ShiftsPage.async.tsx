import { lazy } from 'react';

const ShiftsPageAsync = lazy(async () => import('./ShiftsPage'));

export { ShiftsPageAsync as ShiftsPage };