import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import Icon from 'shared/ui/Icon/Icon';

import styles from './NavItem.module.scss';
import { NavItemType } from '../../model/NavItems';
import { IconSize } from 'shared/ui/Icon/Icon.types';

type NavItemProps = {
  item: NavItemType;
};

const NavItem = memo(({ item }: NavItemProps) => {
  const mods: Mods = {
    [styles.disabled]: item.disabled,
    [styles.logout]: item.logout,
  };

  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) => classNames(styles.nav__link, { [styles.active]: isActive, ...mods }, [])}
      >
        {item.icon && <Icon icon={item.icon} size={IconSize.SIZE_20}/>}
        {item.text}
      </NavLink>
    </li>
  );
});

export default NavItem;
