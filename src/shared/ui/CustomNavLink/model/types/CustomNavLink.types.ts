import type { ReactElement } from 'react';

export type NavLinkType = {
  path: string;
  text: string;
  icon?: ReactElement;
  logout?: boolean;
  disabled?: boolean;
};

export enum CustomNavLinkTheme {
  HEADER = 'link--header',
  CAMP = 'link--camp',
  SETTINGS = 'link--settings',
  ICON = 'link--icon',
}
