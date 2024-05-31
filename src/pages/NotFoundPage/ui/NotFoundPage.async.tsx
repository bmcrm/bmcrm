import { lazy } from 'react';

const NotFoundPageAsync = lazy(async () => import('./NotFoundPage'));

export { NotFoundPageAsync as NotFoundPage };