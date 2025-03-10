import { memo } from 'react';
import { format, parseISO } from 'date-fns';
import { classNames } from '@shared/lib/classNames';
import { Loader } from '@shared/ui/Loader';
import { useGetCampEvents } from '@entities/Camp';
import styles from './CampEvents.module.scss';

type CampEventsProps = {
	className?: string;
	title?: string;
};

const CampEvents = memo((props: CampEventsProps) => {
	const { className, title = 'Events' } = props;
	const { data: campEvents, isLoading } = useGetCampEvents();

	return (
		<div className={classNames(styles.events, {}, [className])}>
			<h2 className={styles.events__title}>{title}</h2>
			{isLoading && <Loader className={'m-centred mt-10'} />}
			<ul className={styles.events__list}>
				{campEvents?.map(({ timestamp, event }, i) => (
					<li key={i}>[{format(parseISO(timestamp), 'MMM d, yyyy')}]: {event}</li>
				))}
			</ul>
		</div>
	);
});

export default CampEvents;