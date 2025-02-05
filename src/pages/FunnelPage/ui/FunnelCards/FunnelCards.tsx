import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { FunnelCard } from '../FunnelCard/FunnelCard';
import { CamperRole, type ICampersByRole } from '@entities/Camper';
import styles from './FunnelCards.module.scss';

type FunnelCardsProps = {
	className?: string;
	customStyles?: CSSProperties;
	campersByRole: ICampersByRole;
};

const FunnelCards = memo((props: FunnelCardsProps) => {
	const { className, campersByRole, customStyles } = props;
	const { isTablet } = useMedia();

	return (
		<div className={classNames(styles.cards, {}, [className])} style={customStyles}>
			<FunnelCard title={'Leads'} users={campersByRole[CamperRole.LEAD]} />
			<FunnelCard title={'Qualified'} users={campersByRole[CamperRole.QUALIFIED]} />
			<FunnelCard title={'Intent'} users={campersByRole[CamperRole.INTENT]} />
			<FunnelCard
				title={'Campers'}
				fluid={!isTablet}
				users={[...campersByRole[CamperRole.TCO], ...campersByRole[CamperRole.COORG], ...campersByRole[CamperRole.CAMPER]]}
				maxUsers={10}
			/>
		</div>
	);
});

export { FunnelCards };