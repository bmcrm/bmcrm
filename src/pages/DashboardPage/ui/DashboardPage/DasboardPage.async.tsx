import { lazy } from 'react';

const DashboardPageAsync = lazy(async () => import('./DashboardPage'));

export { DashboardPageAsync as DashboardPage };