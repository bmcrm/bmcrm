import { lazy } from 'react';

const ProfilePageAsync = lazy(async () => import('./ProfilePage'));

export { ProfilePageAsync as ProfilePage };