import { lazy } from 'react';

const SettingsCampAsync = lazy(async () => import('./SettingsCamp'));

export { SettingsCampAsync as SettingsCamp };