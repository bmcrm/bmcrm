import { lazy } from 'react';

const SettingsAccountAsync = lazy(async () => import('./SettingsAccount'));

export { SettingsAccountAsync as SettingsAccount };