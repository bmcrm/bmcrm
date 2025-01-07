import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { CustomNavLink, CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './InventoryNav.module.scss';

type InventoryNavProps = {
	className?: string;
	categories: string[];
};

const InventoryNav = memo((props: InventoryNavProps) => {
	const { className, categories } = props;

	return (
		<div className={classNames(styles.navigation, {}, [className])}>
			<nav className={styles.navigation__nav}>
				{categories.map(category => (
					<CustomNavLink
						key={category}
						theme={CustomNavLinkTheme.INVENTORY}
						link={{ path: `${RoutePath.inventory}/${category}`, text: category }}
					/>
				))}
			</nav>
		</div>
	);
});

export { InventoryNav };