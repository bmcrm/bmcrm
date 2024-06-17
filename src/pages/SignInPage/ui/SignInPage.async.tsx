import { lazy } from 'react';

const SignInPageAsync = lazy(async () => import('./SignInPage'));

export { SignInPageAsync as SignInPage };