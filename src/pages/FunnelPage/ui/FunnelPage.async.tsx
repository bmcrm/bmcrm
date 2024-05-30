import { lazy } from 'react';

const FunnelPageAsync = lazy(async () => import('./FunnelPage'));

export { FunnelPageAsync as FunnelPage };