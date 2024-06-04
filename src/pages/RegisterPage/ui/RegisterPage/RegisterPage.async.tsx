import { lazy } from 'react';

const RegisterPageAsync = lazy(async () => import('./RegisterPage'));

export { RegisterPageAsync as RegisterPage };
