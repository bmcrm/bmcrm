import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { CustomNavLink, CustomNavLinkTheme } from '@shared/ui/CustomNavLink';
import { RoutePath } from '@app/providers/AppRouter';
import { FixedCategories } from '../../model/types/InventroyPage.types';
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
						end
						key={category}
						theme={CustomNavLinkTheme.INVENTORY}
						link={{
							path: category === FixedCategories.ALL
								? RoutePath.inventory
								: `${RoutePath.inventory}/${category}`, text: category
						}}
					/>
				))}
			</nav>
		</div>
	);
});

export { InventoryNav };