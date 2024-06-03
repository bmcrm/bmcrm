import styles from './Header.module.scss'
import Logo from 'shared/assets/icons/logo.svg'
import { memo } from 'react'
import { RoutePath } from 'app/providers/AppRouter'
import { classNames } from 'shared/lib/classNames/classNames'
import { Link } from 'react-router-dom'
import { Nav } from 'features/Nav'
import { UserAvatar } from 'entities/User'

type HeaderProps = {
  className?: string
}

const Header = memo(({ className }: HeaderProps) => {
  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.header__container}>
        <strong className={styles.logo}>
          <Link to={RoutePath.dashboard} className={styles.logo__link}>
            <Logo />
          </Link>
        </strong>
        <Nav />
        <UserAvatar />
      </div>
    </header>
  )
})

export default Header
