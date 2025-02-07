import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './ShiftsItem.module.scss';

type ShiftsItemProps = {
	className?: string;
};

const ShiftsItem = memo((props: ShiftsItemProps) => {
	const { className } = props;

	return (
		<li className={classNames(styles.item, {}, [className])}>

		</li>
	);
});

export { ShiftsItem };