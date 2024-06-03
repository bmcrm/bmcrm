import styles from './Sidebar.module.scss'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'

type SidebarProps = {
  className?: string
  title?: string
}

const Sidebar = memo(({ className, title }: SidebarProps) => {
  return (
    <aside className={classNames(styles.sidebar, {}, [className])}>
      <h2>{title}</h2>
    </aside>
  )
})

export default Sidebar
