import { lazy } from 'react';

const RegisterTCOPageAsync = lazy(async () => import('./RegisterTCOPage'));

export { RegisterTCOPageAsync as RegisterTCOPage };
