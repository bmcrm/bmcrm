import styles from './NavItem.module.scss'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { NavItemType } from '../../model/NavItems'
import { classNames } from 'shared/lib/classNames/classNames'

type NavItemProps = {
  item: NavItemType
}

const NavItem = memo(({ item }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) => classNames(styles.nav__link, { [styles.active]: isActive }, [])}
      >
        {item.text}
      </NavLink>
    </li>
  )
})

export default NavItem
