import { memo, useCallback } from 'react';
import { format } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useDeleteShift, type IShift } from '@entities/Shift';
import styles from './ShiftsItem.module.scss';
import DeleteIcon from '@shared/assets/icons/delete.svg';

type ShiftsItemProps = {
	className?: string;
	shift: IShift;
	onEditShift?: (shift: IShift) => void;
	canControl?: boolean;
};

const ShiftsItem = memo((props: ShiftsItemProps) => {
	const { className, shift, onEditShift, canControl } = props;
	const { start_date, end_date, time, title, description, members, shift_id } = shift;
	const { mutate: deleteShift } = useDeleteShift();

	const handleDelete = useCallback(() => {
    deleteShift(shift_id);
  }, [deleteShift, shift_id]);

	return (
		<li className={classNames(styles.item, {}, [className])}>
			<div className={styles.item__inner}>
				<div className={styles.item__column}>
					<strong className={styles.item__caption}>
						{start_date && format(new Date(start_date), 'dd.MM.yyyy')}
						{end_date && ` - ${format(new Date(end_date), 'dd.MM.yyyy')}`}
					</strong>
					<div className={styles.item__columnInner}>
						<p className={styles.item__text}>{title}</p>
						<p className={styles.item__text}>{description}</p>
					</div>
				</div>
				<div className={styles.item__column}>
					<strong className={styles.item__caption}>TIME</strong>
					<div className={styles.item__columnInner}>
						{time?.map((t, i) => (
							<p key={i} className={styles.item__text}>
								{t.start_time && format(new Date(t.start_time), 'HH:mm')}
								{t.end_time && ` - ${format(new Date(t.end_time), 'HH:mm')}`}
							</p>
						))}
					</div>
				</div>
				<div className={styles.item__column}>
					<strong className={styles.item__caption}>MEMBERS</strong>
					<div className={classNames(styles.item__columnInner, {}, [styles.flex])}>
						{members.map((member, i) => (
							<p key={`${member}-${i}`} className={styles.item__text}>{member}</p>
						))}
					</div>
				</div>
			</div>
			{canControl && (
				<div className={styles.item__control}>
					<Button
						theme={ButtonTheme.OUTLINE}
						size={ButtonSize.S}
						color={ButtonColor.BLACK}
						onClick={() => onEditShift?.(shift)}
					>
						Edit
					</Button>
					<Button
						aria-label={'Delete shift button'}
						theme={ButtonTheme.CLEAR}
						size={ButtonSize.TEXT}
						className={styles.item__delete}
						onClick={handleDelete}
					>
						<Icon icon={<DeleteIcon />} size={IconSize.SIZE_14} />
					</Button>
				</div>
			)}
		</li>
	);
});

export { ShiftsItem };