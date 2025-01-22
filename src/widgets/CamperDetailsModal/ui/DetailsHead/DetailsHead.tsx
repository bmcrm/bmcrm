import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Avatar } from '@shared/ui/Avatar';
import { SocialIcon } from '@features/SocialIcon';
import { HeadContent } from './HeadContent';
import type { ICamper } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './DetailsHead.module.scss';

type DetailsHeadProps = {
	className?: string;
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
};

const DetailsHead = memo((props: DetailsHeadProps) => {
	const { className, setTheme, camper } = props;
	const { playa_name, avatar, social_links } = camper;
	const { isTablet } = useMedia();

	return (
		<div className={classNames(styles.head, {}, [className])}>
			<Avatar
				src={avatar || null}
				alt={playa_name ?? 'camper'}
				size={isTablet ? 70 : 125}
				className={styles.head__avatar}
			/>
			<HeadContent camper={camper} setTheme={setTheme} />
			{social_links && social_links.length > 0 && (
				<ul className={styles.head__socials}>
					{social_links.map(social => <SocialIcon social={social} />)}
				</ul>
			)}
		</div>
	);
});

export { DetailsHead };