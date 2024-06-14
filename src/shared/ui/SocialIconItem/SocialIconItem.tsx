import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';

import Icon from 'shared/ui/Icon/Icon';
import { Link } from 'react-router-dom';

import styles from './SocialIconItem.module.scss';
import { IconSize } from 'shared/ui/Icon/Icon.types';
import { CamperSocial } from 'entities/Camper';
import { SocialIcons, SocialIconsEnum } from './SocialIconItem.types';

type SocialIconItemProps = {
  social: CamperSocial;
};

const SocialIconItem = memo(({ social }: SocialIconItemProps) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  
  return (
    <li>
      <Link to={social.url} target={'_blank'} className={styles.link}>
        <Icon icon={SocialIcons[social.name as SocialIconsEnum]} size={isTablet ? IconSize.SIZE_14 : IconSize.SIZE_24}/>
      </Link>
    </li>
  );
});

export default SocialIconItem;
