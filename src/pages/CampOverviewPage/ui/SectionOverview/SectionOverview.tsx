import { memo, type RefObject } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { CampOverview } from '@widgets/CampOverview';
import type { ICamp } from '@entities/Camp';
import styles from './SectionOverview.module.scss';

type SectionOverviewProps = {
	className?: string;
	camp: ICamp | null;
	isLoading: boolean;
	scrollTarget: RefObject<HTMLDivElement>;
};

const SectionOverview = memo((props: SectionOverviewProps) => {
	const { className, camp, isLoading, scrollTarget } = props;

	return (
		<section className={classNames(styles.overview, {}, [className])}>
			<Container>
				<CampOverview camp={camp || null} isLoading={isLoading} scrollTarget={scrollTarget} />
			</Container>
		</section>
	);
});

export { SectionOverview };