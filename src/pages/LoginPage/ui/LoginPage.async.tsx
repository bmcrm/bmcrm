import { lazy } from 'react';

const LoginPageAsync = lazy(async () => import('./LoginPage'));

export { LoginPageAsync as LoginPage };