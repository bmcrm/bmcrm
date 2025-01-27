import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { SocialIcon } from '@features/SocialIcon';
import type { CamperSocial } from '@entities/Camper';
import styles from './DetailsSocial.module.scss';

type DetailsSocialProps = {
	className?: string;
	socials: CamperSocial[];
};

const DetailsSocial = memo(({ className, socials }: DetailsSocialProps) => (
	<ul className={classNames(styles.socials, {}, [className])}>
		{socials.map((social, i) => <SocialIcon key={i} social={social} />)}
	</ul>
));

export { DetailsSocial };