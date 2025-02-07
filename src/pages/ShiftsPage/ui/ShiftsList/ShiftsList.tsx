import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './ShiftsList.module.scss';

type ShiftsListProps = {
	className?: string;
};

const ShiftsList = memo((props: ShiftsListProps) => {
	const { className } = props;

	return (
		<ul className={classNames(styles.list, {}, [className])}>

		</ul>
	);
});

export { ShiftsList };