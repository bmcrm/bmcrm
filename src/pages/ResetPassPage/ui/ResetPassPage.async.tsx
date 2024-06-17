import { lazy } from 'react';

const ResetPassPageAsync = lazy(async () => import('./ResetPassPage'));

export { ResetPassPageAsync as ResetPassPage };