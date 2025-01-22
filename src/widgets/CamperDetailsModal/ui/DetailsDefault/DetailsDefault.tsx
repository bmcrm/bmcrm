import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { DetailsHead } from '../DetailsHead/DetailsHead';
import { DetailsRole } from '../DetailsRole/DetailsRole';
import { DetailsSummary } from '../DetailsSummary/DetailsSummary';
import { DetailsHistory } from '../DetailsHistory/DetailsHistory';
import type { ICamper } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './DetailsDefault.module.scss';

type DetailsDefaultProps = {
	className?: string;
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
};

const DetailsDefault = memo((props: DetailsDefaultProps) => {
	const { className, camper, setTheme } = props;
	const { role, about_me, history } = camper;
	const isHistory = history?.some(h => h.value.length > 0);

	return (
		<div className={classNames(styles.details, {}, [className])}>
			<DetailsHead camper={camper} setTheme={setTheme} />
			<DetailsRole role={role} />
			{about_me && <DetailsSummary summary={about_me} />}
			{history && isHistory && <DetailsHistory history={history} />}
		</div>
	);
});

export { DetailsDefault };