import { lazy } from 'react';

const SettingsPageAsync = lazy(async () => import('./SettingsPage'));

export { SettingsPageAsync as SettingsPage };