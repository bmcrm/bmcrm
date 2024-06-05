import { lazy } from 'react';

const SignUpOwnerPageAsync = lazy(async () => import('./SignUpOwnerPage'));

export { SignUpOwnerPageAsync as SignUpOwnerPage };
