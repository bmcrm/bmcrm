import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { ShiftsItem } from '../ShiftsItem/ShiftsItem';
import type { IShift } from '@entities/Shift';
import styles from './ShiftsList.module.scss';

type ShiftsListProps = {
	className?: string;
	shifts: IShift[];
};

const ShiftsList = memo((props: ShiftsListProps) => {
	const { className, shifts } = props;

	return (
		<ul className={classNames(styles.list, {}, [className])}>
			{shifts.map((shift) => (
				<ShiftsItem key={shift.shift_id} shift={shift} />
			))}
		</ul>
	);
});

export { ShiftsList };