import { lazy } from 'react';

const CampersTablePageAsync = lazy(async () => import('./CampersTablePage'));

export { CampersTablePageAsync as CampersTablePage };