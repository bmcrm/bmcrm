import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { DetailsTitle } from '../DetailsTitle/DetailsTitle';
import type { CamperHistory } from '@entities/Camper';
import styles from './DetailsHistory.module.scss';

type DetailsHistoryProps = {
	className?: string;
	history: CamperHistory[];
};

const DetailsHistory = memo((props: DetailsHistoryProps) => {
	const { className, history } = props;

	return (
		<div className={styles.history}>
			<DetailsTitle title={'History'} />
			<ul className={classNames(styles.history__list, {}, [className])}>
				{history.map(({ year, value }, index) => (
					<li key={index} className={styles.history__item}>
						<p>{year}</p>
						<p>{value}</p>
					</li>
				))}
			</ul>
		</div>
	);
});

export { DetailsHistory };