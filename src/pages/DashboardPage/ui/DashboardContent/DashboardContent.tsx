import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Calendar } from '@widgets/Calendar';
import { CampEvents } from '@widgets/CampEvents';
import styles from './DashboardContent.module.scss';

type DashboardContentProps = {
	className?: string;
};

const DashboardContent = memo(({ className }: DashboardContentProps) => (
	<div className={classNames(styles.content, {}, [className])}>
		<div className={styles.content__row}>
			<Calendar />
		</div>
		<div className={styles.content__row}>
			<CampEvents />
		</div>
	</div>
));

export { DashboardContent };