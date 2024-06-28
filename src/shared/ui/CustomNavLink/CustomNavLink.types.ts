import { ReactElement } from 'react';

export type NavLinkType = {
  path: string;
  text: string;
  icon?: ReactElement;
  logout?: boolean;
  disabled?: boolean;
};

export enum CustomNavLinkTheme {
  HEADER = 'link--header',
  SETTINGS = 'link--settings',
  LOGOUT = 'link--logout',
  ICON = 'link--icon',
}