import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { type Additional, classNames, type Mods } from 'shared/lib/classNames/classNames';
import Icon from 'shared/ui/Icon/Icon';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { CustomNavLinkTheme, type NavLinkType } from './CustomNavLink.types';
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
