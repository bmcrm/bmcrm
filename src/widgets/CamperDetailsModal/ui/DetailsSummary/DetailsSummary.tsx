import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { DetailsTitle } from '../DetailsTitle/DetailsTitle';
import styles from './DetailsSummary.module.scss';

type DetailsSummaryProps = {
	className?: string;
	summary: string;
};

const DetailsSummary = memo(({ className, summary }: DetailsSummaryProps) => (
	<div className={classNames(styles.summary, {}, [className])}>
		<DetailsTitle title={'Summary'} />
		<p className={styles.summary__text}>{summary}</p>
	</div>
));

export { DetailsSummary };