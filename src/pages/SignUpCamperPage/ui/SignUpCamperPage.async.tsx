import { lazy } from 'react';

const SignUpCamperPageAsync = lazy(async () => import('./SignUpCamperPage'));

export { SignUpCamperPageAsync as SignUpCamperPage };
