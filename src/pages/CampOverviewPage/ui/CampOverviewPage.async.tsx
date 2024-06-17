import { lazy } from 'react';

const CampOverviewPageAsync = lazy(async () => import('./CampOverviewPage'));

export { CampOverviewPageAsync as CampOverviewPage };