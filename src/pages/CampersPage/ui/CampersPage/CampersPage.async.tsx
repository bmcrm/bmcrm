import { lazy } from 'react';

const CampersPageAsync = lazy(async () => import('./CampersPage'));

export { CampersPageAsync as CampersPage };