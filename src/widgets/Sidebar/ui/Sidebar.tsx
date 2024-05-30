import styles from './Sidebar.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

type SidebarProps = {
	className?: string;
};

const Sidebar = memo(({ className }: SidebarProps) => {
	return (
		<aside className={classNames(styles.sidebar, {}, [className])}>
			<p>sidebar</p>
		</aside>
	);
});

export default Sidebar;
