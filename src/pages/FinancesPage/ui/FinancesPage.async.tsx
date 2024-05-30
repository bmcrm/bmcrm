import { lazy } from 'react';

const FinancesPageAsync = lazy(async () => import('./FinancesPage'));

export { FinancesPageAsync as FinancesPage };