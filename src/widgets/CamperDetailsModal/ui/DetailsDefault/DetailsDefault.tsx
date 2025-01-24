import { memo } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { DetailsHead } from '../DetailsHead/DetailsHead';
import { DetailsRole } from '../DetailsRole/DetailsRole';
import { DetailsSocial } from '../DetailsSocial/DetailsSocial';
import { DetailsTags } from '../DetailsTags/DetailsTags';
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
	const { role, about_me, history, tags, social_links } = camper;
	const isHistory = history?.some(h => h.value.length > 0);
	const { isMobile } = useMedia();

	return (
		<div className={classNames(styles.details, {}, [className])}>
			<DetailsHead camper={camper} setTheme={setTheme} />
			<div className={styles.details__row}>
				<DetailsRole role={role} />
				{isMobile && social_links && social_links.length > 0 && (
					<DetailsSocial socials={social_links} />
				)}
			</div>
			{tags && <DetailsTags tags={tags} />}
			{about_me && <DetailsSummary summary={about_me} />}
			{history && isHistory && <DetailsHistory history={history} />}
		</div>
	);
});

export { DetailsDefault };