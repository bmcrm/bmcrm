import { memo } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import { HeadContent } from './HeadContent';
import { DetailsSocial } from '../DetailsSocial/DetailsSocial';
import type { ICamper } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './DetailsHead.module.scss';

type DetailsHeadProps = {
	className?: string;
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
	onClose?: () => void;
};

const DetailsHead = memo((props: DetailsHeadProps) => {
	const { className, setTheme, camper, onClose } = props;
	const { playa_name, avatar, social_links } = camper;
	const { isMobile } = useMedia();

	return (
		<div className={classNames(styles.head, {}, [className])}>
			<Avatar
				src={avatar || null}
				alt={playa_name ?? 'camper'}
				size={125}
				className={styles.head__avatar}
			/>
			<HeadContent camper={camper} setTheme={setTheme} onClose={onClose} />
			{social_links && social_links.length > 0 && !isMobile && (
				<DetailsSocial socials={social_links} />
			)}
		</div>
	);
});

export { DetailsHead };