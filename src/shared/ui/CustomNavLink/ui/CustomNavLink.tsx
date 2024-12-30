import { memo } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { classNames, type Additional, type Mods } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { CustomNavLinkTheme, type NavLinkType } from '../model/types/CustomNavLink.types';
import styles from './CustomNavLink.module.scss';

interface CustomNavLinkProps extends Omit<NavLinkProps, 'to'> {
  link: NavLinkType;
  theme?: CustomNavLinkTheme;
}

const CustomNavLink = memo((props: CustomNavLinkProps) => {
  const { link, theme = CustomNavLinkTheme.HEADER, ...rest } = props;
  const mods: Mods = {
    [styles.disabled]: link.disabled,
  };
  const additional: Additional = [styles[theme]];

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) => classNames(styles.link, { [styles.active]: isActive, ...mods }, additional)}
      {...rest}
    >
      {link.icon && <Icon icon={link.icon} size={IconSize.SIZE_20}/>}
      {link.text}
    </NavLink>
  );
});

export default CustomNavLink;
