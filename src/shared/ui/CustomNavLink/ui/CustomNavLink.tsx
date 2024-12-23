import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { classNames, type Additional, type Mods } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { CustomNavLinkTheme, type NavLinkType } from '../model/types/CustomNavLink.types';
import styles from './CustomNavLink.module.scss';

type CustomNavLinkProps = {
  link: NavLinkType;
  theme?: CustomNavLinkTheme;
};

const CustomNavLink = memo(({ link, theme = CustomNavLinkTheme.HEADER }: CustomNavLinkProps) => {
  const mods: Mods = {
    [styles.disabled]: link.disabled,
  };
  const additional: Additional = [styles[theme]];

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) => classNames(styles.link, { [styles.active]: isActive, ...mods }, additional)}
    >
      {link.icon && <Icon icon={link.icon} size={IconSize.SIZE_20}/>}
      {link.text}
    </NavLink>
  );
});

export default CustomNavLink;
