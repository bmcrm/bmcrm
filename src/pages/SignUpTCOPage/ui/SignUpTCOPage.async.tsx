import { lazy } from 'react';

const SignUpTCOPageAsync = lazy(async () => import('./SignUpTCOPage'));

export { SignUpTCOPageAsync as SignUpTCOPage };
