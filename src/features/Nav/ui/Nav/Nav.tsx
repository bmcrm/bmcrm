import styles from './Nav.module.scss';
import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavItemsList } from '../../model/NavItems';
import NavItem from '../../ui/NavItem/NavItem';

type NavProps = {
  className?: string;
};

const Nav = memo(({ className }: NavProps) => {
  return (
    <nav className={classNames(styles.nav, {}, [className])}>
      <ul className={styles.nav__list}>
        {useMemo(() => NavItemsList.map((item) => <NavItem
          key={item.path}
          item={item}
        />), [])}
      </ul>
    </nav>
  );
});

export default Nav;
