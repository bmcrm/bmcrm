import styles from './Sidebar.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

type SidebarProps = {
  className?: string;
  title?: string;
  datalist?: string[];
};

const Sidebar = memo(({ className, datalist }: SidebarProps) => {
  return (
    <aside className={classNames(styles.sidebar, {}, [className])}>
      <ul>
        {datalist?.map(item => (
          <li key={item} className={styles.sidebar__item}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default Sidebar;
