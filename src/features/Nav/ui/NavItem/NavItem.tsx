import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItemType } from '../../model/NavItems';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './NavItem.module.scss';

type NavItemProps = {
  item: NavItemType;
};

const NavItem = memo(({ item }: NavItemProps) => {
  const mods: Mods = {
    [styles.disabled]: item.disabled,
  };

  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) => classNames(styles.nav__link, { [styles.active]: isActive, ...mods }, [])}
      >
        {item.text}
      </NavLink>
    </li>
  );
});

export default NavItem;
